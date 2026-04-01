import { prisma } from "../libs/prisma";

export async function getFundByUserId(field: any, value: any) {
  return await prisma.fundHistory.findMany({
    where: { [field]: value },
  });
}
