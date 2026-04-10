"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface CheckoutButtonProps {
  priceId: string;
  mode: "subscription" | "payment";
  isAuthenticated: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function CheckoutButton({
  priceId,
  mode,
  isAuthenticated,
  children,
  className,
}: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isAuthenticated) {
      router.push("/?signin=1");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId, mode }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
    >
      {loading ? "Redirecting…" : children}
    </button>
  );
}
