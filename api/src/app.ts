require("dotenv").config();

import express, { Request, Response } from "express";
import connectDB from "./models/mongoose";
import listRouter from "./routes/list-router";

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.json());

app.use("/api/lists", listRouter);

app.use("*", (req: Request, res: Response) =>
  res.status(500).send("route not found")
);

app.listen(PORT, async () => {
  await connectDB();
  return console.log(`The server is listening on ${PORT}!`);
});
