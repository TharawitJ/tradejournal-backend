import { prisma } from "../src/libs/prisma";
import { SetUpTier, WinLoseType, PositionSide } from "@prisma/client";
import bcrypt from "bcrypt";

const hashedPassword = () => bcrypt.hashSync("123456", 8);

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
      hashPassword: hashedPassword(), // Replace with real hash in production
      startFund: 1000,
    },
  });
  // 2. Create some assets
  const assetData = [
    { assetName: "BTCUSDT" },
    { assetName: "ETHUSDT" },
    { assetName: "SOLUSDT" },
  ];
  const assets = await Promise.all(
    assetData.map((item) =>
      prisma.asset.create({
        data: {
          ...item,
        },
      }),
    ),
  );

  // 3. Create entry models for the user
  const entryModelData = [
    { modelName: "FVG Entry", userId: user.userId },
    { modelName: "iFVG Entry", userId: user.userId },
    { modelName: "Breakout Entry", userId: user.userId },
  ];
  const entries = await Promise.all(
    entryModelData.map((item) =>
      prisma.entryModel.create({
        data: {
          ...item,
        },
      }),
    ),
  );

  // 4. Create a sample journal record
  await prisma.journalRecord.createMany({
    data: [
      {
        userId: user.userId,
        entryAssetId: assets[0].assetId,
        entryAssetName: assets[0].assetName,
        entryModelId: entries[1].modelId,
        entryModelName: entryModelData[1].modelName,
        setUpTier: SetUpTier.A,
        side: PositionSide.SHORT,
        entryPrice: 50000,
        SL: 50500,
        TP: 49000,
        margin: 100,
        riskPerTrade: 20,
        winLose: WinLoseType.OPEN,
        notes: "Initial seed SHORT",
        leverage: 10,
      },
      {
        userId: user.userId,
        entryAssetId: assets[1].assetId,
        entryAssetName: assets[1].assetName,
        entryModelId: entries[0].modelId,
        entryModelName: entryModelData[0].modelName,
        setUpTier: SetUpTier.A,
        side: PositionSide.LONG,
        entryPrice: 48000,
        SL: 47500,
        TP: 51000,
        margin: 100,
        riskPerTrade: 20,
        winLose: WinLoseType.OPEN,
        notes: "Initial seed LONG",
        leverage: 10,
      },
      {
        userId: user.userId,
        entryAssetId: assets[2].assetId,
        entryAssetName: assets[2].assetName,
        entryModelId: entries[2].modelId,
        entryModelName: entryModelData[2].modelName,
        setUpTier: SetUpTier.A,
        side: PositionSide.LONG,
        entryPrice: 48000,
        SL: 47500,
        TP: 51000,
        margin: 100,
        riskPerTrade: 20,
        winLose: WinLoseType.WIN,
        notes: "Initial seed WIN",
        leverage: 10,
      },
      {
        userId: user.userId,
        entryAssetId: assets[0].assetId,
        entryAssetName: assets[0].assetName,
        entryModelId: entries[0].modelId,
        entryModelName: entryModelData[0].modelName,
        setUpTier: SetUpTier.A,
        side: PositionSide.LONG,
        entryPrice: 48000,
        SL: 47500,
        TP: 51000,
        margin: 100,
        riskPerTrade: 20,
        winLose: WinLoseType.LOSE,
        notes: "Initial seed LOSE",
        leverage: 10,
      },
    ],
  });

  // 5. Create fund history
  await prisma.fundHistory.create({
    data: {
      userId: user.userId,
      amouth: 1000,
    },
  });
    await prisma.fundHistory.create({
    data: {
      userId: user.userId,
      amouth: 1203,
    },
  });
    await prisma.fundHistory.create({
    data: {
      userId: user.userId,
      amouth: 5030,
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
