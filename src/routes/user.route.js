import { Router } from "express";
import { getCurrentUser } from "../controllers/user.conroller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const UseRouter = Router();

UseRouter.get("/me", authMiddleware, getCurrentUser);

export default UseRouter;
