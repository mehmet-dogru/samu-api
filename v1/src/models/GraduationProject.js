const mongoose = require("mongoose");

const GraduationProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: false,
      min: 5,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    supervisor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: false, versionKey: false }
);

const GraduationProject = mongoose.model("GraduationProject", GraduationProjectSchema);

module.exports = GraduationProject;
