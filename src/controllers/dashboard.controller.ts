import express, { RequestHandler } from "express";
import { getJournalById } from "../services/journal.service";
import {
  calAverageRR,
  calWinRate,
  calculatePnL,
} from "../services/dashboard.service";

export const getPnL: RequestHandler = async (req, res, next) => {
  const field = "userId";
  const userId = req.user?.userId;
  const journalFound = await getJournalById(field, userId!);

  if (!journalFound.length) {
    return res.json({ message: "No journal record yet" });
  }
  const result = await calculatePnL(journalFound);

  res.json({ result });
};

export const getWinRate: RequestHandler = async (req, res, next) => {
  const field = "userId";
  const userId = req.user?.userId;
  const journalFound = await getJournalById(field,userId!);

  if (!journalFound) {
    return res.json({ message: "No journal record yet" });
  }
  const winrate = await calWinRate(journalFound);
  res.json({ winrate: winrate });
};

export const getAverageRR: RequestHandler = async (req, res, next) => {
  const field = "userId";
  const userId = req.user?.userId;
  const journalFound = await getJournalById(field,userId!);
  const resultRR = await calAverageRR(journalFound);
  res.json({ AverageRR: resultRR });
};
