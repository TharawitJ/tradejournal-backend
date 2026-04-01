import type { RequestHandler, Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createHttpError from "http-errors";
import { loginSchema, registerSchema } from "../validations/user.schema";
import { createUser, getUserBy } from "../services/user.service";

//only done for test password need to be hash bcrypt

export const register: RequestHandler = async (req, res, next) => {
  // parseAsync --> key function in Zod and Valibot
  const data = await registerSchema.parseAsync(req.body);
  // check identity is email and username
  // find user duplicate
  const foundUserbyEmail = await getUserBy("email", data.email);
  const foundUserbyUsername = await getUserBy("username", data.username);
  if (foundUserbyEmail || foundUserbyUsername) {
    return next(createHttpError[409]("This user already register"));
  }
  // create new user
  console.log(data.password);
  const userHashPW = {
    username: data.username,
    email: data.email,
    hashPassword: data.password,
  };
  const newUser = await createUser(userHashPW);

  //   if error data.identity has been strip by zod
  const userData = {
    id: newUser.userId,
    email: data.email,
    username: newUser.username,
  };
  res.json({ message: "Register Succussful", user: userData });
};

export const login: RequestHandler = async (req, res, next) => {
  const data = loginSchema.parse(req.body);
  const identityKey = data.email ? "email" : "username";
  // find login user
  const foundUser = await getUserBy(
    identityKey,
    data[identityKey as keyof typeof data],
  );
  if (!foundUser) {
    return next(createHttpError[401]("Invalid user login 1"));
  }
  // check password
  console.log(data.password)
  console.log(foundUser.hashPassword)
  let pwCheck = await bcrypt.compare(data.password, foundUser.hashPassword);
  console.log(pwCheck)
  if (!pwCheck) {
    return next(createHttpError[401]("Invalid user login 2"));
  }

  // create token
  const payload = { id: foundUser.userId };
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "1d",
  });

  const { hashPassword, ...userData } = foundUser;
  res.json({
    message: "Login Done",
    token: token,
    user: userData,
  });
};
