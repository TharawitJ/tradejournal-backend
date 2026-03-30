import { prisma } from "../libs/prisma";

export async function getModelByUserId(field: any, value: any) {
  return await prisma.entryModel.findMany({
    where: { [field]: value },
  });
}
export async function createNewModel(data: any) {

    return await prisma.entryModel.create({
      data: {
        name: data.name,
        userId: data.userId,
      },
    });

}

export async function deleteModelById(modelId:number){
      try {
    return await prisma.entryModel.delete({
      where: {
        id: modelId
      },
    });
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("No Model");
    }
    throw err;
  }
}
