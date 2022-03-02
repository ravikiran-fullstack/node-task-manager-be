const TaskModel = require("../models/task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).json({ tasks });
});

const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // console.log(taskID);
    let task = await TaskModel.find({ _id: taskID });
    console.log("task", task);
    // task = null;
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
  // res.json({ id: req.params.id });
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await TaskModel.findByIdAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).json({ message: `No task with id: ${taskID}` });
    }

    // res.status(200).json({ task });
    res.status(200).json({ task: null, status: "success" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    // const data = req.body;
    const task = await TaskModel.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ id: taskID, task });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
