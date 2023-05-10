const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
      console.log("DB Connection SUCCESS!");
    })
    .catch(() => {
      console.log("DB Connection FAILED!");
    });
};

module.exports = {
  connectDB,
};
