const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

// helper: start of day
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
};

// =========================
// GET toate task-urile userului
// =========================
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Eroare la citirea task-urilor" });
  }
});

// =========================
// CREATE task
// =========================
router.post("/", protect, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Titlul este obligatoriu" });
    }

    // VALIDARE deadline în trecut
    if (dueDate) {
      const picked = startOfDay(dueDate);
      const today = startOfDay(new Date());

      if (picked < today) {
        return res.status(400).json({
          message: "Nu poți crea un task cu deadline în trecut",
        });
      }
    }

    const task = await Task.create({
      owner: req.user._id,
      title: title.trim(),
      description: description || "",
      dueDate: dueDate || null,
      status: "todo",
      completedAt: null,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Eroare la creare task" });
  }
});

// =========================
// UPDATE task
// =========================
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task inexistent" });
    }

    const { title, description, status, dueDate } = req.body;

    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description;

    // VALIDARE deadline
    if (dueDate !== undefined) {
      if (dueDate) {
        const picked = startOfDay(dueDate);
        const today = startOfDay(new Date());

        if (picked < today && task.status !== "done") {
          return res.status(400).json({
            message: "Deadline-ul nu poate fi în trecut",
          });
        }
        task.dueDate = dueDate;
      } else {
        task.dueDate = null;
      }
    }

    // LOGICĂ status + completedAt
    if (status) {
      task.status = status;

      if (status === "done") {
        task.completedAt = new Date();
      } else {
        task.completedAt = null;
      }
    }

    await task.save();
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Eroare la actualizare task" });
  }
});

// =========================
// DELETE task
// =========================
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task inexistent" });
    }

    res.json({ message: "Task șters" });
  } catch (err) {
    res.status(500).json({ message: "Eroare la ștergere task" });
  }
});

module.exports = router;
