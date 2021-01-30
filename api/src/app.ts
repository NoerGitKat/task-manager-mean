import express, { Request, Response } from "express";
import listRouter from "./routes/list-router";

const app = express();
const port = 3000;

app.use("/lists", listRouter);

app.use("*", (req: Request, res: Response) =>
  res.status(500).send("route not found")
);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
