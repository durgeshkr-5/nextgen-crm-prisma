const mongoose =  require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    entityType: {
      type: String,
      enum: ["Customer", "Lead", "Task"],
      required: true,
    },
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    details: {
      type: Object,
    },
  },
  { timestamps: true }
);

const Activity =  mongoose.model("Activity", activitySchema);
module.exports = Activity;
