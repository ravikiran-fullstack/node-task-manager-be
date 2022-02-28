const express = require("express");

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

const tasksRouter = express.Router();

tasksRouter.route("/").get(getAllTasks).post(createTask);
tasksRouter.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = tasksRouter;
