import { prisma } from "../src/libs/prisma";
import { SetUpTier, WinLoseType, side } from "@prisma/client";

async function main() {
  console.log("Cleaning database...");
  await prisma.$transaction([
    prisma.journalRecord.deleteMany(),
    prisma.fundHistory.deleteMany(),
    prisma.entryModel.deleteMany(),
    prisma.asset.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  console.log("Seeding necessary data...");

  // 1. Create a default user
  const user = await prisma.user.create({
    data: {
      username: "testuser",
      email: "test@example.com",
      hashPassword: "hashedpassword", // Replace with real hash in production
      startFund: 1000,
      yourModel: "ICT",
    },
  });

  // 2. Create some assets
  const assets = await Promise.all([
    prisma.asset.create({ data: { assetName: "BTCUSDT" } }),
    prisma.asset.create({ data: { assetName: "ETHUSDT" } }),
    prisma.asset.create({ data: { assetName: "SOLUSDT" } }),
  ]);

  // 3. Create entry models for the user
  const entryModel = await prisma.entryModel.create({
    data: {
      name: "FVG Entry",
      userId: user.userId,
    },
  });

  // 4. Create a sample journal record
  await prisma.journalRecord.create({
    data: {
      userId: user.userId,
      assetId: assets[0].assetId,
      entryModelId: entryModel.id,
      setUpTier: SetUpTier.A,
      side: side.LONG,
      entryPrice: 50000,
      SL: 49500,
      TP: 51000,
      margin: 100,
      riskPerTrade: 20,
      winLose: WinLoseType.OPEN,
      notes: "Initial seed entry",
    },
  });

  // 5. Create fund history
  await prisma.fundHistory.create({
    data: {
      userId: user.userId,
      amouth: 1000,
    },
  });

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
