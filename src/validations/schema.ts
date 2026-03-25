import { z } from "zod";
import bcrypt from "bcrypt";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-z0-9_^]{3,20}$/;

const identityKey = (val: any) => (emailRegex.test(val) ? "email" : "username");

export const registerSchema = z
  .object({
    identity: z
      .string()
      .min(2, "Must have more than 2 characters")
      .refine(
        (val: any) => emailRegex.test(val) || usernameRegex.test(val),
        "Email and mobile are require",
      ),
    username: z.string().min(2, "Username is require"),
    password: z.string().min(4, "Password must have more than 4 characters"),
    passwordConfirm: z.string().min(1, "Confirm password"),
  })
  .refine(
    (input) =>
      input.password ===
      input.passwordConfirm /* refine check password === confirm password */,
    {
      message: "Password must be match with confirm password",
      path: ["passwordConfirm"],
    },
  )
  .transform(async (data) => ({
    [identityKey(data.identity)]: data.identity,
    password: await bcrypt.hash(data.password, 8),
    username: data.username,
  }));

export const loginSchema = z
  .object({
    identity: z
      .string()
      .min(2, "Email or mobile are require to login")
      .refine((val: any) => emailRegex.test(val) || usernameRegex.test(val), {
        message: "Invalid email or mobile",
      }),
    password: z.string().min(4, "Password must be at least 4 characters"),
  })
  .transform((data) => ({
    [identityKey(data.identity)]: data.identity,
    password: data.password,
  }));