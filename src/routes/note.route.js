import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createNote,
  deleteNote,
  getNotesByUser,
  updateNote,
} from "../controllers/note.controller.js";

const NoteRouter = Router();

NoteRouter.get("/", authMiddleware, getNotesByUser);
NoteRouter.post("/", authMiddleware, createNote);
NoteRouter.put("/:id", authMiddleware, updateNote);
NoteRouter.delete("/:id", authMiddleware, deleteNote);

export default NoteRouter;
