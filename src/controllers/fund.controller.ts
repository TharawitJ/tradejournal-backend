import type { RequestHandler } from "express";
import express from "express";
import {
  getFundByUserId
} from "../services/fundhistory.service";

export const getUserFundHistory: RequestHandler = async (req, res, next) => {
  const userId = req.user?.userId;
  const field = "userId";
  const userFund = await getFundByUserId(field, userId);
  console.log(userFund);
  if (!userFund) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ userFund });
};