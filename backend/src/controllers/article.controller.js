import Article from "../models/Article.js";
import { scrapeOldestArticles } from "../services/scraper.service.js";
import { generateUpdatedContent } from "../services/llm.service.js";

export const scrapeAndSaveArticles = async (req, res) => {
  try {
    const scrapedArticles = await scrapeOldestArticles();

    if (!scrapedArticles.length) {
      return res.status(200).json({ message: "No articles scraped" });
    }

    const savedArticles = [];

    for (const a of scrapedArticles) {
      const exists = await Article.findOne({ sourceUrl: a.sourceUrl });
      if (exists) continue;

      const article = await Article.create({
        title: a.title,
        originalContent: a.content,
        updatedContent: null,
        references: [],
        sourceUrl: a.sourceUrl,
      });

      savedArticles.push(article);
    }

    return res.json({
      message: "Scraped and saved",
      count: savedArticles.length,
      articles: savedArticles,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


export const updateArticle = async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }

  const updatedText = await generateUpdatedContent(article.originalContent);

  article.updatedContent = updatedText;
  article.updatedAt = new Date();
  await article.save();

  res.json({
    message: "Article updated",
    article,
  });
};
