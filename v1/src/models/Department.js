const mongoose = require("mongoose");

const DepartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      min: 3,
      max: 100,
    },
  },
  { timestamps: true, versionKey: false }
);

const Department = mongoose.model("Department", DepartmentSchema);

module.exports = Department;
