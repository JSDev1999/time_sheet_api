import Express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getReports,
  updateTask,
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/requireLogin.js";

const taskRouter = Express.Router();

taskRouter.get("/getall", verifyToken, getAllTasks);
taskRouter.get("/getreports", verifyToken, getReports);
taskRouter.post("/create", verifyToken, createTask);
taskRouter.put("/update", verifyToken, updateTask);
taskRouter.delete("/delete", verifyToken, deleteTask);

export default taskRouter;
