"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";

type Msg = {
  who: string;
  text: string;
  time: string;
  align: string;
  bg: string;
  showWho: boolean;
  whoColor: string;
  style: string;
};

const msg = (
  who: string,
  text: string,
  time: string,
  mine = false,
  color = "#b0457a",
  italic = false,
): Msg => ({
  who,
  text,
  time,
  align: mine ? "flex-end" : "flex-start",
  bg: mine ? "#d9f4cc" : "#ffffff",
  showWho: !mine,
  whoColor: color,
  style: italic ? "italic" : "normal",
});

type Project = {
  name: string;
  kind: string;
  domain: string;
  url: string;
  img: string;
  was: string;
  did: string;
  tags: string[];
  s1: string;
  s2: string;
  glow: string;
  type: "chat" | "card" | "form";
  chatName?: string;
  chatSub?: string;
  msgs: Msg[];
};

const PROJECTS: Project[] = [
  {
    name: "Morayo & Dayo",
    kind: "Digital IV · Abuja wedding",
    domain: "dayo-and-ayo.vercel.app",
    url: "https://dayo-and-ayo.vercel.app/",
    img: "/shots/moday.jpg",
    was: "A JPEG IV forwarded 200 times",
    did: "Guests open a sealed envelope, spray naira notes to reveal the date, RSVP by tapping through a quick game, and send digital gifts in a few taps. Each guest's link greets them by name.",
    tags: [
      "Personalised links",
      "Spray to reveal",
      "Fun RSVP",
      "Digital gifts",
    ],
    s1: "Spray to reveal",
    s2: "For Aunty Bisi",
    glow: "rgba(185,120,127,.45)",
    type: "chat",
    chatName: "Family & Friends",
    chatSub: "Aunty Bisi, Tunde, Kemi +312",
    msgs: [
      msg("Aunty Bisi", "Forwarded: IV.jpg", "07:41", false, "#b0457a"),
      msg("Tunde", "What time is the reception?", "08:03", false, "#2f7a8a"),
      msg("Kemi", "Pls where's the venue again?", "08:20", false, "#9a6a1e"),
      msg(
        "Tunde",
        "Can someone send the account number?",
        "09:12",
        false,
        "#2f7a8a",
      ),
    ],
  },
  {
    name: "Aso-ebi Orders",
    kind: "Order & payment app · Supabase + Paystack",
    domain: "asoebi-sigma.vercel.app",
    url: "https://asoebi-sigma.vercel.app/",
    img: "/shots/asoebi.jpg",
    was: "A spreadsheet, 40 bank alerts and “pls send acct details”",
    did: "Guests pick their aso-ebi group, pay with Paystack and get a pickup slip with a QR code. The family watches orders and payments land live on a private dashboard, then ticks off pickups in one tap.",
    tags: [
      "Paystack payments",
      "Live dashboard",
      "QR pickup slips",
      "Supabase",
    ],
    s1: "₦85,000 · Paid",
    s2: "Live dashboard",
    glow: "rgba(169,79,98,.4)",
    type: "chat",
    chatName: "Aso-ebi payments",
    chatSub: "Aunty Ronke, Kemi, Ngozi +86",
    msgs: [
      msg("Kemi", "Pls send the acct details again", "08:12", false, "#2f7a8a"),
      msg(
        "Ngozi",
        "I've paid o. Sending receipt now",
        "08:40",
        false,
        "#b0457a",
      ),
      msg(
        "Aunty Ronke",
        "Who has paid for the blush one? I've lost count",
        "09:15",
        false,
        "#9a6a1e",
      ),
      msg("", "Aunty I sent 85k yesterday, pls check", "09:20", true),
    ],
  },
  {
    name: "Tolu & James",
    kind: "Wedding website · Lagos",
    domain: "tolu-james.vercel.app",
    url: "https://tolu-james.vercel.app/",
    img: "/shots/tolu.jpg",
    was: "14 forwarded messages about aso-ebi",
    did: "An ivory and gold home for a two-day wedding: an arch portrait, aso-ebi prices and how to buy, both venues on a map, RSVP, and a WhatsApp preview with the couple’s photo.",
    tags: ["RSVP", "Aso-ebi", "Maps", "WhatsApp preview"],
    s1: "RSVP open",
    s2: "Aso-ebi + pickup",
    glow: "rgba(201,162,94,.45)",
    type: "chat",
    chatName: "Tolu & James Wedding",
    chatSub: "Aunty Bisi, Kemi, Uncle Femi +209",
    msgs: [
      msg(
        "Aunty Bisi",
        "Forwarded: WEDDING INVITATION. Tolu & James. 12/12 & 13/12/2026. Venue: Lagos, address to follow.",
        "09:12",
        false,
        "#b0457a",
      ),
      msg("Kemi", "Pls how much is the aso-ebi?", "09:40", false, "#2f7a8a"),
      msg("Uncle Femi", "Is it Saturday or Sunday?", "10:02", false, "#9a6a1e"),
      msg("Kemi", "Pls how much is the aso-ebi???", "10:11", false, "#2f7a8a"),
      msg("", "Scroll up, I sent it yesterday", "10:15", true),
    ],
  },
  {
    name: "Inioluwa & Adeboye",
    kind: "Wedding website · Ijebu Igbo",
    domain: "ini-ade.vercel.app",
    url: "https://ini-ade.vercel.app/",
    img: "/shots/ini.jpg",
    was: "An IV card too small to hold the weekend",
    did: "Everything the card couldn’t carry: our story, the weekend schedule, gallery, dress code, gifts, a live countdown and a password-locked guest list.",
    tags: ["Countdown", "Our story", "Gallery", "Guest list"],
    s1: "Live countdown",
    s2: "Password guest list",
    glow: "rgba(216,167,181,.6)",
    type: "card",
    msgs: [],
  },
  {
    name: "Frootshive",
    kind: "Feedback form & members club",
    domain: "frootshive.vercel.app",
    url: "https://frootshive.vercel.app/",
    img: "/shots/froot.jpg",
    was: "A plain customer feedback form",
    did: "Three tap-to-answer steps in about three minutes. Every customer gets a member number and card, then birthday and holiday emails that send themselves at 8am.",
    tags: ["3-step form", "Member cards", "Auto emails", "Google Sheets"],
    s1: "Member FHL-0126",
    s2: "Birthday emails at 8am",
    glow: "rgba(130,180,120,.45)",
    type: "form",
    msgs: [],
  },
  {
    name: "The Big Picnic",
    kind: "Potluck coordinator · Jabi Lake Park",
    domain: "no-more-popcorm.vercel.app",
    url: "https://no-more-popcorm.vercel.app/",
    img: "/shots/popcorn.jpg",
    was: "A WhatsApp list where five people brought popcorn",
    did: "A menu board where guests claim a dish, RSVP and read the rules, so the same three people don’t carry everything.",
    tags: ["Claim a dish", "RSVP", "Live counts"],
    s1: "Jollof · claimed",
    s2: "Popcorn · banned",
    glow: "rgba(242,169,59,.4)",
    type: "chat",
    chatName: "Big Picnic Squad",
    chatSub: "Ada, Seyi, Tolu +14",
    msgs: [
      msg(
        "Ada",
        "List so far: 1. Tolu - popcorn  2. Ada - popcorn  3. Seyi - popcorn",
        "11:03",
        false,
        "#2f7a8a",
      ),
      msg("Seyi", "4. Me - popcorn", "11:20", false, "#9a6a1e"),
      msg("Tolu", "Who is bringing actual food??", "11:21", false, "#b0457a"),
      msg("Seyi", "Popcorn is food", "11:22", false, "#9a6a1e"),
    ],
  },
  {
    name: "Happy 21st, Beevol",
    kind: "Birthday site",
    domain: "beevol-birthday.vercel.app",
    url: "https://beevol-birthday.vercel.app/",
    img: "/shots/beevol.jpg",
    was: "“HBD bro” in the family chat",
    did: "A honey-lit birthday ritual made for phones. Guests tap to light all 21 candles, make a wish, then tap again to blow them out.",
    tags: ["Made for phones", "Interactive cake"],
    s1: "21 candles",
    s2: "Tap to blow",
    glow: "rgba(201,162,94,.5)",
    type: "chat",
    chatName: "Family",
    chatSub: "Mummy, Daddy, Tobi +6",
    msgs: [
      msg("Tobi", "HBD bro", "07:02", false, "#2f7a8a"),
      msg("Daddy", "HBD", "08:15", false, "#9a6a1e"),
      msg(
        "Mummy",
        "Happy birthday my son. More life",
        "08:40",
        false,
        "#b0457a",
      ),
      msg("", "Thanks fam", "09:30", true),
    ],
  },
  {
    name: "A Little One Is on the Way",
    kind: "Surprise baby shower",
    domain: "baby-shower-henna.vercel.app",
    url: "https://baby-shower-henna.vercel.app/",
    img: "/shots/baby.jpg",
    was: "A secret group chat that kept leaking",
    did: "Guest info, a baby registry and easy contact, with RSVPs saved to a sheet and an admin-only page behind a password.",
    tags: ["Registry", "RSVP to Sheets", "Admin page"],
    s1: "Baby registry",
    s2: "Admin only",
    glow: "rgba(180,200,160,.55)",
    type: "chat",
    chatName: "Surprise for Bukky (shhh)",
    chatSub: "Dami, Ife, Bukky +18",
    msgs: [
      msg("Dami", "Remember o, don’t tell her", "13:05", false, "#2f7a8a"),
      msg("Ife", "Who added Bukky to this group??", "13:06", false, "#b0457a"),
      msg("Dami", "DELETE DELETE", "13:06", false, "#2f7a8a"),
      msg("Bukky", "This message was deleted", "13:07", false, "#9a6a1e", true),
    ],
  },
];

