import { json, Request, Response } from "express";
import { validationResult } from "express-validator";
import { List, Task } from "../models";

const getAllLists = async (req: Request, res: Response) => {
  try {
    const lists = await List.find();
    return res.status(200).json(lists);
  } catch (error) {
    return res.status(404).json({ msg: "No lists found." });
  }
};

const createList = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { title } = req.body;

  const newList = new List({
    title,
  });
  try {
    await newList.save();
    return res.status(201).json(newList);
  } catch (error) {
    return res.status(500).json({ msg: "Could not create list." });
  }
};

const updateList = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { listId } = req.params;

  try {
    await List.findOneAndUpdate({ _id: listId }, { $set: req.body });
    return res.status(204).json({ msg: "List is updated!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not update list." });
  }
};

const deleteList = async (req: Request, res: Response) => {
  const { listId } = req.params;

  try {
    await List.findOneAndDelete({ _id: listId });
    return res.status(204).json({ msg: "List has successfully been deleted!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not delete list." });
  }
};

const getAllTasks = async (req: Request, res: Response) => {
  const { listId } = req.params;
  try {
    const tasks = await Task.find({ _listId: listId });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(404).json({ msg: "Tasks not found." });
  }
};

const createTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { title } = req.body;
  const { listId } = req.params;

  try {
    const newTask = new Task({
      title,
      _listId: listId,
    });
    await newTask.save();
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json({ msg: "Could not make task." });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json(errors);
  }

  const { listId, taskId } = req.params;
  try {
    await Task.findOneAndUpdate(
      { _listId: listId, _id: taskId },
      { $set: req.body }
    );
    return res.status(200).json({ msg: "Task has successfully been updated!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not update task." });
  }
};

const deleteTask = async (req: Request, res: Response) => {
  const { listId, taskId } = req.params;
  try {
    await Task.findOneAndDelete({ _id: taskId, _listId: listId });
    return res.status(204).json({ msg: "Task has successfully been deleted!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not delete task." });
  }
};

export {
  getAllLists,
  createList,
  updateList,
  deleteList,
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
