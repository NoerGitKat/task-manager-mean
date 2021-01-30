import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  _listId: {
    type: Types.ObjectId, // Make relational with List
    ref: "List",
    required: true,
  },
});

const Task = model("Task", taskSchema);

export default Task;
