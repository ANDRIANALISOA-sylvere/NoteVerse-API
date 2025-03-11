import express, { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { sendEmail } from "../controllers/email.controller.js";

const EmailRouter = Router();

EmailRouter.post("/send", authMiddleware, sendEmail);

export default EmailRouter;
