import { Router } from "express";
import {
  getAllLists,
  createList,
  updateList,
  deleteList,
} from "../controllers/lists-controller";
import validateList from "../middlewares/validate.list";

const listRouter = Router();

listRouter.route("/").get(getAllLists).post(validateList, createList);
listRouter.route("/:id").put(validateList, updateList).delete(deleteList);

export default listRouter;
