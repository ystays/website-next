"use client";

import { useState } from "react";

interface ManageBillingButtonProps {
  className?: string;
}

export default function ManageBillingButton({ className }: ManageBillingButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
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
      {loading ? "Loading…" : "Manage Billing"}
    </button>
  );
}
