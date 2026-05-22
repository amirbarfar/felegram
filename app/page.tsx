'use client'
import Welcome from "@/components/Welcome";
import { useAuth } from "../hooks/useAuth";
import MainPage from "@/components/MainPage";
import { useEffect, useState } from "react";

export default function Page() {
  const { isAuthenticated, loading } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold bg-zinc-50 text-zinc-500">
        <p>در حال بررسی وضعیت...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-zinc-50">
      {isAuthenticated ? <MainPage /> : <Welcome />}
    </div>
  );
}
