const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const cors = require("cors");

const connectDB = require("./DB/db");
const app = express();
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

const PORT = 3000;

// router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello Wordl");
// });
app.get("*", (req, res) => {
  res.status(404).send("<h1>404 Not found</h1>");
});

app.listen(PORT, async () => {
  console.log(`server is running at http://localhost:${PORT}`);
  await connectDB();
});
