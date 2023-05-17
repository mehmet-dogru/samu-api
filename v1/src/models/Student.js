const mongoose = require("mongoose");
const ROLES = require("../references/role.reference");

const StudentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      enum: ["1", "2", "3", "4"],
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
