import type { RequestHandler } from "express";
import express from "express";
import {
  getModelByUserId,
  createNewModel,
  deleteModelById,
} from "../services/entrymodel.service";

export const getUserModel: RequestHandler = async (req, res, next) => {
  const userId = req.user?.userId;
  const field = "userId";
  const userModel = await getModelByUserId(field, userId);
  console.log(userModel);
  if (!userModel) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ userModel });
};
export const addNewModel: RequestHandler = async (req, res, next) => {
  try {
    const newModel = await createNewModel(req.body);
    res.json({ newModel });
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("Model name already exists for this user");
    }
    throw err;
  }
};

export const deleteModel:RequestHandler = async(req,res,next)=>{
    try {
    const newModel = await deleteModelById(Number(req.params.id));
    res.json({ newModel });
  } catch (err: any) {
    if (err.code === "P2002") {
      throw new Error("Model name already exists for this user");
    }
    throw err;
  }
}