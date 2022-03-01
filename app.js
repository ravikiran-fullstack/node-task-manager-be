const express = require("express");
const app = express();
const tasksRouter = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();

// middleware
app.use(express.static("./public"));
app.use(express.json());

//routes
// app.get("/hello", (req, res) => {
//   res.send("Task Manager App");
// });

app.use("/api/v1/tasks", tasksRouter);

const PORT = 3200;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, console.log(`Server is listening on ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
