// Prisma client singleton — safe for Next.js dev hot-reload.
// Prisma 7 requires a driver adapter; the client is generated into app/generated/prisma
// by `prisma generate` (runs automatically before `npm run build` and after `npm install`).
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@/app/generated/prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // The pool connects lazily, so a missing DATABASE_URL only fails when a query runs,
  // not at build time.
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}
