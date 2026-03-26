import express, { RequestHandler } from "express";
import {
  getJournalById,
  createJournal,
  editRecord,deleteRecord
} from "../services/journal.service";

export const getUserJournal: RequestHandler = async (req, res, next) => {
  const userId = req.user?.userId;
  const journalFound = await getJournalById(userId!);
  if (!journalFound) {
    return res.json({ message: "No Journal recorded" });
  }
  res.json({ journalFound });
};

export const recordTheJournal: RequestHandler = async (req, res, next) => {
  createJournal(req.body);
  res.json({ message: "Record Successfully", "Record Detail": req.body });
};

export const editTheJournal: RequestHandler = async (req, res, next) => {
  const {recordId} = req.params;
  const editedRecord = await editRecord(Number(recordId), req.body);
  res.json({message:"Update Successfully","Updated Detail":editedRecord})
};


export const deleteTheJournal: RequestHandler = async (req, res, next) => {
  const {recordId} = req.params;
  const deletedRecord = await deleteRecord(Number(recordId));
  res.json({"Deleted record number":deletedRecord.recordId})
};
