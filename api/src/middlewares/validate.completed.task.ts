import { check } from "express-validator";

const validateCompletedTask = [
  check("completed").isBoolean().withMessage("The value should be a Boolean."),
];

export default validateCompletedTask;
