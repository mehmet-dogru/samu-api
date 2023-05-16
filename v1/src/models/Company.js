const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Company = mongoose.model("Company", CompanySchema);

module.exports = Company;
