import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.POSTGRES_PRISMA_URL;
const ssl =
  process.env.POSTGRES_SSL === "false"
    ? false
    : process.env.POSTGRES_SSL_REJECT_UNAUTHORIZED === "false"
      ? { rejectUnauthorized: false }
      : true;

const adapter = new PrismaPg({ connectionString, ssl });

const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
