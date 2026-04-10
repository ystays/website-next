import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";
import { getOrCreateStripeCustomer } from "@/lib/stripe";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: { ...session.user, id: user.id },
    }),
    signIn: async ({ user }) => {
      try {
        if (user.id && user.email) {
          await getOrCreateStripeCustomer(user.id, user.email, user.name);
        }
      } catch (e) {
        console.error("[signIn] Stripe customer creation failed", e);
      }
      return true;
    },
  },
  logger: {
    error: (code, metadata) => console.error("[NextAuth Error]", code, metadata),
    warn: (code) => console.warn("[NextAuth Warn]", code),
  },
};

export default authOptions;
