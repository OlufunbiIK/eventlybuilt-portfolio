import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eventlybuilt by Funbi",
  description:
    "Event websites, digital IVs, aso-ebi order pages, forms and menus that turn boring into fun. Built in Abuja, delivered in 3–7 days.",
  metadataBase: new URL("https://eventlybuilt-portfolio.vercel.app"),
  openGraph: {
    title: "Eventlybuilt by Funbi",
    description: "From boring to fun: event websites, IVs, forms and menus.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eventlybuilt by Funbi",
    description: "From boring to fun: event websites, IVs, forms and menus.",
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff6f9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&family=Caveat:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
