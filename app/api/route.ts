import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const has = (k: string) => Boolean(process.env[k]);
  const pk = process.env.PAYSTACK_SECRET_KEY ?? "";
  return NextResponse.json({
    NEXT_PUBLIC_SUPABASE_URL: has("NEXT_PUBLIC_SUPABASE_URL"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: has("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    SUPABASE_SERVICE_ROLE_KEY: has("SUPABASE_SERVICE_ROLE_KEY"),
    PAYSTACK_SECRET_KEY: pk.startsWith("sk_live")
      ? "live"
      : pk.startsWith("sk_test")
        ? "test"
        : "missing",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? null,
  });
}
