const server = require("./server");
const cloudinary = require("./cloudinary");

module.exports = () => {
  server();
  cloudinary();
};
