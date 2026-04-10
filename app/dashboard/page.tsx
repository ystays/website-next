import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import authOptions from "@/lib/options";
import Image from "next/image";
import Link from "next/link";
import prisma from "@/lib/prisma";
import ManageBillingButton from "@/components/billing/manage-billing-button";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const { name, email, image, id: userId } = session.user ?? {};

  const [activeSubscription, lifetimePurchase, user] = await Promise.all([
    prisma.subscription.findFirst({
      where: {
        userId,
        status: { in: ["active", "trialing"] },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.purchase.findFirst({
      where: { userId, status: "succeeded" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.findUnique({
      where: { id: userId },
      select: { stripeCustomerId: true },
    }),
  ]);

  const planLabel = activeSubscription
    ? "Pro"
    : lifetimePurchase
      ? "Lifetime"
      : "Free";

  return (
    <div className="z-10 w-full max-w-xl px-5 xl:px-0">
      <h1
        className="animate-fade-up bg-linear-to-br from-black to-stone-500 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-xs md:text-7xl md:leading-20"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Dashboard
      </h1>

      {/* Profile card */}
      <div
        className="mt-10 animate-fade-up opacity-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-4">
          {image && (
            <Image
              src={image}
              alt={name ?? "User avatar"}
              width={56}
              height={56}
              className="rounded-full"
            />
          )}
          <div>
            {name && (
              <p className="font-display text-lg font-semibold text-gray-900">
                {name}
              </p>
            )}
            <p className="text-sm text-gray-500">{email}</p>
          </div>
        </div>
        <hr className="my-4 border-gray-100" />
        <p className="text-sm text-gray-500">
          You&apos;re signed in. This page is only visible to authenticated users.
        </p>
      </div>

      {/* Billing card */}
      <div
        className="mt-4 animate-fade-up opacity-0 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
      >
        <div className="flex items-center justify-between">
          <p className="font-display text-base font-semibold text-gray-900">
            Billing
          </p>
          <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            {planLabel}
          </span>
        </div>
        <hr className="my-4 border-gray-100" />

        {activeSubscription ? (
          <div className="space-y-1">
            <p className="text-sm text-gray-600">
              {activeSubscription.cancelAtPeriodEnd
                ? `Cancels on ${new Date(activeSubscription.currentPeriodEnd).toLocaleDateString()}`
                : `Renews on ${new Date(activeSubscription.currentPeriodEnd).toLocaleDateString()}`}
            </p>
            {activeSubscription.status === "trialing" && activeSubscription.trialEnd && (
              <p className="text-sm text-gray-400">
                Trial ends {new Date(activeSubscription.trialEnd).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : lifetimePurchase ? (
          <p className="text-sm text-gray-600">
            Purchased on{" "}
            {new Date(lifetimePurchase.createdAt).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            You&apos;re on the free plan.{" "}
            <Link href="/pricing" className="font-medium text-gray-900 underline underline-offset-2">
              View plans
            </Link>
          </p>
        )}

        {user?.stripeCustomerId && (
          <div className="mt-4 flex items-center gap-3">
            <ManageBillingButton className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-75 hover:bg-gray-50 active:scale-95" />
            {planLabel === "Free" && (
              <Link
                href="/pricing"
                className="text-sm font-medium text-gray-500 hover:text-gray-900"
              >
                View plans →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
