import { Router } from "express";
import { getAllUsers, getCurrentUser } from "../controllers/user.conroller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const UseRouter = Router();

UseRouter.get("/me", authMiddleware, getCurrentUser);
UseRouter.get("/", authMiddleware, getAllUsers);

export default UseRouter;
