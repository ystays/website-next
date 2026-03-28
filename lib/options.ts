import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  logger: {
    error: (code, metadata) => console.error("[NextAuth Error]", code, metadata),
    warn: (code) => console.warn("[NextAuth Warn]", code),
  },
};

export default authOptions;