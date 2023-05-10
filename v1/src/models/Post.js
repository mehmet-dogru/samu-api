const mongoose = require("mongoose");
const ROLES = require("../references/role.reference");

const PostSchema = new mongoose.Schema(
  {
    caption: { type: String, required: true, min: 1, max: 100 },
    imageUrl: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        text: { type: String },
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    visibility: {
      type: String,
      enum: ["public", "private"],
      required: true,
    },
  },
  { timestamps: false, versionKey: false }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
