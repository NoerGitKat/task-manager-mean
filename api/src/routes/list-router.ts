import { Router } from "express";
import {
  getAllLists,
  createList,
  updateList,
  deleteList,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/lists-controller";
import validateList from "../middlewares/validate.list";
import validateTask from "../middlewares/validate.task";

const listRouter = Router();

listRouter.route("/").get(getAllLists).post(validateList, createList);
listRouter.route("/:listId").put(validateList, updateList).delete(deleteList);
listRouter
  .route("/:listId/tasks")
  .get(getAllTasks)
  .post(validateTask, createTask);
listRouter
  .route("/:listId/tasks/:taskId")
  .put(validateTask, updateTask)
  .delete(deleteTask);

export default listRouter;
