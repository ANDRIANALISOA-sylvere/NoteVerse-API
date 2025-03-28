import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import Authrouter from "./routes/auth.route.js";
import UseRouter from "./routes/user.route.js";
import CategoryRouter from "./routes/category.route.js";
import NoteRouter from "./routes/note.route.js";
import EmailRouter from "./routes/email.route.js";
config();
const app = express();

app.use(cors());
app.use(json());

const port = process.env.PORT || 8000;

app.use("/api/auth", Authrouter);
app.use("/api/user", UseRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/notes", NoteRouter);
app.use("/api/email", EmailRouter);

app.get("/", (req, res) => {
  res.send("Welcome to NoteVerse API");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
