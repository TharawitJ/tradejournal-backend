import { prisma } from "../libs/prisma";

export async function getJournalById(id: number) {
  const data = await prisma.journalRecord.findMany({
    where: { userId: id },
  });
  return data.map((item) => item.recordId);
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
