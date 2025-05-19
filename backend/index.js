import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoute from "./routes/user.route.js";
import eventRoute from "./routes/event.route.js";
import intrestRoute from "./routes/intrest.route.js";

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
app.use("/api/users", userRoute);
app.use("/api/events", eventRoute);
app.use("/api/intrests", intrestRoute);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
