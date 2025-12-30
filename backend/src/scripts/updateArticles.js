import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import Article from "../models/Article.js";
import { searchRelatedArticles } from "../services/search.service.js";
import { improveArticleContent } from "../services/llm.service.js";

// ---------- DB CONNECTION ----------
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed", err.message);
    process.exit(1);
  }
};

// ---------- MAIN SCRIPT ----------
const updateArticles = async () => {
  await connectDB();

  const articles = await Article.find({
    updatedContent: null,
  });

  if (!articles.length) {
    console.log("No articles to update");
    process.exit(0);
  }

  for (const article of articles) {
    try {
      console.log(`\nUpdating article: ${article.title}`);

      // 1. Google search
      const searchResults = await searchRelatedArticles(article.title, 5);

      if (!searchResults.length) {
        console.log("No search results found, skipping");
        continue;
      }

      // 2. Filter + prepare references
      const references = [];
      const snippets = [];

      for (const result of searchResults) {
        if (
          result.link.includes("beyondchats.com") ||
          references.includes(result.link)
        ) {
          continue;
        }

        references.push(result.link);
        snippets.push(result.snippet);

        if (references.length === 3) break;
      }

      if (!references.length) {
        console.log("No valid references after filtering, skipping");
        continue;
      }

      // 3. Save references first (deterministic)
      article.references = references;
      await article.save();

      // 4. LLM content improvement
      const updatedContent = await improveArticleContent({
        originalContent: article.originalContent,
        referenceSnippets: snippets,
      });

      if (!updatedContent || updatedContent.length < 200) {
        console.log("LLM output too weak, skipping update");
        continue;
      }

      // 5. Save updated content
      article.updatedContent = updatedContent;
      await article.save();

      console.log("Updated successfully");
    } catch (err) {
      console.error("Failed to update article:", err.message);
    }
  }

  console.log("\nPhase 2 completed");
  process.exit(0);
};

updateArticles();
