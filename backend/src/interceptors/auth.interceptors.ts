import { NextFunction, Request, Response, Router } from "express";
require("dotenv").config();

export const checkAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.headers.username;
  const password = req.headers.password;
  if (
    username === process.env.AUTH_USERNAME &&
    password === process.env.AUTH_PASSWORD
  ) {
    next();
  } else res.status(401).json("User not authorized");
};
