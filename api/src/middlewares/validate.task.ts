import { check } from "express-validator";

const validateTask = [
  check("title").isString().withMessage("The task should have a title!"),
];

export default validateTask;
