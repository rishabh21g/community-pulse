import express from "express";
import { configDotenv } from "dotenv";

const app = express();
configDotenv()
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
