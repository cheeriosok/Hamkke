// app/api/auth/callback/route.ts
'use client';

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");
    if (!code) {
      return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    const res = await fetch(`https://5wvnvwiuc1.execute-api.us-east-1.amazonaws.com/dev/callback?code=${code}`);

    if (!res.ok) {
      throw new Error("Token exchange failed");
    }

    const data = await res.json();

    return NextResponse.json({
      access_token: data.access_token,
      jwt_claims: data.jwt_claims,
    });
  } catch (err) {
    console.error("Token exchange error:", err);
    return NextResponse.json({ error: "Callback error" }, { status: 500 });
  }
}
