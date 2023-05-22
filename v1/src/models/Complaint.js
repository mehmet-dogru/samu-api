const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    complaintText: {
      type: String,
      required: true,
      min: 2,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    to: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
    visibility: {
      type: String,
      enum: ["Public", "Private", "AdminOnly"],
      default: "Public",
    },
  },
  { timestamps: true, versionKey: false }
);

const Complaint = mongoose.model("Complaint", ComplaintSchema);

module.exports = Complaint;
