import { ZodError,z } from "zod";
import type { ErrorRequestHandler } from "express";

export const errorMiddleWare: ErrorRequestHandler = (err, req, res, next) => {
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token Expired",
      message: "Your session has expired. Please log in again.",
    });
  }
    if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid Token",
      message: "The provided token is invalid or malformed.",
    });
  }
  if (err instanceof ZodError) {
    const errors = z.treeifyError(err);
    return res.status(400).json({
      success: false,
      errors,
      // errors: err.issues.map(err => err.message)
    });
  }
  console.error(err);
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    message: err.message,
  });
}

//   return res.status(400).json({
//     success: false,
//     errors: errors,});
// RESULT
// {email: {_errors: ["Invalid email"]}}