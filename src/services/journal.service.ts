import { prisma } from "../libs/prisma";
import { SetUpTier } from "@prisma/client";

export const getSetUpTier = () => {
  const setUpTier = (Object.values(SetUpTier));
  return setUpTier
};


export async function getJournalById(field:string,id: number) {
  const data = await prisma.journalRecord.findMany({
    where: { [field]: id },
  });
  return data;
}

// write userId at frontend
export async function createJournal(data: any) {
  return await prisma.journalRecord.create({ data: data });
}

export async function editRecord(recordId: number, data: any) {
  const updatedRecord = await prisma.journalRecord.update({
    where: { recordId: recordId },
    data: data,
  });
  return updatedRecord;
}

export async function deleteRecord(recordId: number) {
  const deletedRecord = await prisma.journalRecord.delete({
    where: { recordId: recordId },
  });
  return deletedRecord;
}
