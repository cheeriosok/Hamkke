'use client';

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const exchangeCodeForToken = async () => {
      const code = searchParams.get("code");
      if (!code) {
        console.error("Missing auth code.");
        return;
      }

      try {
        const res = await fetch(`/api/auth/callback?code=${code}`);
        if (!res.ok) {
          throw new Error("Token exchange failed.");
        }

        const { access_token } = await res.json();
        localStorage.setItem("token", access_token);
        router.push("/");
      } catch (err) {
        console.error("OAuth callback error:", err);
      }
    };

    exchangeCodeForToken();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-white bg-background">
      <p>Completing sign-in...</p>
    </div>
  );
}
