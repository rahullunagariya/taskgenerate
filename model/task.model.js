const mongoose = require("mongoose");

const task = new mongoose.Schema(
  {
    taskTitle: { type: String, required: "Title is Required!" },
    taskDesc: { type: String, required: "Description is Required!" },
    taskDate: { type: String },
    taskPri: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("task", task);
