
const Task = require("../model/Task");

 const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const getTasks = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "SalesRep") filter.assignedTo = req.user._id;
    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("relatedCustomer relatedLead", "name title");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// getTaskbyId
 const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id) 
      .populate("assignedTo", "name email")
      .populate("relatedCustomer relatedLead", "name title");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




 const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createTask, getTasks,getTaskById, updateTask, deleteTask};