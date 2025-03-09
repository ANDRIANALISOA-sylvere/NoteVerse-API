import express, { Router } from "express";
import {
  createCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const CategoryRouter = Router();

CategoryRouter.post("", authMiddleware, createCategory);
CategoryRouter.put("/:id", authMiddleware, updateCategory);

export default CategoryRouter;
