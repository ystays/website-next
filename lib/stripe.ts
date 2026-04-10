import Stripe from "stripe";
import prisma from "@/lib/prisma";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

export const PLANS = [
  {
    name: "Pro Monthly",
    priceId: process.env.STRIPE_PRICE_PRO_MONTHLY!,
    mode: "subscription" as const,
    price: "$9",
    period: "/mo",
    description: "Billed monthly",
  },
  {
    name: "Pro Yearly",
    priceId: process.env.STRIPE_PRICE_PRO_YEARLY!,
    mode: "subscription" as const,
    price: "$90",
    period: "/yr",
    description: "Billed annually — save $18",
  },
  {
    name: "Lifetime",
    priceId: process.env.STRIPE_PRICE_LIFETIME!,
    mode: "payment" as const,
    price: "$149",
    period: "",
    description: "One-time payment, forever",
  },
];

export async function getOrCreateStripeCustomer(
  userId: string,
  email: string,
  name?: string | null,
): Promise<string> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { stripeCustomerId: true },
  });

  if (user?.stripeCustomerId) return user.stripeCustomerId;

  const customer = await stripe.customers.create({
    email,
    name: name ?? undefined,
    metadata: { userId },
  });

  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}
