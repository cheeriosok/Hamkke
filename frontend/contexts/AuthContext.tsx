"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Issuer } from "openid-client";

const COGNITO_DOMAIN = process.env.NEXT_PUBLIC_COGNITO_DOMAIN!;
const CLIENT_ID = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!;

type UserInfo = {
  sub: string;
  email?: string;  // <- was `string`, now `string?`
  name?: string;
  picture?: string;
  [key: string]: unknown;
};

interface AuthContextType {
  user: UserInfo | null;
  loading: boolean;
  login: (provider?: "Google" | "Apple") => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const issuer = await Issuer.discover(`${COGNITO_DOMAIN}/.well-known/openid-configuration`);
          const client = new issuer.Client({ client_id: CLIENT_ID });
          const userInfo = await client.userinfo(token);
          setUser(userInfo);
        }
      } catch (err) {
        console.error("Auth Error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = (provider?: "Google" | "Apple") => {
    const base = "https://5wvnvwiuc1.execute-api.us-east-1.amazonaws.com/dev/login";
  
    const url = provider
      ? `${base}?provider=${provider}`
      : base;
  
    window.location.href = url;
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    const logoutUrl = new URL(`${COGNITO_DOMAIN}/logout`);
    logoutUrl.searchParams.set("client_id", CLIENT_ID);
    logoutUrl.searchParams.set("logout_uri", REDIRECT_URI);

    window.location.href = logoutUrl.toString();
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
