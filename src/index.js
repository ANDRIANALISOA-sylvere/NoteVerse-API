import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";
import Authrouter from "./routes/auth.routes.js";
config();
const app = express();

app.use(cors());
app.use(json());

const port = process.env.PORT || 8000;

app.use("/api/auth", Authrouter);
app.get("/", (req, res) => {
  res.send("API de gestion des notes fonctionne");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
