import { NextFunction, Request, Response } from "express";

const enableCORS = function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "DELETE, POST, GET, OPTIONS, PUT, HEAD"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
};

export default enableCORS;
