

const  Lead = require("../model/Lead");

 const createLead = async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      assignedTo: req.user._id, // auto-assign to creator if not assigned
    });
    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const getLeads = async (req, res) => {
  try {
    let filter = {};
    if (req.user.role === "SalesRep") filter.assignedTo = req.user._id;
    const leads = await Lead.find(filter)
      .populate("customer", "name email")
      .populate("assignedTo", "name email role");
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get lead by ID
 const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("customer", "name email")
      .populate("assignedTo", "name email role");
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update lead details except status
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });

    // Update all fields except status
    Object.keys(req.body).forEach((key) => {
      if (key !== "status") {
        lead[key] = req.body[key];
      }
    });

    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



 const updateLeadStatus = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found" });
    lead.status = req.body.status;
    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const assignLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    lead.assignedTo = req.body.userId;
    await lead.save();
    res.json({ message: "Lead assigned successfully", lead });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

 const deleteLead = async (req, res) => {
  try {
    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: "Lead deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {createLead, getLeads, getLeadById, updateLead, updateLeadStatus, assignLead, deleteLead};