const SERVICES = [
  {
    title: "Celebrations",
    mark: "C",
    bg: "#4a1430",
    fg: "#e57fa9",
    items: [
      "Wedding & event websites",
      "Digital IVs with RSVP",
      "Aso-ebi order pages",
      "Cash gift & spray pages",
      "Wish walls & surprise sites",
      "Programmes & order of service",
    ],
  },
  {
    title: "Small businesses",
    mark: "S",
    bg: "#e57fa9",
    fg: "#3a1022",
    items: [
      "Feedback forms & members clubs",
      "QR digital menus",
      "Booking & order forms",
      "Link-in-bio storefronts",
      "Price lists & catalogues",
      "Birthday & promo emails",
    ],
  },
  {
    title: "Churches & schools",
    mark: "H",
    bg: "#ece2f1",
    fg: "#4a1430",
    items: [
      "First-timer cards",
      "Giving & event registration",
      "Admission forms",
      "Sports day & end-of-year pages",
    ],
  },
  {
    title: "Companies & NGOs",
    mark: "N",
    bg: "#ff8fbf",
    fg: "#2a0b1a",
    items: [
      "Event registration & QR check-in",
      "Award nomination & voting",
      "Staff onboarding forms",
      "Donation & volunteer pages",
      "Long forms people actually finish",
    ],
  },
];

const LABELS = [
  "Wedding websites",
  "Aso-ebi order pages",
  "Digital IVs",
  "Feedback forms",
  "QR menus",
  "Birthday sites",
  "Booking forms",
  "Wish walls",
  "Church first-timer cards",
];
const PETALS = ["#e8b4c4", "#d9c6ec", "#f2cf9a"];
const RIBBON = [...LABELS, ...LABELS].map((l, i) => ({
  label: l,
  petal: PETALS[i % 3],
}));

const TILTS = [
  "-1.2deg",
  "1.2deg",
  "-1deg",
  "1deg",
  "-1.2deg",
  "1deg",
  "-1deg",
  "1.2deg",
];

