import Article from "../models/Article.js";
import { scrapeOldestArticles } from "../services/scraper.service.js";


// POST /articles/scrape
// Scrape and store oldest 5 articles

export const scrapeArticles = async (req, res) => {
  try {
    const scrapedArticles = await scrapeOldestArticles();

    const savedArticles = [];

    for (const item of scrapedArticles) {
      const exists = await Article.findOne({ sourceUrl: item.sourceUrl });
      if (exists) continue;

      const article = await Article.create({
        title: item.title,
        originalContent: item.content,
        sourceUrl: item.sourceUrl,
      });

      savedArticles.push(article);
    }

    res.status(201).json({
      message: "Scraping completed",
      count: savedArticles.length,
      articles: savedArticles,
    });
  } catch (error) {
    res.status(500).json({
      message: "Scraping failed",
      error: error.message,
    });
  }
};


// GET /articles

export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: 1 });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// GET /articles/:id

export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// PUT /articles/:id
// Used later by automation to store updated content

export const updateArticle = async (req, res) => {
  try {
    const { updatedContent, references } = req.body;

    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        updatedContent,
        references,
      },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// DELETE /articles/:id
 
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
