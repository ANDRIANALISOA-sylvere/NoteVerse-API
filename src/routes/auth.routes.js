import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";

const Authrouter = Router();

Authrouter.post("/register", register);
Authrouter.post("/login", login);

export default Authrouter;
