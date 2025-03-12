const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRouter");
const categoryRouter = require("./routes/categoryRouter");
const dbConnect = require("./db/db");

require("dotenv").config();
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials : true
  })
);
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("app is running");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/category", categoryRouter);
app.listen(process.env.PORT, () => {
  console.log("sever is running at port 3000");
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  const error_code = err.code || "Error_Code";
  res.status(status).json({ error: error_code, message: message , status : status });
});
