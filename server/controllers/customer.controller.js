
const Customer =  require("../model/Customer.js");
const Lead = require("../model/Lead.js") 

// Create Customer
 const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Customers (role-based)
 const getCustomers = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === "SalesRep") {
      query = { createdBy: req.user._id };
    }
    const customers = await Customer.find(query).populate("createdBy", "name email role");
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Customer
 const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate("createdBy", "name email");
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Customer
 const updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(customer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Customer (Admin only)
 const deleteCustomer = async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id);
    res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer};