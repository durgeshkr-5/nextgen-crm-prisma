const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles");

const {createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer} = require("../controllers/customer.controller")




const customerRouter = express.Router();


// Admin, Manager, and SalesRep can create and view
customerRouter.post("/", authMiddleware, authorizeRoles("Admin", "Manager", "SalesRep"), createCustomer);
customerRouter.get("/", authMiddleware, getCustomers);

// Only Admin and Manager can update or delete
customerRouter.put("/:id", authMiddleware, authorizeRoles("Admin", "Manager"), updateCustomer);
customerRouter.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteCustomer);


module.exports = customerRouter;