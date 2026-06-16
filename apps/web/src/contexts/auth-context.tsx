"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface AuthUser {
  email: string;
}

interface AuthContextValue {
  currentUser: AuthUser | null | undefined;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

async function authFetch(path: string, init?: RequestInit) {
  const response = await fetch(path, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? "Authentication failed");
  }
  return response.json();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authFetch("/api/auth/me")
      .then((data: { email: string }) => setCurrentUser({ email: data.email }))
      .catch(() => setCurrentUser(null))
      .finally(() => setLoading(false));
  }, []);

  const value: AuthContextValue = {
    currentUser: currentUser ?? null,
    signup: async (email, password) => {
      const data = await authFetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setCurrentUser({ email: data.email });
    },
    login: async (email, password) => {
      const data = await authFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setCurrentUser({ email: data.email });
    },
    logout: async () => {
      await authFetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
    },
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
