import { prisma } from "../libs/prisma.js";

export async function getUserBy(field:any, value:any) {
  return await prisma.user.findFirst({
    where: { [field]: value },
  });
}
export async function createUser(data:any){
    return await prisma.user.create({data:data})
}