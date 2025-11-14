
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware.js");
const authorizeRoles = require("../middlewares/authorizeRoles")
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller.js");

const taskRouter = express.Router();

taskRouter.post("/", authMiddleware, authorizeRoles("Admin", "Manager"), createTask);
taskRouter.get("/", authMiddleware, getTasks);
taskRouter.get("/:id", authMiddleware, getTaskById);
taskRouter.put("/:id", authMiddleware, authorizeRoles("Admin", "Manager", "SalesRep"), updateTask);
taskRouter.delete("/:id", authMiddleware, authorizeRoles("Admin", "Manager"), deleteTask);

module.exports =  taskRouter;
