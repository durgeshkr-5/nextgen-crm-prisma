const  mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Won", "Lost"],
      default: "New",
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    notes: {
      type: String,
      maxlength: 500,
    },
  },
  { timestamps: true }
);

const Lead = mongoose.model("Lead", leadSchema);

module.exports = Lead;
