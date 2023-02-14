import Express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserData,
  loginUser,
  registerUser,
  updateUserData,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/requireLogin.js";

const adminRouter = Express.Router();

adminRouter.post("/register", registerUser);
adminRouter.post("/loginuser", loginUser);
adminRouter.get("/profile/:id", verifyToken, getUserData);
adminRouter.put("/profile/update/:id", verifyToken, updateUserData);
adminRouter.get("/getall", verifyToken, getAllUsers);
adminRouter.delete("/delete", verifyToken, deleteUser);

export default adminRouter;
