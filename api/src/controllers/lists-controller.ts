import { Request, Response } from "express";

const getAllLists = (req: Request, res: Response) => {
  // Get and send all lists
  res.send("list is now found right? it is found!");
};

const createList = (req: Request, res: Response) => {
  // Create new list
};

const updateList = (req: Request, res: Response) => {
  const { id } = req.params;
  // Update list
};

const deleteList = (req: Request, res: Response) => {
  const { id } = req.params;
  // Update list
};

export { getAllLists, createList, updateList, deleteList };
