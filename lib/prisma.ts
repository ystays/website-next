import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
import { PrismaPg } from '@prisma/adapter-pg'; // Import the correct adapter

const connectionString = process.env.DATABASE_URL;

// Create an instance of the adapter
const adapter = new PrismaPg({ connectionString });

// Pass the adapter instance to the PrismaClient constructor
const prisma = global.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;
