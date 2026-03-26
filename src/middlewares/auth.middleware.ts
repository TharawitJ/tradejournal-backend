import "dotenv/config";
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { prisma } from '../libs/prisma'
import type { RequestHandler } from "express";

export const authenticate:RequestHandler= async (req, res, next)=> {
  const authorization = req.headers.authorization

  if(!authorization || !authorization.startsWith('Bearer ')) {
    return next(createHttpError[401]('Unauthorized 1'))
  }
  // split token
  // const token = authorization.split(' ')[1]
  const [, token] = authorization.split(' ')

  // token condition
  if(!token) {
    return next(createHttpError[401]('Unauthorized 2'))
  }
  // verify token
  const payload = jwt.verify(token, process.env.JWT_SECRET!)

  // get id in payload for find user
  const foundUser = await prisma.user.findUnique({
    where : { userId : payload.id}
  })
  if(!foundUser) {
    return next(createHttpError[401]('Unauthorized 3'))
  }

  // get password out
  const {hashPassword, ...userInfo} = foundUser

  // binding userInfo with req 

  req.user = userInfo
  next()
}