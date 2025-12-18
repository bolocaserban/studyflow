const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["todo", "inprogress", "done"], default: "todo" },
    dueDate: { type: Date, default: null },
    completedAt: { type: Date, default: null },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
