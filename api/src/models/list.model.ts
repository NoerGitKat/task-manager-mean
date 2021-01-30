import { Schema, model } from "mongoose";

const listSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
});

const List = model("List", listSchema);

export default List;
