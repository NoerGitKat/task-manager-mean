import { check } from "express-validator";

const validateList = [
  check("title").isString().withMessage("The list should have a title!"),
];

export default validateList;
