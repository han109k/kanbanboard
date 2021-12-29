const express = require("express");
const router = express.Router();

// Controlller : tasks
const tasks = require("../controllers/tasks")

router
  .route("/:id/tasks")
  .patch(tasks.updateTask)
  .put(tasks.updateTasks)

module.exports = router;
