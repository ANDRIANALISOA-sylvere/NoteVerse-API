const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("API de gestion des notes fonctionne");
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
