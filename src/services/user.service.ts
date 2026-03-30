import { prisma } from "../libs/prisma.js";

export async function getUserBy(field: any, value: any) {
  return await prisma.user.findFirst({
    where: { [field]: value },
  });
}
export async function createUser(data: any) {
  return await prisma.user.create({ data: data });
}

export async function updateUser(userId: number, data: any) {
  const updatedUser = await prisma.user.update({
    where: { userId: userId },
    data: {
      ...(data.username && { username: data.username }),
      ...(data.email && { email: data.email }),
    },
  });
  return updatedUser;
}

export async function deleteUser(userId: number) {
  return prisma.$transaction([
    prisma.journalRecord.deleteMany({
      where: { userId: userId },
    }),
    prisma.fundHistory.deleteMany({
      where: { userId: userId },
    }),
    prisma.entryModel.deleteMany({
      where: { userId: userId },
    }),
    prisma.user.delete({
      where: { userId: userId },
    }),
  ]);
}
