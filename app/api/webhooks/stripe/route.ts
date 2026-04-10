export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import Stripe from "stripe";

async function resolveUserId(
  metadata: Stripe.Metadata | null,
  customerId?: string | null,
): Promise<string | null> {
  if (metadata?.userId) return metadata.userId;
  if (customerId) {
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: customerId },
      select: { id: true },
    });
    return user?.id ?? null;
  }
  return null;
}

async function upsertSubscription(sub: Stripe.Subscription, userId: string) {
  const priceId = sub.items.data[0]?.price.id ?? "";
  const productId =
    typeof sub.items.data[0]?.price.product === "string"
      ? sub.items.data[0].price.product
      : (sub.items.data[0]?.price.product as Stripe.Product)?.id ?? "";

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      stripeProductId: productId,
      status: sub.status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      trialStart: sub.trial_start ? new Date(sub.trial_start * 1000) : null,
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
    },
    update: {
      stripePriceId: priceId,
      stripeProductId: productId,
      status: sub.status,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
      trialStart: sub.trial_start ? new Date(sub.trial_start * 1000) : null,
      trialEnd: sub.trial_end ? new Date(sub.trial_end * 1000) : null,
    },
  });
}

async function upsertPurchase(pi: Stripe.PaymentIntent, userId: string) {
  const charge =
    pi.latest_charge && typeof pi.latest_charge !== "string"
      ? (pi.latest_charge as Stripe.Charge)
      : null;

  await prisma.purchase.upsert({
    where: { stripePaymentIntentId: pi.id },
    create: {
      userId,
      stripePaymentIntentId: pi.id,
      stripeProductId: pi.metadata?.productId ?? "",
      stripePriceId: pi.metadata?.priceId ?? "",
      amount: pi.amount,
      currency: pi.currency,
      status: pi.status,
      receiptUrl: charge?.receipt_url ?? null,
    },
    update: {
      status: pi.status,
      receiptUrl: charge?.receipt_url ?? null,
    },
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error("[webhook] signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const cs = event.data.object as Stripe.Checkout.Session;
        const userId = cs.metadata?.userId ?? null;
        if (!userId) break;

        if (cs.mode === "subscription" && cs.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            typeof cs.subscription === "string" ? cs.subscription : cs.subscription.id,
          );
          await upsertSubscription(sub, userId);
        } else if (cs.mode === "payment" && cs.payment_intent) {
          const pi = await stripe.paymentIntents.retrieve(
            typeof cs.payment_intent === "string" ? cs.payment_intent : cs.payment_intent.id,
            { expand: ["latest_charge"] },
          );
          await upsertPurchase(pi, userId);
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await resolveUserId(
          sub.metadata,
          typeof sub.customer === "string" ? sub.customer : sub.customer.id,
        );
        if (userId) await upsertSubscription(sub, userId);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;
        // Only handle renewals (not the initial checkout which is covered above)
        if (invoice.billing_reason === "subscription_cycle" && invoice.subscription) {
          const sub = await stripe.subscriptions.retrieve(
            typeof invoice.subscription === "string"
              ? invoice.subscription
              : invoice.subscription.id,
          );
          const userId = await resolveUserId(
            sub.metadata,
            typeof sub.customer === "string" ? sub.customer : sub.customer.id,
          );
          if (userId) await upsertSubscription(sub, userId);
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          const subId =
            typeof invoice.subscription === "string"
              ? invoice.subscription
              : invoice.subscription.id;
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: subId },
            data: { status: "past_due" },
          });
        }
        break;
      }

      case "payment_intent.succeeded": {
        const pi = event.data.object as Stripe.PaymentIntent;
        // Idempotency guard — skip if already created via checkout.session.completed
        const existing = await prisma.purchase.findUnique({
          where: { stripePaymentIntentId: pi.id },
        });
        if (!existing) {
          const userId = await resolveUserId(
            pi.metadata,
            typeof pi.customer === "string" ? pi.customer : (pi.customer as Stripe.Customer)?.id,
          );
          if (userId) {
            const fullPi = await stripe.paymentIntents.retrieve(pi.id, {
              expand: ["latest_charge"],
            });
            await upsertPurchase(fullPi, userId);
          }
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error(`[webhook] handler error for ${event.type}`, err);
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
