"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LandingPage: React.FC = () => {
  const router = useRouter();
  const { user, loading, login,  } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <main className="flex-1 flex">
        <div className="w-1/2 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image src="/hamkke.svg" alt="Hamkke Logo" fill className="object-contain" priority />
          </div>
        </div>

        <div className="w-1/2 flex items-center">
          <div className="max-w-md">
            <h1 className="text-6xl font-bold mb-4">Better Together.</h1>
            <h2 className="text-3xl mb-8">Join Hamkke today.</h2>

            <div className="space-y-4 px-8">
              <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Your email address"
                        className="w-full px-2 py-2 pl-3 bg-background border placeholder-gray-400 border-gray-500 focus:border-red-900  text-white outline-none"
                      />
                    </div>  
                    <button

className="w-full border font-semibold border-gray-500 text-[#e9e9e9] rounded py-2 px-4 bg-[#360808]/70 hover:bg-[#eeeeee] hover:text-black"
>
{"Sign in"}
</button>
          

              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-600"></div>
                <span>or</span>
                <div className="flex-1 h-px bg-gray-600"></div>
              </div>
              <button
              onClick={() => login("Google")}
              className="w-full bg-background border border-gray-500 text-white font-semibold rounded py-2 px-4 flex items-center justify-center gap-2"
              type="button"
            >
              <div className="relative w-5 h-5">
                <Image src="/images/google.png" alt="Google" fill className="object-contain" />
              </div>
              Continue with Google
            </button>

            <button
              onClick={() => login("Apple")}
              className="w-full bg-background border border-gray-500 text-white font-semibold rounded py-2 px-4 flex items-center justify-center gap-2"
              type="button"
            >
              <div className="relative w-5 h-5">
                <Image src="/images/apple_white.svg" alt="Apple" fill className="object-contain" />
              </div>
              Continue with Apple
            </button>
              {/* Toggle Between Sign In and Sign Up */}
              <div className="flex justify-center items-center">
                <button className="text-gray-500 flex justify-center items-center">
                  {"Don't have an account?"}
                  <span className="text-[#dddddd]/70 ml-2 underline">
                  Sign up
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="p-4 border-t border-gray-800">
        <nav className="flex flex-wrap gap-4 text-sm text-gray-500">
          <a href="#" className="hover:underline">About</a>
          <a href="#" className="hover:underline">Help Center</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Cookie Policy</a>
          <a href="#" className="hover:underline">Accessibility</a>
          <a href="#" className="hover:underline">Advertising</a>
          <a href="#" className="hover:underline">Marketing</a>
          <span>© 2025 Hamkke Corp.</span>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
