import { SetUpTier, WinLoseType } from '@prisma/client';
import bcrypt from 'bcrypt'
import {prisma} from '../src/libs/prisma' 
import { faker } from '@faker-js/faker';
// const hashPassword = bcrypt.hash(faker.internet.password(),8)
async function main() {
  console.log('Clearing existing data...');
  // Delete in order to avoid foreign key constraints
  await prisma.journalRecord.deleteMany();
  await prisma.entryModel.deleteMany();
  await prisma.asset.deleteMany();
  await prisma.user.deleteMany();
  
  console.log('Seeding assets...');
  const assets = ['BTC/USD', 'ETH/USD', 'EUR/USD', 'GBP/USD', 'XAU/USD', 'NAS100', 'US30'];
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
          // Just test no hashed.
          hashPassword: faker.internet.password(), 
          startFund: parseFloat(faker.finance.amount({ min: 1000, max: 100000 })),
          yourModel: faker.lorem.word(),
          addFund: parseFloat(faker.finance.amount({ min: 0, max: 10000 })),
        },
      })
    )
  );

  console.log('Seeding entry models and journals...');
  const tiers: SetUpTier[] = ['A', 'B', 'C', 'D', 'E', 'F'];
  const winLose: WinLoseType[] = ['WIN', 'LOSE'];

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

    // Create 10 journal records per user
    for (let i = 0; i < 10; i++) {
      const asset = faker.helpers.arrayElement(createdAssets);
      const entryModel = faker.helpers.arrayElement(entryModels);
      const entryPrice = parseFloat(faker.finance.amount({ min: 1, max: 50000 }));
      const isWin = faker.helpers.arrayElement(winLose);
      
      await prisma.journalRecord.create({
        data: {
          userId: user.userId,
          assetId: asset.assetId,
          entryModelId: entryModel.id,
          setUpTier: faker.helpers.arrayElement(tiers),
          entryDateTime: faker.date.past(),
          exitDateTime: faker.date.recent(),
          entryPrice: entryPrice,
          SL: entryPrice * 0.99,
          TP: entryPrice * 1.05,
          advantage: faker.lorem.sentence(),
          disadvantage: faker.lorem.sentence(),
          notes: faker.lorem.paragraph(),
          feedback: faker.lorem.sentence(),
          imageUrl: faker.image.url(),
          winLose: isWin,
          profit: isWin === 'WIN' ? parseFloat(faker.finance.amount({ min: 10, max: 1000 })) : -parseFloat(faker.finance.amount({ min: 10, max: 500 })),
          currentBalance: parseFloat(faker.finance.amount({ min: 1000, max: 110000 })),
          duration: faker.number.int({ min: 1, max: 1440 }), // duration in minutes
        },
      });
    }
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
