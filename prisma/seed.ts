import bcrypt from "bcrypt";
import { prisma } from "../src/libs/prisma.js";

const hashedPW = () => bcrypt.hashSync("123456", 8);

const userData = [
  {
    username: "Test1",
    startFund: 10000,
    hashPassword: hashedPW(),
    email: "test1@gmail.com",
  },
  {
    username: "Test2",
    hashPassword: hashedPW(),
    email: "test2@gmail.com",
  }
];

async function main() {
  console.log("clear data in Tables");
  await prisma.entrymodel.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.journalrecord.deleteMany();
  await prisma.user.deleteMany();

  console.log("Start seeding...");
  const createUsers = await prisma.user.createMany({
    data: userData,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    // 1 --> exit with error || 0 --> exit without error
    process.exit(1);
  });