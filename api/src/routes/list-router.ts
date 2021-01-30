import { Router } from "express";
import {
  getAllLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/lists-controller";

const listRouter = Router();

listRouter.route("/").get(getAllLists).post(createList);
listRouter.route("/:id").put(updateList).delete(deleteList);

export default listRouter;