/** Smooth curve through points (Catmull-Rom as cubic Béziers), kept moving downward. */
function threadPath(P: number[][]) {
  if (P.length < 2) return "";
  let d = `M ${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
  for (let i = 0; i < P.length - 1; i++) {
    const p0 = P[i - 1] || P[i],
      p1 = P[i],
      p2 = P[i + 1],
      p3 = P[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6,
      c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6,
      c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${Math.max(p1[1], c1y).toFixed(1)} ${c2x.toFixed(1)} ${Math.min(p2[1], c2y).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d;
}

export default function Portfolio() {
  const [before, setBefore] = useState<boolean[]>(() =>
    PROJECTS.map(() => false),
  );
  const [geo, setGeo] = useState<{ w: number; h: number; pts: number[][] }>({
    w: 0,
    h: 0,
    pts: [],
  });

  const rootRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const samplesRef = useRef<{ T: number; arr: number[][] } | null>(null);
  const curRef = useRef(0);
  const targetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const keyRef = useRef("");

  const setRoot = useCallback((el: HTMLDivElement | null) => {
    rootRef.current = el;
  }, []);
  const setTrail = useCallback((el: SVGPathElement | null) => {
    trailRef.current = el;
  }, []);
  const setHead = useCallback((el: SVGGElement | null) => {
    headRef.current = el;
  }, []);

  // Measure where the thread should pass: under the hero, through each screenshot, then the lower sections.
  const measure = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const off = (n: HTMLElement | null) => {
      let x = 0,
        y = 0;
      while (n && n !== el) {
        x += n.offsetLeft;
        y += n.offsetTop;
        n = n.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };
    const W = el.offsetWidth,
      H = el.offsetHeight,
      pts: number[][] = [];
    const hero = el.querySelector<HTMLElement>("#top");
    if (hero) pts.push([W * 0.5, hero.offsetHeight + 10]);
    el.querySelectorAll<HTMLElement>(".frame").forEach((f) => {
      const o = off(f);
      pts.push([o.x + f.offsetWidth / 2, o.y + f.offsetHeight / 2]);
    });
    ["#kind-words", "#services"].forEach((q) => {
      const n = el.querySelector<HTMLElement>(q);
      if (n) {
        const o = off(n);
        pts.push([W * 0.5, o.y + n.offsetHeight * 0.5]);
      }
    });
    const mid = el.querySelector<HTMLElement>(".card.silk");
    if (mid) {
      const o = off(mid);
      pts.push([o.x + mid.offsetWidth / 2, o.y + mid.offsetHeight / 2]);
    }
    const cta = el.querySelector<HTMLElement>("#book a.btn");
    if (cta) {
      const o = off(cta);
      pts.push([o.x + cta.offsetWidth / 2, o.y + cta.offsetHeight / 2]);
    }
    pts.sort((p, q) => p[1] - q[1]);
    const key =
      `${W}x${H}:` +
      pts.map((p) => `${Math.round(p[0])},${Math.round(p[1])}`).join(";");
    if (key !== keyRef.current) {
      keyRef.current = key;
      samplesRef.current = null;
      setGeo({ w: W, h: H, pts });
    }
  }, []);

  const onScroll = useCallback(() => {
    const el = rootRef.current,
      p = trailRef.current;
    if (!el || !p) return;
    if (!samplesRef.current) {
      const T = p.getTotalLength();
      if (!T) return;
      const arr: number[][] = [];
      for (let i = 0; i <= 500; i++) {
        const l = (T * i) / 500;
        const pt = p.getPointAtLength(l);
        arr.push([l, pt.x, pt.y]);
      }
      samplesRef.current = { T, arr };
      p.style.strokeDasharray = `${T} ${T}`;
    }
    const S = samplesRef.current;
    const y = window.innerHeight / 2 - el.getBoundingClientRect().top;
    let L = 0;
    if (y > S.arr[0][2]) {
      L = S.arr[S.arr.length - 1][0];
      for (let i = 1; i < S.arr.length; i++) {
        if (S.arr[i][2] >= y) {
          const a = S.arr[i - 1],
            b = S.arr[i];
          const t = b[2] === a[2] ? 0 : (y - a[2]) / (b[2] - a[2]);
          L = a[0] + (b[0] - a[0]) * t;
          break;
        }
      }
    }
    targetRef.current = L;
    const paint = () => {
      rafRef.current = null;
      const tr = trailRef.current,
        S2 = samplesRef.current;
      if (!tr || !S2) return;
      curRef.current += (targetRef.current - curRef.current) * 0.18;
      if (Math.abs(targetRef.current - curRef.current) < 0.5)
        curRef.current = targetRef.current;
      const pt = tr.getPointAtLength(curRef.current);
      tr.style.strokeDashoffset = String(S2.T - curRef.current);
      headRef.current?.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
      if (curRef.current !== targetRef.current)
        rafRef.current = requestAnimationFrame(paint);
    };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(paint);
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 60);
    let ro: ResizeObserver | null = null;
    try {
      ro = new ResizeObserver(() => measure());
      if (rootRef.current) ro.observe(rootRef.current);
    } catch {
      ro = null;
    }
    const tick = setInterval(() => {
      measure();
      onScroll();
    }, 1200);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      clearInterval(tick);
      ro?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [measure, onScroll]);

  const td = threadPath(geo.pts);
  useEffect(() => {
    samplesRef.current = null;
    requestAnimationFrame(onScroll);
  }, [td, onScroll]);

  const hasThread = !!td;
  const tw = String(geo.w || 0),
    th = String(geo.h || 0),
    tvb = `0 0 ${geo.w || 1} ${geo.h || 1}`;
  const ribbon = RIBBON;
  const services = SERVICES;
  const anyAfter = before.some((x) => !x);
  const flipAllLabel = anyAfter
    ? "Show me all the boring versions"
    : "Back to the beautiful ones";
  const flipAll = () => setBefore(PROJECTS.map(() => anyAfter));
  const projects = PROJECTS.map((p, i) => ({
    ...p,
    num: String(i + 1).padStart(2, "0"),
    dir: (i % 2 ? "row-reverse" : "row") as "row" | "row-reverse",
    numSide: i % 2 ? "right" : "left",
    enter: i % 2 ? "rv-r" : "rv-l",
    tilt: TILTS[i % TILTS.length],
    isChat: p.type === "chat",
    isCard: p.type === "card",
    isForm: p.type === "form",
    chatName: p.chatName || "",
    chatSub: p.chatSub || "",
    swClass: before[i] ? "on" : "",
    aria: before[i] ? ("true" as const) : ("false" as const),
    beforeClass: before[i] ? "on" : "",
    afterClass: before[i] ? "off" : "",
    toggle: () => setBefore((b) => b.map((v, j) => (j === i ? !v : v))),
  }));

  return (
    <div
      ref={setRoot}
      style={{
        position: "relative",
        width: "100%",
        overflowX: "hidden",
        background: "#f8f2ea",
        color: "#1f1418",
        fontFamily: "Manrope, 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      <div className="bar" aria-hidden="true" />
      {hasThread ? (
        <>
          <svg
            className="thread"
            aria-hidden="true"
            width={tw}
            height={th}
            viewBox={tvb}
          >
            <defs>
              <linearGradient
                id="thr"
                gradientUnits="userSpaceOnUse"
                x1="0"
                y1="0"
                x2="0"
                y2={th}
              >
                <stop offset="0" stopColor="#ff8fbf" />
                <stop offset=".5" stopColor="#e0528a" />
                <stop offset=".8" stopColor="#f2c46b" />
                <stop offset="1" stopColor="#ff8fbf" />
              </linearGradient>
              <radialGradient id="tipg">
                <stop offset="0" stopColor="#ffffff" />
                <stop offset=".25" stopColor="#ffd0e3" />
                <stop offset=".6" stopColor="#ff8fbf" stopOpacity=".55" />
                <stop offset="1" stopColor="#ff8fbf" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d={td}
              fill="none"
              stroke="#e57fa9"
              strokeOpacity=".28"
              strokeWidth="1.5"
              strokeDasharray="2 8"
              strokeLinecap="round"
            />
            <path
              ref={setTrail}
              d={td}
              fill="none"
              stroke="url(#thr)"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
            <g ref={setHead}>
              <g className="pulse">
                <circle r="34" fill="url(#tipg)" />
                <circle r="5" fill="#ffffff" stroke="#ff8fbf" strokeWidth="2" />
              </g>
            </g>
          </svg>
        </>
      ) : null}
      <section
        id="top"
        style={{
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#fbf3ee",
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(236,190,206,.55), transparent 32%), radial-gradient(circle at 88% 12%, rgba(214,198,236,.6), transparent 34%), radial-gradient(circle at 70% 92%, rgba(246,214,170,.5), transparent 36%), radial-gradient(rgba(74,20,48,.07) 1px, transparent 1.4px)",
          backgroundSize: "auto, auto, auto, 22px 22px",
          color: "#3a1022",
        }}
      >
        <header
          className="up"
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "18px 20px",
            display: "flex",
            gap: "12px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <a
            href="#top"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minHeight: "44px",
            }}
          >
            <svg
              className="spin-slow"
              width="26"
              height="26"
              viewBox="0 0 40 40"
              aria-hidden="true"
            >
              <g fill="#f4b9cb" stroke="#4a1430" strokeWidth="1.6">
                <path d="M20 4c4 0 6 5 3 9 4-3 9-1 9 3s-5 6-9 4c3 4 1 9-3 9s-6-5-3-9c-4 3-9 1-9-3s5-6 9-4c-3-4-1-9 3-9z" />
              </g>
              <circle
                cx="20"
                cy="18"
                r="3.4"
                fill="#f2c46b"
                stroke="#4a1430"
                strokeWidth="1.4"
              />
            </svg>
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "30px",
                letterSpacing: "-.01em",
                color: "#4a1430",
              }}
            >
              Eventlybuilt
            </span>
            <span
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: "22px",
                color: "#b0457a",
                transform: "rotate(-4deg)",
              }}
            >
              by Funbi
            </span>
          </a>
          <nav
            style={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
              fontSize: "14px",
              fontWeight: "700",
              color: "#4a1430",
            }}
          >
            <a
              className="navlink"
              href="#work"
              style={{
                textDecoration: "none",
                padding: "12px 14px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Work
            </a>
            <a
              className="navlink"
              href="#kind-words"
              style={{
                textDecoration: "none",
                padding: "12px 14px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
              Kind words
            </a>
            <a
              className="navlink"
              href="#services"
              style={{
                textDecoration: "none",
                padding: "12px 14px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
              What I make
            </a>
            <a
              className="btn"
              href="https://wa.me/2348050366355"
              style={{
                textDecoration: "none",
                padding: "11px 18px",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "#4a1430",
                color: "#fbf3ee",
                borderRadius: "999px",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
              </svg>
              WhatsApp
            </a>
          </nav>
        </header>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 20px 90px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px 48px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: "1 1 460px",
              minWidth: "0",
              display: "flex",
              flexDirection: "column",
              gap: "22px",
            }}
          >
            <div
              className="up"
              style={{
                animationDelay: ".1s",
                alignSelf: "flex-start",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#ffffff",
                border: "1.5px solid #4a1430",
                borderRadius: "999px",
                padding: "7px 14px 7px 8px",
                boxShadow: "3px 3px 0 #4a1430",
                transform: "rotate(-2deg)",
              }}
            >
              <span
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "#f4b9cb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "17px",
                }}
              >
                F
              </span>
              <span style={{ fontSize: "14px", fontWeight: "700" }}>
                Hi, I'm Funbi
              </span>
              <span style={{ fontSize: "14px" }}>· Abuja</span>
            </div>
            <h1
              className="up"
              style={{
                animationDelay: ".2s",
                margin: "0",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: "400",
                fontSize: "clamp(54px, 8vw, 118px)",
                lineHeight: ".95",
                letterSpacing: "-.025em",
                color: "#4a1430",
                textWrap: "balance",
              }}
            >
              I make the boring bits
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  fontStyle: "italic",
                  color: "#b0457a",
                }}
              >
                beautiful.
                <svg
                  className="draw"
                  viewBox="0 0 300 30"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-2%",
                    right: "-2%",
                    bottom: "-.12em",
                    width: "104%",
                    height: ".28em",
                    overflow: "visible",
                  }}
                >
                  <path
                    d="M4 20 C 60 6, 120 26, 170 14 S 260 6, 296 18"
                    fill="none"
                    stroke="#ff8fbf"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            <div
              className="up"
              style={{
                animationDelay: ".3s",
                position: "relative",
                maxWidth: "46ch",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontSize: "clamp(16px, 1.4vw, 19px)",
                  lineHeight: "1.65",
                  color: "#5b3a48",
                }}
              >
                Invitations, RSVPs, feedback forms, menus. The things people
                usually scroll past, turned into pages they open, enjoy and send
                to everyone on WhatsApp.
              </p>
              <span
                className="hide-sm"
                style={{
                  position: "absolute",
                  right: "-150px",
                  top: "-46px",
                  fontFamily: "Caveat, cursive",
                  fontSize: "24px",
                  lineHeight: "1",
                  color: "#b0457a",
                  transform: "rotate(6deg)",
                  whiteSpace: "nowrap",
                }}
              >
                yes, even forms!
              </span>
              <svg
                className="hide-sm"
                width="70"
                height="46"
                viewBox="0 0 70 46"
                aria-hidden="true"
                style={{ position: "absolute", right: "-96px", top: "-20px" }}
              >
                <path
                  d="M64 4 C 50 24, 30 34, 8 36 M8 36 l9 -8 M8 36 l11 5"
                  fill="none"
                  stroke="#b0457a"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="up"
              style={{
                animationDelay: ".4s",
                display: "flex",
                flexWrap: "wrap",
                gap: "14px",
                alignItems: "center",
              }}
            >
              <a
                className="btn wob"
                href="https://wa.me/2348050366355"
                style={{
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "16px",
                  padding: "15px 26px",
                  minHeight: "54px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "#4a1430",
                  color: "#fbf3ee",
                  borderRadius: "999px",
                  boxShadow: "4px 4px 0 #ff8fbf",
                }}
              >
                Start a project
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <a
                className="btn"
                href="#work"
                style={{
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "16px",
                  padding: "15px 24px",
                  minHeight: "54px",
                  display: "flex",
                  alignItems: "center",
                  background: "#ffffff",
                  color: "#4a1430",
                  border: "1.5px solid #4a1430",
                  borderRadius: "999px",
                }}
              >
                See the before &amp; after
              </a>
            </div>
            <div
              className="up"
              style={{
                animationDelay: ".5s",
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <span
                style={{
                  background: "#ffe9a8",
                  color: "#3a1022",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  transform: "rotate(-1.5deg)",
                }}
              >
                8 live sites
              </span>
              <span
                style={{
                  background: "#e9dcf6",
                  color: "#3a1022",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  transform: "rotate(1deg)",
                }}
              >
                Live in 3–7 days
              </span>
              <span
                style={{
                  background: "#fbd3df",
                  color: "#3a1022",
                  padding: "8px 14px",
                  borderRadius: "12px",
                  fontSize: "14px",
                  fontWeight: "700",
                  transform: "rotate(-1deg)",
                }}
              >
                Made for phones
              </span>
            </div>
          </div>
          <div
            className="up"
            aria-hidden="true"
            style={{
              animationDelay: ".3s",
              flex: "1 1 440px",
              minWidth: "0",
              maxWidth: "600px",
              width: "100%",
              margin: "0 auto",
              position: "relative",
              aspectRatio: "1 / .95",
            }}
          >
            <div
              className="sway1"
              style={{
                position: "absolute",
                left: "0",
                top: "6%",
                width: "52%",
                background: "#ffffff",
                padding: "3% 3% 0",
                boxShadow: "0 18px 34px -16px rgba(74,20,48,.45)",
                borderRadius: "4px",
              }}
            >
              <img
                src="/shots/ini.jpg"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "1 / .78",
                  objectFit: "cover",
                  objectPosition: "center 20%",
                }}
              />
              <div
                style={{
                  fontFamily: "Caveat, cursive",
                  fontSize: "clamp(18px, 2.4vw, 26px)",
                  color: "#4a1430",
                  textAlign: "center",
                  padding: "6% 0 7%",
                }}
              >
                Ini &amp; Ade ♡
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "-12px",
                  left: "30%",
                  width: "40%",
                  height: "24px",
                  background:
                    "repeating-linear-gradient(45deg, rgba(244,185,203,.85) 0 8px, rgba(255,255,255,.7) 8px 14px)",
                  transform: "rotate(-4deg)",
                }}
              />
            </div>
            <div
              className="sway2"
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                width: "46%",
                background: "#ffffff",
                padding: "3% 3% 0",
                boxShadow: "0 18px 34px -16px rgba(74,20,48,.45)",
                borderRadius: "4px",
              }}
            >
              <img
                src="/shots/beevol.jpg"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "1 / .78",
                  objectFit: "cover",
                  objectPosition: "center 40%",
                }}
              />
              <div
                style={{
                  fontFamily: "Caveat, cursive",
                  fontSize: "clamp(18px, 2.4vw, 26px)",
                  color: "#4a1430",
                  textAlign: "center",
                  padding: "6% 0 7%",
                }}
              >
                Beevol @ 21
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "24%",
                  width: "42%",
                  height: "24px",
                  background:
                    "repeating-linear-gradient(-45deg, rgba(214,198,236,.9) 0 8px, rgba(255,255,255,.7) 8px 14px)",
                  transform: "rotate(5deg)",
                }}
              />
            </div>
            <div
              className="sway3"
              style={{
                position: "absolute",
                left: "18%",
                bottom: "0",
                width: "60%",
                background: "#ffffff",
                padding: "3% 3% 0",
                boxShadow: "0 26px 44px -18px rgba(74,20,48,.55)",
                borderRadius: "4px",
                zIndex: "2",
              }}
            >
              <img
                src="/shots/tolu.jpg"
                alt=""
                style={{
                  display: "block",
                  width: "100%",
                  aspectRatio: "1 / .7",
                  objectFit: "cover",
                  objectPosition: "70% 30%",
                }}
              />
              <div
                style={{
                  fontFamily: "Caveat, cursive",
                  fontSize: "clamp(20px, 2.8vw, 30px)",
                  color: "#4a1430",
                  textAlign: "center",
                  padding: "5% 0 6%",
                }}
              >
                Tolu &amp; James, Dec '26
              </div>
              <span
                style={{
                  position: "absolute",
                  top: "-13px",
                  left: "8%",
                  width: "34%",
                  height: "26px",
                  background:
                    "repeating-linear-gradient(90deg, rgba(242,196,107,.85) 0 6px, rgba(255,240,200,.8) 6px 12px)",
                  transform: "rotate(-8deg)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "6%",
                  width: "28%",
                  height: "24px",
                  background:
                    "repeating-linear-gradient(90deg, rgba(242,196,107,.85) 0 6px, rgba(255,240,200,.8) 6px 12px)",
                  transform: "rotate(7deg)",
                }}
              />
            </div>
            <div
              className="bob"
              style={{
                position: "absolute",
                right: "-2%",
                bottom: "12%",
                zIndex: "3",
                width: "30%",
                aspectRatio: "1",
                background: "#ffe9a8",
                boxShadow: "0 14px 22px -12px rgba(74,20,48,.45)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "6%",
                fontFamily: "Caveat, cursive",
                fontSize: "clamp(18px, 2.6vw, 28px)",
                lineHeight: "1",
                color: "#4a1430",
              }}
            >
              live in
              <br />
              3–7 days!
            </div>
            <div
              className="bob2"
              style={{
                position: "absolute",
                left: "-2%",
                bottom: "40%",
                zIndex: "3",
                background: "#d9f4cc",
                color: "#1f2a30",
                borderRadius: "14px 14px 14px 4px",
                padding: "9px 13px",
                fontSize: "clamp(11px, 1.4vw, 14px)",
                fontFamily: "-apple-system, 'Segoe UI', Roboto, sans-serif",
                boxShadow: "0 12px 22px -12px rgba(0,0,0,.35)",
                maxWidth: "46%",
              }}
            >
              <span
                style={{
                  textDecoration: "line-through",
                  textDecorationColor: "#b0457a",
                  textDecorationThickness: "2px",
                }}
              >
                Pls how much is the aso-ebi???
              </span>
            </div>
            <svg
              className="spin-slow"
              width="54"
              height="54"
              viewBox="0 0 40 40"
              style={{
                position: "absolute",
                left: "44%",
                top: "2%",
                zIndex: "3",
              }}
            >
              <g fill="#f4b9cb" stroke="#4a1430" strokeWidth="1.4">
                <path d="M20 4c4 0 6 5 3 9 4-3 9-1 9 3s-5 6-9 4c3 4 1 9-3 9s-6-5-3-9c-4 3-9 1-9-3s5-6 9-4c-3-4-1-9 3-9z" />
              </g>
              <circle
                cx="20"
                cy="18"
                r="3.4"
                fill="#f2c46b"
                stroke="#4a1430"
                strokeWidth="1.2"
              />
            </svg>
            <svg
              className="twinkle"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              style={{
                position: "absolute",
                right: "8%",
                top: "48%",
                zIndex: "3",
              }}
            >
              <path
                d="M15 2 C16 11, 19 14, 28 15 C19 16, 16 19, 15 28 C14 19, 11 16, 2 15 C11 14, 14 11, 15 2 Z"
                fill="#f2c46b"
                stroke="#4a1430"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              className="twinkle"
              width="20"
              height="20"
              viewBox="0 0 30 30"
              style={{
                position: "absolute",
                left: "6%",
                top: "0",
                animationDelay: "-1.5s",
              }}
            >
              <path
                d="M15 2 C16 11, 19 14, 28 15 C19 16, 16 19, 15 28 C14 19, 11 16, 2 15 C11 14, 14 11, 15 2 Z"
                fill="#e9dcf6"
                stroke="#4a1430"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <svg
              width="46"
              height="40"
              viewBox="0 0 46 40"
              style={{
                position: "absolute",
                left: "6%",
                bottom: "6%",
                zIndex: "3",
              }}
              className="bob"
            >
              <path
                d="M23 36 C 6 24, 2 14, 8 8 C 14 2, 21 6, 23 12 C 25 6, 32 2, 38 8 C 44 14, 40 24, 23 36 Z"
                fill="#fbd3df"
                stroke="#4a1430"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <svg
          viewBox="0 0 1440 40"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{
            display: "block",
            width: "100%",
            height: "28px",
            marginTop: "-28px",
            position: "relative",
          }}
        >
          <path
            d="M0 40 L0 20 C 120 0, 240 40, 360 20 S 600 0, 720 20 S 960 40, 1080 20 S 1320 0, 1440 20 L1440 40 Z"
            fill="#f6e9ee"
          />
        </svg>
      </section>
      <div
        aria-hidden="true"
        className="ribbon"
        style={{
          background:
            "linear-gradient(90deg, #f6e9ee, #f8f2ea 30%, #efe5f4 70%, #f6e9ee)",
          borderTop: "1px solid #f3c9da",
          borderBottom: "1px solid #f3c9da",
          padding: "16px 0",
          overflow: "hidden",
        }}
      >
        <div
          className="run"
          style={{
            alignItems: "center",
            fontFamily: "'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "22px",
            color: "#6b1d3a",
            whiteSpace: "nowrap",
          }}
        >
          {ribbon.map((r, $index) => (
            <Fragment key={$index}>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "22px",
                }}
              >
                <span>{r.label}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <g fill={r.petal}>
                    <ellipse cx="10" cy="5" rx="3" ry="4.4" />
                    <ellipse
                      cx="15"
                      cy="8.6"
                      rx="3"
                      ry="4.4"
                      transform="rotate(72 15 8.6)"
                    />
                    <ellipse
                      cx="13.1"
                      cy="14.6"
                      rx="3"
                      ry="4.4"
                      transform="rotate(144 13.1 14.6)"
                    />
                    <ellipse
                      cx="6.9"
                      cy="14.6"
                      rx="3"
                      ry="4.4"
                      transform="rotate(216 6.9 14.6)"
                    />
                    <ellipse
                      cx="5"
                      cy="8.6"
                      rx="3"
                      ry="4.4"
                      transform="rotate(288 5 8.6)"
                    />
                  </g>
                  <circle cx="10" cy="10" r="2.4" fill="#e57fa9" />
                </svg>
              </span>
            </Fragment>
          ))}
        </div>
      </div>
      <section id="work" className="lilac">
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "96px 20px 72px",
            display: "flex",
            flexDirection: "column",
            gap: "110px",
          }}
        >
          <div
            className="rv"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#d0457f",
              }}
            >
              Selected work
            </div>
            <h2
              style={{
                margin: "0",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: "400",
                fontSize: "clamp(42px, 5.4vw, 80px)",
                lineHeight: "1",
                letterSpacing: "-.02em",
                color: "#4a1430",
                textWrap: "balance",
              }}
            >
              What it was.
              <em style={{ color: "#d0457f" }}>What it became.</em>
            </h2>
            <p
              style={{
                margin: "0",
                maxWidth: "50ch",
                fontSize: "17px",
                lineHeight: "1.6",
                color: "#5b4a50",
              }}
            >
              Flip each switch to see the boring version it replaced. Tap a
              screen to open the live site.
            </p>
            <button
              className="btn"
              type="button"
              onClick={flipAll}
              style={{
                cursor: "pointer",
                border: "1px solid #e57fa9",
                background: "#ffffff",
                color: "#4a1430",
                borderRadius: "999px",
                padding: "12px 20px",
                minHeight: "46px",
                font: "700 14px Manrope, sans-serif",
              }}
            >
              {flipAllLabel}
            </button>
          </div>
          {projects.map((p, $index) => (
            <Fragment key={$index}>
              <article
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "40px 64px",
                  alignItems: "center",
                  flexDirection: p.dir,
                }}
              >
                <div
                  className={`stage ${p.enter}`}
                  style={{
                    flex: "1 1 520px",
                    minWidth: "0",
                    position: "relative",
                    padding: "34px 6px 30px",
                  }}
                >
                  <div
                    className="par"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      zIndex: "0",
                      top: "-10px",
                      [p.numSide]: "-6px",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "clamp(120px, 18vw, 230px)",
                      lineHeight: ".8",
                      color: "transparent",
                      WebkitTextStroke: "1.2px rgba(208,69,127,.4)",
                    }}
                  >
                    {p.num}
                  </div>
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      zIndex: "0",
                      inset: "12% 10% 6% 10%",
                      borderRadius: "50%",
                      background: `radial-gradient(circle, ${p.glow}, transparent 68%)`,
                      filter: "blur(10px)",
                    }}
                  />
                  <div
                    style={{
                      position: "relative",
                      zIndex: "2",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "-22px",
                    }}
                  >
                    <button
                      className={`sw ${p.swClass}`}
                      type="button"
                      role="switch"
                      aria-checked={p.aria}
                      aria-label={`Show the boring version of ${p.name}`}
                      onClick={p.toggle}
                    >
                      <span className="knob" aria-hidden="true" />
                      <span className="lab l1">It became</span>
                      <span className="lab l2">It was</span>
                    </button>
                  </div>
                  <a
                    className="frame"
                    href={p.url}
                    aria-label={`Open ${p.name}`}
                    style={{
                      position: "relative",
                      zIndex: "1",
                      display: "block",
                      textDecoration: "none",
                      borderRadius: "16px",
                      overflow: "hidden",
                      background: "#ffffff",
                      border: "1px solid #f2d2df",
                      boxShadow: "0 34px 70px -38px rgba(74,20,48,.55)",
                      transform: `rotate(${p.tilt})`,
                    }}
                  >
                    <div
                      style={{
                        height: "34px",
                        background: "#fdeef4",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "0 12px",
                        borderBottom: "1px solid #f2d2df",
                      }}
                    >
                      <span
                        style={{
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "#d8a7b5",
                        }}
                      />
                      <span
                        style={{
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "#e7cf9d",
                        }}
                      />
                      <span
                        style={{
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "#b9d1b3",
                        }}
                      />
                      <span
                        style={{
                          marginLeft: "10px",
                          fontSize: "11px",
                          color: "#6b5a60",
                          background: "#ffffff",
                          borderRadius: "999px",
                          padding: "3px 12px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.domain}
                      </span>
                    </div>
                    <div
                      className="cq"
                      style={{
                        position: "relative",
                        aspectRatio: "1400 / 778",
                        overflow: "hidden",
                        background: "#efe7dd",
                      }}
                    >
                      <img
                        className={`after ${p.afterClass}`}
                        src={p.img}
                        alt={`${p.name} live site`}
                        style={{
                          display: "block",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div
                        className={`before ${p.beforeClass}`}
                        aria-hidden="true"
                      >
                        {p.isChat ? (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                inset: "0",
                                background: "#e8ded2",
                                backgroundImage:
                                  "radial-gradient(rgba(120,100,80,.08) 1px, transparent 1.2px)",
                                backgroundSize: "2.2cqw 2.2cqw",
                                display: "flex",
                                justifyContent: "center",
                                fontFamily:
                                  "-apple-system, 'Segoe UI', Roboto, Arial, sans-serif",
                              }}
                            >
                              <div
                                style={{
                                  width: "62cqw",
                                  height: "100%",
                                  display: "flex",
                                  flexDirection: "column",
                                  background: "rgba(255,255,255,.18)",
                                }}
                              >
                                <div
                                  style={{
                                    background: "#33424b",
                                    color: "#ffffff",
                                    padding: "1.6cqw 2.2cqw",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1.6cqw",
                                  }}
                                >
                                  <span
                                    style={{
                                      width: "4.4cqw",
                                      height: "4.4cqw",
                                      borderRadius: "50%",
                                      background: "#8aa0aa",
                                      flex: "0 0 auto",
                                    }}
                                  />
                                  <span
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: ".3cqw",
                                      minWidth: "0",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontSize: "2.1cqw",
                                        fontWeight: "600",
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      }}
                                    >
                                      {p.chatName}
                                    </span>
                                    <span
                                      style={{
                                        fontSize: "1.5cqw",
                                        opacity: ".75",
                                      }}
                                    >
                                      {p.chatSub}
                                    </span>
                                  </span>
                                </div>
                                <div
                                  style={{
                                    flex: "1",
                                    padding: "2cqw",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.2cqw",
                                    overflow: "hidden",
                                  }}
                                >
                                  {p.msgs.map((m, $index) => (
                                    <Fragment key={$index}>
                                      <div
                                        style={{
                                          alignSelf: m.align,
                                          maxWidth: "80%",
                                          background: m.bg,
                                          borderRadius: "1.2cqw",
                                          padding: "1cqw 1.4cqw .8cqw",
                                          boxShadow:
                                            "0 .2cqw .3cqw rgba(0,0,0,.08)",
                                          display: "flex",
                                          flexDirection: "column",
                                          gap: ".3cqw",
                                        }}
                                      >
                                        {m.showWho ? (
                                          <>
                                            <span
                                              style={{
                                                fontSize: "1.5cqw",
                                                fontWeight: "700",
                                                color: m.whoColor,
                                              }}
                                            >
                                              {m.who}
                                            </span>
                                          </>
                                        ) : null}
                                        <span
                                          style={{
                                            fontSize: "1.85cqw",
                                            lineHeight: "1.35",
                                            color: "#1f2a30",
                                            fontStyle: m.style,
                                          }}
                                        >
                                          {m.text}
                                        </span>
                                        <span
                                          style={{
                                            alignSelf: "flex-end",
                                            fontSize: "1.3cqw",
                                            color: "#7b8a90",
                                          }}
                                        >
                                          {m.time}
                                        </span>
                                      </div>
                                    </Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {p.isCard ? (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                inset: "0",
                                background:
                                  "radial-gradient(ellipse at 40% 30%, #c9a985, #8f6b4c)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  width: "40cqw",
                                  aspectRatio: "5 / 7",
                                  background: "#fbf8f1",
                                  transform: "rotate(-4deg)",
                                  boxShadow: "0 2cqw 3cqw rgba(0,0,0,.35)",
                                  padding: "2.4cqw",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  textAlign: "center",
                                  gap: "1cqw",
                                  fontFamily: "'Times New Roman', Times, serif",
                                  color: "#3b2b1e",
                                  border: ".3cqw double #b89a64",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "1.4cqw",
                                    letterSpacing: ".3cqw",
                                  }}
                                >
                                  THE FAMILIES OF
                                </span>
                                <span style={{ fontSize: "1.6cqw" }}>
                                  INVITE YOU TO THE WEDDING OF
                                </span>
                                <span
                                  style={{
                                    fontSize: "3.6cqw",
                                    fontStyle: "italic",
                                  }}
                                >
                                  Inioluwa &amp; Adeboye
                                </span>
                                <span style={{ fontSize: "1.7cqw" }}>
                                  19th &amp; 20th June 2026
                                </span>
                                <span style={{ fontSize: "1.5cqw" }}>
                                  Ijebu Igbo, Ogun State
                                </span>
                                <span
                                  style={{
                                    fontSize: "1.05cqw",
                                    lineHeight: "1.3",
                                    color: "#6d5a45",
                                  }}
                                >
                                  Trad: Fri. White wedding: Sat. Reception
                                  after. Colours: wine &amp; gold. Kindly come
                                  with this card. RSVP to the family. Gifts
                                  welcome. Venue details on request. Dress code
                                  for after-party to be announced. Please
                                  confirm attendance before
                                </span>
                                <span
                                  style={{
                                    marginTop: "auto",
                                    fontSize: "1.2cqw",
                                    color: "#a0412d",
                                    transform: "rotate(-6deg)",
                                    border: ".2cqw solid #a0412d",
                                    padding: ".3cqw .8cqw",
                                  }}
                                >
                                  NO SPACE LEFT
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}
                        {p.isForm ? (
                          <>
                            <div
                              style={{
                                position: "absolute",
                                inset: "0",
                                background: "#eceef0",
                                display: "flex",
                                justifyContent: "center",
                                paddingTop: "3cqw",
                                fontFamily: "Arial, Helvetica, sans-serif",
                              }}
                            >
                              <div
                                style={{
                                  width: "58cqw",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "1.4cqw",
                                }}
                              >
                                <div
                                  style={{
                                    background: "#ffffff",
                                    borderTop: "1cqw solid #8796a3",
                                    borderRadius: ".8cqw",
                                    padding: "2.2cqw",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: ".8cqw",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "3cqw",
                                      color: "#202124",
                                    }}
                                  >
                                    Customer Feedback Form
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "1.5cqw",
                                      color: "#5f6368",
                                    }}
                                  >
                                    Please fill this form. * Required
                                  </span>
                                </div>
                                <div
                                  style={{
                                    background: "#ffffff",
                                    borderRadius: ".8cqw",
                                    padding: "2cqw",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.2cqw",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.7cqw",
                                      color: "#202124",
                                    }}
                                  >
                                    Full name *
                                  </span>
                                  <span
                                    style={{
                                      height: ".2cqw",
                                      background: "#bdc1c6",
                                      width: "60%",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{
                                    background: "#ffffff",
                                    borderRadius: ".8cqw",
                                    padding: "2cqw",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.2cqw",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.7cqw",
                                      color: "#202124",
                                    }}
                                  >
                                    Rate our service *
                                  </span>
                                  <span
                                    style={{
                                      display: "flex",
                                      gap: "3cqw",
                                      fontSize: "1.5cqw",
                                      color: "#5f6368",
                                    }}
                                  >
                                    <span>○ 1</span>
                                    <span>○ 2</span>
                                    <span>○ 3</span>
                                    <span>○ 4</span>
                                    <span>○ 5</span>
                                  </span>
                                </div>
                                <div
                                  style={{
                                    background: "#ffffff",
                                    borderRadius: ".8cqw",
                                    padding: "2cqw",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1.2cqw",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontSize: "1.7cqw",
                                      color: "#202124",
                                    }}
                                  >
                                    Any other comment?
                                  </span>
                                  <span
                                    style={{
                                      height: ".2cqw",
                                      background: "#bdc1c6",
                                      width: "80%",
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    alignSelf: "flex-start",
                                    background: "#8796a3",
                                    color: "#ffffff",
                                    fontSize: "1.6cqw",
                                    padding: "1cqw 2.4cqw",
                                    borderRadius: ".5cqw",
                                  }}
                                >
                                  Submit
                                </span>
                              </div>
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </a>
                  <div
                    className="bob"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      zIndex: "3",
                      left: "0",
                      bottom: "6px",
                      background: "#4a1430",
                      color: "#f8f2ea",
                      border: "1px solid #e57fa9",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 14px 28px -12px rgba(74,20,48,.7)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {p.s1}
                  </div>
                  <div
                    className="bob2"
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      zIndex: "3",
                      right: "0",
                      top: "44%",
                      background: "#ffffff",
                      color: "#4a1430",
                      borderRadius: "999px",
                      padding: "8px 14px",
                      fontSize: "13px",
                      fontWeight: "700",
                      boxShadow: "0 14px 28px -12px rgba(74,20,48,.5)",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#ff8fbf",
                      }}
                    />
                    {p.s2}
                  </div>
                </div>
                <div
                  className="rv"
                  style={{
                    flex: "1 1 340px",
                    minWidth: "0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: ".2em",
                      textTransform: "uppercase",
                      color: "#d0457f",
                    }}
                  >
                    {p.kind}
                  </div>
                  <h3
                    style={{
                      margin: "0",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontWeight: "400",
                      fontSize: "clamp(36px, 4vw, 58px)",
                      lineHeight: "1",
                      letterSpacing: "-.02em",
                      color: "#4a1430",
                    }}
                  >
                    {p.name}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      padding: "14px 16px",
                      background: "rgba(255,255,255,.75)",
                      border: "1px dashed #ecbfd1",
                      borderRadius: "14px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: ".18em",
                        textTransform: "uppercase",
                        color: "#8a7a80",
                      }}
                    >
                      It was
                    </span>
                    <span
                      style={{
                        fontSize: "16px",
                        color: "#5b4a50",
                        textDecoration: "line-through",
                        textDecorationColor: "#e57fa9",
                      }}
                    >
                      {p.was}
                    </span>
                  </div>
                  <p
                    style={{
                      margin: "0",
                      fontSize: "16px",
                      lineHeight: "1.65",
                      color: "#3d2c33",
                    }}
                  >
                    {p.did}
                  </p>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
                  >
                    {p.tags.map((t, $index) => (
                      <Fragment key={$index}>
                        <span
                          style={{
                            fontSize: "13px",
                            fontWeight: "600",
                            padding: "7px 13px",
                            borderRadius: "999px",
                            background: "#ffffff",
                            border: "1px solid #e2d2e6",
                            color: "#4a1430",
                          }}
                        >
                          {t}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                  <a
                    href={p.url}
                    style={{
                      alignSelf: "flex-start",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      minHeight: "44px",
                      fontWeight: "700",
                      fontSize: "15px",
                      color: "#4a1430",
                      textDecoration: "none",
                      borderBottom: "2px solid #e57fa9",
                    }}
                  >
                    Visit the live site
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </a>
                </div>
              </article>
            </Fragment>
          ))}
          <div
            className="rv-z"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 32px",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "26px 28px",
              border: "1px solid #f2d2df",
              borderRadius: "22px",
              background: "rgba(255,255,255,.85)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                minWidth: "0",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: ".2em",
                  textTransform: "uppercase",
                  color: "#d0457f",
                }}
              >
                On the table now
              </span>
              <span
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 30px)",
                  color: "#4a1430",
                }}
              >
                A celebration-of-life site, with a livestream for family abroad
              </span>
            </div>
            <span
              style={{
                fontSize: "14px",
                fontWeight: "700",
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#4a1430",
                color: "#f8f2ea",
              }}
            >
              Coming soon
            </span>
          </div>
        </div>
      </section>
      <section id="kind-words" className="silk" style={{ color: "#f8f2ea" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "100px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "44px",
          }}
        >
          <div
            className="rv"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "700",
                letterSpacing: ".22em",
                textTransform: "uppercase",
                color: "#e57fa9",
              }}
            >
              Kind words
            </div>
            <h2
              style={{
                margin: "0",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: "400",
                fontSize: "clamp(42px, 5.4vw, 80px)",
                lineHeight: "1",
                letterSpacing: "-.02em",
              }}
            >
              They said it,
              <em className="shine">not me.</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "22px" }}>
            <div
              className="rv-l"
              style={{ flex: "1 1 300px", minWidth: "0", display: "flex" }}
            >
              <figure
                className="card"
                style={{
                  margin: "0",
                  flex: "1",
                  background: "#f8f2ea",
                  color: "#1f1418",
                  borderRadius: "24px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "100px",
                    lineHeight: ".6",
                    height: "40px",
                    color: "#e57fa9",
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    margin: "0",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(26px, 2.6vw, 32px)",
                    lineHeight: "1.15",
                    color: "#4a1430",
                  }}
                >
                  I've gone through it. You did a fantastic job my love.
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "18px",
                    borderTop: "1px solid #f2d2df",
                  }}
                >
                  <span
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#4a1430",
                      color: "#e57fa9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "20px",
                    }}
                  >
                    I
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "700", fontSize: "15px" }}>
                      The bride
                    </span>
                    <span style={{ fontSize: "13px", color: "#6b5a60" }}>
                      Ini &amp; Ade wedding website
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
            <div
              className="rv"
              style={{ flex: "1 1 300px", minWidth: "0", display: "flex" }}
            >
              <figure
                className="card"
                style={{
                  margin: "0",
                  flex: "1",
                  background: "#f8f2ea",
                  color: "#1f1418",
                  borderRadius: "24px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "100px",
                    lineHeight: ".6",
                    height: "40px",
                    color: "#e57fa9",
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    margin: "0",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(32px, 3.2vw, 42px)",
                    lineHeight: "1.1",
                    color: "#4a1430",
                  }}
                >
                  It's perfect. I love it.
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "18px",
                    borderTop: "1px solid #f2d2df",
                  }}
                >
                  <span
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#2f5a3a",
                      color: "#f8f2ea",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "20px",
                    }}
                  >
                    H
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "700", fontSize: "15px" }}>
                      Harobed
                    </span>
                    <span style={{ fontSize: "13px", color: "#6b5a60" }}>
                      Frootshive feedback form &amp; members club
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
            <div
              className="rv-r"
              style={{ flex: "1 1 300px", minWidth: "0", display: "flex" }}
            >
              <figure
                className="card"
                style={{
                  margin: "0",
                  flex: "1",
                  background: "#f8f2ea",
                  color: "#1f1418",
                  borderRadius: "24px",
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "100px",
                    lineHeight: ".6",
                    height: "40px",
                    color: "#e57fa9",
                  }}
                >
                  “
                </div>
                <blockquote
                  style={{
                    margin: "0",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontSize: "clamp(28px, 2.9vw, 36px)",
                    lineHeight: "1.12",
                    color: "#4a1430",
                  }}
                >
                  You did a perfect work layout.
                </blockquote>
                <figcaption
                  style={{
                    marginTop: "auto",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    paddingTop: "18px",
                    borderTop: "1px solid #f2d2df",
                  }}
                >
                  <span
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: "#e57fa9",
                      color: "#3a1022",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "20px",
                    }}
                  >
                    E
                  </span>
                  <span style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontWeight: "700", fontSize: "15px" }}>
                      Emmanuel Asunomeh
                    </span>
                    <span style={{ fontSize: "13px", color: "#6b5a60" }}>
                      Team lead, on a 16-product insurance form
                    </span>
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
      <section id="services" className="lilac">
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "100px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "44px",
          }}
        >
          <div
            className="rv"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "16px 48px",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  letterSpacing: ".22em",
                  textTransform: "uppercase",
                  color: "#d0457f",
                }}
              >
                What I can make
              </div>
              <h2
                style={{
                  margin: "0",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: "400",
                  fontSize: "clamp(42px, 5.4vw, 80px)",
                  lineHeight: "1",
                  letterSpacing: "-.02em",
                  color: "#4a1430",
                  textWrap: "balance",
                }}
              >
                If it's boring,
                <em style={{ color: "#d0457f" }}>I can fix it.</em>
              </h2>
            </div>
            <p
              style={{
                margin: "0",
                maxWidth: "40ch",
                fontSize: "16px",
                lineHeight: "1.6",
                color: "#5b4a50",
              }}
            >
              A few favourites, by who usually asks. Not on the list? Send it
              anyway.
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {services.map((s, $index) => (
              <Fragment key={$index}>
                <div className="rv-z" style={{ display: "flex" }}>
                  <div
                    className="card"
                    style={{
                      flex: "1",
                      background: "rgba(255,255,255,.9)",
                      border: "1px solid #e2d2e6",
                      borderRadius: "22px",
                      padding: "26px 24px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "16px",
                        background: s.bg,
                        color: s.fg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontStyle: "italic",
                        fontSize: "26px",
                      }}
                    >
                      {s.mark}
                    </div>
                    <h3
                      style={{
                        margin: "0",
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontWeight: "400",
                        fontSize: "30px",
                        lineHeight: "1.05",
                        color: "#4a1430",
                      }}
                    >
                      {s.title}
                    </h3>
                    <ul
                      style={{
                        margin: "0",
                        padding: "0",
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      {s.items.map((i, $index) => (
                        <Fragment key={$index}>
                          <li
                            style={{
                              display: "flex",
                              gap: "10px",
                              alignItems: "flex-start",
                              fontSize: "15px",
                              lineHeight: "1.45",
                              color: "#3d2c33",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                flex: "0 0 auto",
                                marginTop: "7px",
                                width: "6px",
                                height: "6px",
                                transform: "rotate(45deg)",
                                background: "#e57fa9",
                              }}
                            />
                            {i}
                          </li>
                        </Fragment>
                      ))}
                    </ul>
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </section>
      <section style={{ background: "#f8f2ea" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "100px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "72px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "28px" }}
          >
            <h2
              className="rv"
              style={{
                margin: "0",
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontWeight: "400",
                fontSize: "clamp(38px, 4.6vw, 68px)",
                lineHeight: "1",
                letterSpacing: "-.02em",
                color: "#4a1430",
              }}
            >
              Three steps.
              <em style={{ color: "#d0457f" }}>A week at most.</em>
            </h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              <div
                className="rv"
                style={{
                  flex: "1 1 240px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  paddingTop: "22px",
                  borderTop: "1px solid #e57fa9",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "48px",
                    lineHeight: "1",
                    color: "#e57fa9",
                  }}
                >
                  01
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "19px",
                    color: "#4a1430",
                  }}
                >
                  Send me the boring thing
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.55",
                    color: "#5b4a50",
                  }}
                >
                  The IV, the form, the menu, the voice note. Plus your colours
                  and the mood you want.
                </span>
              </div>
              <div
                className="rv"
                style={{
                  flex: "1 1 240px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  paddingTop: "22px",
                  borderTop: "1px solid #e57fa9",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "48px",
                    lineHeight: "1",
                    color: "#e57fa9",
                  }}
                >
                  02
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "19px",
                    color: "#4a1430",
                  }}
                >
                  See it on your phone
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.55",
                    color: "#5b4a50",
                  }}
                >
                  A working first look, then two rounds of changes until it
                  feels right.
                </span>
              </div>
              <div
                className="rv"
                style={{
                  flex: "1 1 240px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  paddingTop: "22px",
                  borderTop: "1px solid #e57fa9",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    fontStyle: "italic",
                    fontSize: "48px",
                    lineHeight: "1",
                    color: "#e57fa9",
                  }}
                >
                  03
                </span>
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "19px",
                    color: "#4a1430",
                  }}
                >
                  Live in 3–7 days
                </span>
                <span
                  style={{
                    fontSize: "15px",
                    lineHeight: "1.55",
                    color: "#5b4a50",
                  }}
                >
                  One link that opens with your photo on WhatsApp and works on
                  every phone.
                </span>
              </div>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "26px" }}
          >
            <div
              className="rv"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px 32px",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  margin: "0",
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: "400",
                  fontSize: "clamp(38px, 4.6vw, 68px)",
                  lineHeight: "1",
                  letterSpacing: "-.02em",
                  color: "#4a1430",
                }}
              >
                Starting prices
              </h2>
              <span style={{ fontSize: "15px", color: "#6b5a60" }}>
                Abroad? Ask for pricing in dollars or pounds.
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                alignItems: "stretch",
              }}
            >
              <div
                className="rv-l"
                style={{ flex: "1 1 260px", display: "flex" }}
              >
                <div
                  className="card"
                  style={{
                    flex: "1",
                    background: "#ffffff",
                    border: "1px solid #f2d2df",
                    borderRadius: "24px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#d0457f",
                    }}
                  >
                    Simple
                  </span>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "56px",
                      lineHeight: "1",
                      color: "#4a1430",
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    ₦50,000
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.55",
                      color: "#5b4a50",
                    }}
                  >
                    One beautiful page: the details, the programme, the map.
                  </span>
                </div>
              </div>
              <div
                className="rv-z"
                style={{ flex: "1 1 260px", display: "flex" }}
              >
                <div
                  className="card silk"
                  style={{
                    flex: "1",
                    color: "#f8f2ea",
                    borderRadius: "24px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    boxShadow: "0 30px 60px -30px rgba(74,20,48,.7)",
                  }}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontWeight: "700",
                        fontSize: "14px",
                        letterSpacing: ".12em",
                        textTransform: "uppercase",
                        color: "#e57fa9",
                      }}
                    >
                      Standard
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        background: "#ff8fbf",
                        color: "#2a0b1a",
                        borderRadius: "999px",
                        padding: "5px 11px",
                      }}
                    >
                      Most picked
                    </span>
                  </span>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "56px",
                      lineHeight: "1",
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    ₦100,000
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.55",
                      color: "#ead9df",
                    }}
                  >
                    Simple, plus RSVP or a form, a gallery and one custom
                    section.
                  </span>
                </div>
              </div>
              <div
                className="rv-r"
                style={{ flex: "1 1 260px", display: "flex" }}
              >
                <div
                  className="card"
                  style={{
                    flex: "1",
                    background: "#ffffff",
                    border: "1px solid #f2d2df",
                    borderRadius: "24px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <span
                    style={{
                      fontWeight: "700",
                      fontSize: "14px",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                      color: "#d0457f",
                    }}
                  >
                    Premium
                  </span>
                  <span
                    style={{
                      fontFamily: "'Instrument Serif', Georgia, serif",
                      fontSize: "56px",
                      lineHeight: "1",
                      color: "#4a1430",
                      fontVariantNumeric: "lining-nums tabular-nums",
                    }}
                  >
                    ₦150,000
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      lineHeight: "1.55",
                      color: "#5b4a50",
                    }}
                  >
                    Standard, plus livestream, automated emails and reminders.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="book"
        style={{
          overflow: "hidden",
          color: "#4a1430",
          backgroundColor: "#fbe6ee",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(214,198,236,.7), transparent 30%), radial-gradient(circle at 85% 80%, rgba(246,214,170,.6), transparent 32%), radial-gradient(rgba(74,20,48,.07) 1px, transparent 1.4px)",
          backgroundSize: "auto, auto, 22px 22px",
        }}
      >
        <div
          className="rv-z"
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "110px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "26px",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#b0457a",
              fontFamily: "Caveat, cursive",
              fontSize: "28px",
              letterSpacing: "0",
              textTransform: "none",
              fontWeight: "700",
            }}
          >
            psst, let's make it beautiful
          </div>
          <h2
            style={{
              margin: "0",
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: "400",
              fontSize: "clamp(48px, 7vw, 104px)",
              lineHeight: ".95",
              letterSpacing: "-.02em",
              textWrap: "balance",
            }}
          >
            Got something boring?
            <em style={{ color: "#b0457a" }}>Send it to me.</em>
          </h2>
          <a
            className="btn"
            href="https://wa.me/2348050366355"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "17px 28px",
              minHeight: "58px",
              borderRadius: "999px",
              background: "#4a1430",
              color: "#fbf3ee",
              fontWeight: "800",
              fontSize: "17px",
              boxShadow: "4px 4px 0 #ff8fbf",
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
            </svg>
            WhatsApp 0805 036 6355
          </a>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "4px 24px",
              fontSize: "15px",
              color: "#5b3a48",
            }}
          >
            <a
              href="mailto:olufunbiibrahim@gmail.com"
              style={{
                padding: "10px 0",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                wordBreak: "break-all",
              }}
            >
              olufunbiibrahim@gmail.com
            </a>
            <span
              style={{
                padding: "10px 0",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
              }}
            >
              @eventlybuilt
            </span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <a
              className="btn"
              href="https://www.instagram.com/eventlybuilt/"
              aria-label="Instagram"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "46px",
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1.5px solid #4a1430",
                color: "#4a1430",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "3px 3px 0 #ff8fbf",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              className="btn"
              href="https://www.tiktok.com/@eventlybuilt"
              aria-label="TikTok"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "46px",
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1.5px solid #4a1430",
                color: "#4a1430",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "3px 3px 0 #ff8fbf",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
                <path d="M14 3c.5 3 2.5 5 5.5 5.3" />
              </svg>
              <span>TikTok</span>
            </a>
            <a
              className="btn"
              href="https://x.com/IbrahimOlufunbi"
              aria-label="X"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "46px",
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1.5px solid #4a1430",
                color: "#4a1430",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "3px 3px 0 #ff8fbf",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
              <span>X</span>
            </a>
            <a
              className="btn"
              href="https://www.linkedin.com/in/olufunbi-ibrahim-2bb29922a/"
              aria-label="LinkedIn"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                minHeight: "46px",
                padding: "10px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1.5px solid #4a1430",
                color: "#4a1430",
                fontSize: "14px",
                fontWeight: "700",
                boxShadow: "3px 3px 0 #ff8fbf",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <path d="M8 11v5M8 8v.01M12 16v-5M12 13c0-1.5 1-2 2-2s2 .5 2 2v3" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
      <footer style={{ background: "#1f0714", color: "#bfa6b0" }}>
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "24px 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "14px",
          }}
        >
          <span>
            <span
              style={{
                fontFamily: "'Instrument Serif', Georgia, serif",
                fontSize: "18px",
                color: "#f8f2ea",
              }}
            >
              Eventlybuilt
            </span>
            by Funbi · Abuja
          </span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: "4px 18px" }}>
            <a
              href="https://www.instagram.com/eventlybuilt/"
              style={{ padding: "10px 0" }}
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@eventlybuilt"
              style={{ padding: "10px 0" }}
            >
              TikTok
            </a>
            <a
              href="https://x.com/IbrahimOlufunbi"
              style={{ padding: "10px 0" }}
            >
              X
            </a>
            <a
              href="https://www.linkedin.com/in/olufunbi-ibrahim-2bb29922a/"
              style={{ padding: "10px 0" }}
            >
              LinkedIn
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
