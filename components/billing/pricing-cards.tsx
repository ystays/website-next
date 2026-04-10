"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import CheckoutButton from "@/components/billing/checkout-button";

const FREE_FEATURES = [
  "Access to all public content",
  "Blog & project showcase",
  "Community support",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Early access to new features",
  "Priority support",
  "Exclusive content",
];

const LIFETIME_FEATURES = [
  "Everything in Pro",
  "Lifetime updates",
  "No recurring charges",
  "Badge on profile",
];

const btnBase =
  "mt-8 w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-75 active:scale-95 disabled:opacity-60";
const btnPrimary = `${btnBase} bg-black text-white hover:bg-stone-800`;
const btnSecondary = `${btnBase} border border-gray-200 bg-white text-gray-900 hover:bg-gray-50`;

interface PricingCardsProps {
  isAuthenticated: boolean;
  proMonthlyPriceId: string;
  proYearlyPriceId: string;
  lifetimePriceId: string;
}

export default function PricingCards({
  isAuthenticated,
  proMonthlyPriceId,
  proYearlyPriceId,
  lifetimePriceId,
}: PricingCardsProps) {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Toggle */}
      <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white p-1 text-sm shadow-sm">
        <button
          onClick={() => setYearly(false)}
          className={`rounded-full px-4 py-1.5 transition-all ${!yearly ? "bg-black text-white" : "text-gray-500 hover:text-gray-900"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setYearly(true)}
          className={`rounded-full px-4 py-1.5 transition-all ${yearly ? "bg-black text-white" : "text-gray-500 hover:text-gray-900"}`}
        >
          Yearly
          <span className="ml-1.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-xs font-medium text-emerald-700">
            Save 17%
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
        {/* Free */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Free</p>
          <p className="mt-2 font-display text-4xl font-bold text-gray-900">
            $0
          </p>
          <p className="mt-1 text-sm text-gray-400">Forever free</p>
          <ul className="mt-6 space-y-3">
            {FREE_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 shrink-0 text-gray-400" />
                {f}
              </li>
            ))}
          </ul>
          <div className={`${btnSecondary} mt-8 cursor-default text-center`}>
            Current plan
          </div>
        </div>

        {/* Pro — highlighted */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ring-2 ring-black">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Pro</p>
            <span className="rounded-full bg-black px-2.5 py-0.5 text-xs font-semibold text-white">
              Popular
            </span>
          </div>
          <p className="mt-2 font-display text-4xl font-bold text-gray-900">
            {yearly ? "$90" : "$9"}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            {yearly ? "per year — save $18" : "per month"}
          </p>
          <ul className="mt-6 space-y-3">
            {PRO_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 shrink-0 text-black" />
                {f}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId={yearly ? proYearlyPriceId : proMonthlyPriceId}
            mode="subscription"
            isAuthenticated={isAuthenticated}
            className={btnPrimary}
          >
            Get Pro
          </CheckoutButton>
        </div>

        {/* Lifetime */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Lifetime</p>
          <p className="mt-2 font-display text-4xl font-bold text-gray-900">
            $149
          </p>
          <p className="mt-1 text-sm text-gray-400">One-time payment</p>
          <ul className="mt-6 space-y-3">
            {LIFETIME_FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                <Check className="h-4 w-4 shrink-0 text-gray-400" />
                {f}
              </li>
            ))}
          </ul>
          <CheckoutButton
            priceId={lifetimePriceId}
            mode="payment"
            isAuthenticated={isAuthenticated}
            className={btnSecondary}
          >
            Buy Lifetime
          </CheckoutButton>
        </div>
      </div>
    </div>
  );
}
