import { SetUpTier, WinLoseType } from '@prisma/client';
import { prisma } from '../src/libs/prisma';
import { faker } from '@faker-js/faker';

async function main() {
  console.log('Clearing existing data...');
  // Delete in order to avoid foreign key constraints
  await prisma.journalRecord.deleteMany();
  await prisma.entryModel.deleteMany();
  await prisma.fundHistory.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding assets...');
  const assets = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT'];
  const createdAssets = await Promise.all(
    assets.map((assetName) =>
      prisma.asset.create({
        data: { assetName },
      })
    )
  );

  console.log('Seeding users...');
  const users = await Promise.all(
    Array.from({ length: 3 }).map(() =>
      prisma.user.create({
        data: {
          username: faker.internet.username(),
          email: faker.internet.email(),
          hashPassword: faker.internet.password(), // Just test no hashed for seed.
          startFund: null,
          yourModel: null,
          addFund: null,
        },
      })
    )
  );

  console.log('Seeding entry models and journals...');
  const tiers: SetUpTier[] = ['A', 'B', 'C', 'D', 'E', 'F'];

  for (const user of users) {
    // Create 3 entry models per user
    const entryModels = await Promise.all(
      Array.from({ length: 3 }).map((_, i) =>
        prisma.entryModel.create({
          data: {
            name: `Strategy ${faker.string.alphanumeric(5)} ${i}`,
            userId: user.userId,
          },
        })
      )
    );

    // Create 5 journal records per user
    for (let i = 0; i < 5; i++) {
      const asset = faker.helpers.arrayElement(createdAssets);
      const entryModel = faker.helpers.arrayElement(entryModels);
      const entryPrice = parseFloat(faker.finance.amount({ min: 1, max: 50000 }));

      await prisma.journalRecord.create({
        data: {
          userId: user.userId,
          assetId: asset.assetId,
          entryModelId: entryModel.id,
          setUpTier: faker.helpers.arrayElement(tiers),
          entryPrice: entryPrice,
          SL: entryPrice * 0.99,
          TP: entryPrice * 1.05,
          margin: parseFloat(faker.finance.amount({ min: 10, max: 1000 })),
          riskPerTrade: parseFloat(faker.finance.amount({ min: 1, max: 100 })),
          // Optional fields set to null as per instruction
          // has default now() in schema, but can be null if needed? Wait, @default(now()) means it will be now() if not provided.
          exitDateTime: null,
          advantage: null,
          disadvantage: null,
          notes: null,
          feedback: null,
          imageUrl: null,
          winLose: null,
          profit: null,
          currentBalance: null,
          duration: null,
          positionPnL: null,
        },
      });
    }
    
    // Seed some FundHistory
    await prisma.fundHistory.create({
      data: {
        userUserId: user.userId,
      },
    });
  }

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
