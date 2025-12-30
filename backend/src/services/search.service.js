import axios from "axios";

const SERPER_URL = "https://google.serper.dev/search";

export const searchRelatedArticles = async (query, limit = 5) => {
  const response = await axios.post(
    SERPER_URL,
    {
      q: query,
      num: limit,
    },
    {
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data || !response.data.organic) {
    return [];
  }

  return response.data.organic.map((item) => ({
    title: item.title,
    link: item.link,
    snippet: item.snippet,
  }));
};
