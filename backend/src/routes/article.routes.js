import express from "express";
import {
  scrapeArticles,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";

const router = express.Router();

router.post("/scrape", scrapeArticles);
router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.put("/:id", updateArticle);
router.delete("/:id", deleteArticle);

export default router;
