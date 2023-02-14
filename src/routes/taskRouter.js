import Express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
} from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/requireLogin.js";

const taskRouter = Express.Router();

taskRouter.get("/getall", verifyToken, getAllTasks);
taskRouter.post("/create", verifyToken, createTask);
taskRouter.delete("/delete", verifyToken, deleteTask);

export default taskRouter;
