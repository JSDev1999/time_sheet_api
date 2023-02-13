import Express from "express";
import adminRouter from "./adminRouter.js";

const appRouter = Express.Router();

appRouter.use("/admin", adminRouter);

export default appRouter;
