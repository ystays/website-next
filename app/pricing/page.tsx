import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/options";
import PricingCards from "@/components/billing/pricing-cards";

export const metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing.",
};

export default async function PricingPage() {
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session;

  return (
    <div className="z-10 w-full max-w-5xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs md:text-7xl md:leading-20"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Pricing
      </h1>
      <p
        className="mt-4 animate-fade-up text-center text-gray-500 opacity-0 md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Simple, transparent pricing. No surprises.
      </p>
      <div
        className="mt-12 animate-fade-up opacity-0"
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <PricingCards
          isAuthenticated={isAuthenticated}
          proMonthlyPriceId={process.env.STRIPE_PRICE_PRO_MONTHLY ?? ""}
          proYearlyPriceId={process.env.STRIPE_PRICE_PRO_YEARLY ?? ""}
          lifetimePriceId={process.env.STRIPE_PRICE_LIFETIME ?? ""}
        />
      </div>
    </div>
  );
}
