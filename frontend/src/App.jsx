import { useEffect, useState } from "react";
import ArticleCard from "./components/ArticleCard.jsx";
import "./styles/app.css";

const API_URL = "https://automation-c0ds.onrender.com/articles";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [revealedId, setRevealedId] = useState(null);


  const fetchArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch articles");
      const data = await res.json();
      setArticles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

const handleUpdateArticle = async (id) => {
  try {
    const res = await fetch(
      `https://automation-c0ds.onrender.com/articles/${id}/update`,
      { method: "POST" }
    );

    if (!res.ok) throw new Error("Failed to update article");

    await fetchArticles();
  } catch (err) {
    setError(err.message);
  }
};


  if (loading) return <div className="state">Loading articles...</div>;
  if (error) return <div className="state error">Error: {error}</div>;
  if (articles.length === 0)
    return <div className="state">No articles found.</div>;

  return (
    <div className="app">
      <h1 className="app-title">Articles</h1>

      <div className="articles">
        {articles.map((article) => (
          <ArticleCard
            key={article._id}
            article={article}
            onUpdate={handleUpdateArticle}
            // revealed={revealedId === article._id}
          />

        ))}
      </div>
    </div>
  );
}
