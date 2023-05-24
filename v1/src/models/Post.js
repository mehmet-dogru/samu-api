const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 1, max: 100 },
    content: { type: String, required: true, min: 1, max: 500 },
    imageUrl: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: false, versionKey: false }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
