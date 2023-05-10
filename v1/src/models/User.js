const mongoose = require("mongoose");
const logger = require("../scripts/logger/Users");
const ROLES = require("../references/role.reference");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      min: 6,
      max: 255,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
    },
    profileImage: {
      type: String,
      trim: true,
      default: "default.png",
    },
    role: { type: [ROLES], default: ROLES.STUDENT },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
