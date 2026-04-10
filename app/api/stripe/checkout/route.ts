import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/options";
import { stripe, getOrCreateStripeCustomer } from "@/lib/stripe";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { priceId, mode } = await req.json();
  if (!priceId || !mode) {
    return NextResponse.json({ error: "Missing priceId or mode" }, { status: 400 });
  }

  const customerId = await getOrCreateStripeCustomer(
    session.user.id,
    session.user.email!,
    session.user.name,
  );

  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    mode,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { userId: session.user.id },
    ...(mode === "subscription" && {
      subscription_data: { metadata: { userId: session.user.id } },
    }),
    ...(mode === "payment" && {
      payment_intent_data: { metadata: { userId: session.user.id } },
    }),
    success_url: `${baseUrl}/dashboard?checkout=success`,
    cancel_url: `${baseUrl}/pricing`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
