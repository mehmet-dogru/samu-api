const mongoose = require("mongoose");
const ROLES = require("../references/role.reference");

const GraduatedSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
    role: { type: [ROLES], default: ROLES.GRADUATED },
  },
  { timestamps: true, versionKey: false }
);

const Graduated = mongoose.model("Graduated", GraduatedSchema);

module.exports = Graduated;
