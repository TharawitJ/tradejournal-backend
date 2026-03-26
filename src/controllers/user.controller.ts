import type { RequestHandler } from "express";
import express from "express"
import { getUserBy,updateUser,deleteUser } from "../services/user.service";

export const getMe: RequestHandler = async (req, res, next) => {
  const userId = req.user?.userId
  const userFound = getUserBy("userId",userId)
        if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  res.json({message:"Profile", user:req.user});
};

export const patchMe: RequestHandler = async (req, res, next) => {
  const userId = req.user?.userId
  const userFound = getUserBy("userId",userId)
      if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const updatedUser = await updateUser(userId,req.body)
  res.json({message: "Update successfully"});
};

export const deleteMe: RequestHandler = async (req, res, next) => { 
  const userId = req.user?.userId
    const userFound = getUserBy("userId",userId)
      if (!userFound) {
      return res.status(401).json({ message: "Unauthorized" });
    } await deleteUser(userId)
  console.log("in get me page", req.user);
  res.json({message:`Delete successfully ${req.user?.username} got deleted`});
};