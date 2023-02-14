import Express from "express";
import adminRouter from "./adminRouter.js";
import taskRouter from "./taskRouter.js";

const appRouter = Express.Router();

appRouter.use("/admin", adminRouter);
appRouter.use("/tasks", taskRouter);

export default appRouter;
