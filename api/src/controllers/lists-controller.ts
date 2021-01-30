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

  const { id } = req.params;

  try {
    await List.findOneAndUpdate({ _id: id }, { $set: req.body });
    return res.status(204).json({ msg: "List is updated!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not update list." });
  }
};

const deleteList = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await List.findOneAndDelete({ _id: id });
    return res.status(204).json({ msg: "List has successfully been deleted!" });
  } catch (error) {
    return res.status(500).json({ msg: "Could not delete list." });
  }
};

export { getAllLists, createList, updateList, deleteList };
