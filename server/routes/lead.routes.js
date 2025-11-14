
const  express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/authorizeRoles.js")
const {
  createLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
  updateLeadStatus,
} = require("../controllers/lead.controller.js");

const leadRouter = express.Router();

leadRouter.post("/", authMiddleware, authorizeRoles("Admin", "Manager", "SalesRep"), createLead);
leadRouter.get("/", authMiddleware, getLeads);
leadRouter.get("/:id", authMiddleware, getLeadById);
leadRouter.put("/:id", authMiddleware, authorizeRoles("Admin", "Manager"), updateLead);
leadRouter.patch("/:id/status", authMiddleware, authorizeRoles("Admin", "Manager", "SalesRep"), updateLeadStatus);
leadRouter.delete("/:id", authMiddleware, authorizeRoles("Admin"), deleteLead);

module.exports = leadRouter;
