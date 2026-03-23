import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  user:process.env.DATABASE_USER!,
  password:process.env.DATABASE_PASSWORD!,
  database:process.env.DATABASE_NAME!,
  host:process.env.DATABASE_HOST!,
  connectionLimit:5
});

const prisma=new PrismaClient({adapter:adapter})
// prisma.$queryRaw`show tables`.then(console.log)
export {prisma}