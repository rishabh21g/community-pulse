import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";

const app = express();
configDotenv();
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const PORT = process.env.PORT || 8000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
