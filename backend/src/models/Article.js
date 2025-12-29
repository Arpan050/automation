import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    originalContent: {
      type: String,
      required: true,
    },

    updatedContent: {
      type: String,
      default: null,
    },

    sourceUrl: {
      type: String,
      required: true,
      unique: true,
    },

    references: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
