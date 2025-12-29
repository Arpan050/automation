import axios from "axios";
import * as cheerio from "cheerio";

const BASE_URL = "https://beyondchats.com/blogs";


// Fetch raw HTML with a real User-Agent
 
const fetchHTML = async (url) => {
  const { data } = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  return data;
};


// Find the last pagination page number

const getLastPageNumber = async () => {
  const html = await fetchHTML(`${BASE_URL}/`);
  const $ = cheerio.load(html);

  let maxPage = 1;

  $("a.page-numbers").each((_, el) => {
    const text = $(el).text().trim();
    const num = parseInt(text, 10);
    if (!isNaN(num) && num > maxPage) {
      maxPage = num;
    }
  });

  return maxPage;
};


// Extract article URLs from a given page

const getArticleUrlsFromPage = async (pageNumber) => {
  const pageUrl = pageNumber === 1
    ? `${BASE_URL}/`
    : `${BASE_URL}/page/${pageNumber}/`;

  const html = await fetchHTML(pageUrl);
  const $ = cheerio.load(html);

  const urls = [];

  $('a[rel="bookmark"]').each((_, el) => {
    const href = $(el).attr("href");
    if (href) urls.push(href);
  });

  return urls;
};


// Scrape a single article

const scrapeArticle = async (url) => {
  const html = await fetchHTML(url);
  const $ = cheerio.load(html);

  const title = $("h1").first().text().trim();

  const contentContainer = $(".elementor-widget-theme-post-content");

  if (!contentContainer.length) {
    throw new Error("Article content container not found");
  }

  let content = "";

  contentContainer.find("p, h2, h3, ul, ol").each((_, el) => {
    const text = $(el).text().trim();
    if (text.length > 40) {
      content += text + "\n\n";
    }
  });

  content = content.replace(/\n{3,}/g, "\n\n").trim();

  return {
    title,
    content,
    sourceUrl: url,
  };
};



// MAIN EXPORT
// Collect oldest 5 articles across last pages if needed

export const scrapeOldestArticles = async () => {
  const lastPage = await getLastPageNumber();

  let currentPage = lastPage;
  const collectedUrls = [];

  while (collectedUrls.length < 5 && currentPage >= 1) {
    const pageUrls = await getArticleUrlsFromPage(currentPage);

    for (const url of pageUrls) {
      if (collectedUrls.length < 5) {
        collectedUrls.push(url);
      }
    }

    currentPage--;
  }

  const results = [];

  for (const url of collectedUrls) {
    const article = await scrapeArticle(url);
    results.push(article);
  }

  return results;
};
