require("dotenv").config();

import express, { Request, Response } from "express";
import enableCORS from "./middlewares/enableCORS";
import connectDB from "./models/mongoose";
import listRouter from "./routes/list-router";

const app = express();
const PORT = 3000 || process.env.PORT;

// Middlewares
app.use(express.json());
app.use(enableCORS);

app.use("/api/lists", listRouter);

app.use("*", (req: Request, res: Response) =>
  res.status(500).send("Route not found.")
);

app.listen(PORT, async () => {
  await connectDB();
  return console.log(`The server is listening on ${PORT}!`);
});
