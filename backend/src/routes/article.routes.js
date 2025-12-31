import express from "express";
import {
  scrapeAndSaveArticles,
  updateArticle,
} from "../controllers/article.controller.js";
import Article from "../models/Article.js";

const router = express.Router();

router.post("/scrape", scrapeAndSaveArticles);

router.get("/", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

router.post("/:id/update", updateArticle);

export default router;
