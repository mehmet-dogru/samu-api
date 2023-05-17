const mongoose = require("mongoose");
const ROLES = require("../references/role.reference");

const GraduatedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
    },
    department: {
      type: String,
      required: true,
    },
    workedAt: {
      type: String,
      required: false,
      default: "Henüz yok",
      min: 2,
      max: 20,
    },
    startingDateOfEmployment: {
      type: Date,
      required: false,
      default: null, //Eğer null ise görüntülenmeyecektir.
    },
    endingDateOfEmployment: {
      type: Date,
      required: false,
      default: null, //Eğer null ise "Halen" yazdırılacaktır.
    },
  },
  { timestamps: true, versionKey: false }
);

const Graduated = mongoose.model("Graduated", GraduatedSchema);

module.exports = Graduated;
