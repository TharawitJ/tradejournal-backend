import express, { RequestHandler } from "express";
import {
  getJournalById,
  createJournal,
  editRecord,
  deleteRecord,
  getSetUpTier,
} from "../services/journal.service";
import createHttpError from "http-errors";

export const getUserJournal: RequestHandler = async (req, res, next) => {
  const id = req.user?.userId; // cosnt {userId = req.user}
  const field = "userId";
  const setUpTier = getSetUpTier();
  const journalFound = await getJournalById(field, id!);
  if (!journalFound) {
    return res.json({ message: "No Journal recorded" });
  }
  res.json({ journalFound, setUpTier });
};

export const recordTheJournal: RequestHandler = async (req, res, next) => {
  try {
    console.log(req.body)
  const id = req.user?.userId; // cosnt {userId = req.user}
    const addUserId = {...req.body,userId:id}
    await createJournal(addUserId);
    res.json({ message: "Record Successfully", "Record Detail": addUserId });
  } catch (err) {
    // 1. Pass the error to the next middleware (standard Express practice) next(err)
    // 2. OR send a response immediately:
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "An unknown error occurred",
    });
  }
};

export const editTheJournal: RequestHandler = async (req, res, next) => {
  const id = req.user!.userId;
  const { recordId } = req.params;
  const field = "recordId";
  const journalFound = await getJournalById(field, Number(recordId!));
  if (!journalFound || journalFound.length === 0) {
    res.json({ message: "No record" });
  }
  if (journalFound[0].userId !== id) {
    res.json({ message: "This is not your record" });
  } else {
    const editedRecord = await editRecord(Number(recordId), req.body);
    res.json({
      message: "Update Successfully",
      "Updated Detail": editedRecord,
    });
  }
};

export const deleteTheJournal: RequestHandler = async (req, res, next) => {
  const { recordId } = req.params;
  const deletedRecord = await deleteRecord(Number(recordId));
  res.json({ "Deleted record number": deletedRecord.recordId });
};
