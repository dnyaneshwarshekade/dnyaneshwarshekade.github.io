import React, { useEffect, useState } from "react";
import Button from "components/Button";
import links from "data/links";
import { FaDev } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading, openURLInNewTab } from "utils";

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [expandedArticleId, setExpandedArticleId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async () => {
    console.log("Fetching articles...");
    try {
      const response = await fetch("https://dev.to/api/articles?username=dnyaneshwarshekade");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Articles fetched:", data);
      setArticles(data);
    } catch (error) {
      console.error("Error fetching articles from Dev.to:", error);
      setError("Failed to load articles. Please try again later.");
    }
  };

  useEffect(() => {
    fetchArticles(); // Initial fetch

    const intervalId = setInterval(() => {
      fetchArticles(); // Fetch articles every 10 seconds
      console.log("Fetching articles at interval..."); // Log fetch attempt
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  const handleArticleClick = (articleUrl: string) => {
    window.open(articleUrl, "_blank");
  };

  const toggleExpandArticle = (id: number) => {
    setExpandedArticleId(expandedArticleId === id ? null : id);
  };

  const getDescription = (description: string, article: Article) => {
    const words = description.split(" ");
    if (words.length > 20) {
      const truncated = words.slice(0, 20).join(" ") + "...";
      return (
        <div>
          <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert">
            {truncated}
          </p>
          <Button onClick={() => toggleExpandArticle(article.id)} className="mt-2 text-sm">
            Read More
          </Button>
          {expandedArticleId === article.id && (
            <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert mt-2">
              {description}
            </p>
          )}
        </div>
      );
    }
    return (
      <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert">
        {description}
      </p>
    );
  };

  return (
    <div id={Section.Blog} className="p-4 md:p-6">
      {getSectionHeading(Section.Blog)}
      
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:text-orange-500 active:text-orange-600">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleArticleClick(article.url);
              }}
              className="flex flex-col"
            >
              <h4 className="text-lg md:text-xl font-bold truncate">{article.title}</h4>
              <p className="mt-1 text-xs md:text-sm">
                Published on {formatDateString(article.published_at)} | {article.public_reactions_count} Reactions
              </p>
              {getDescription(article.description, article)}
            </a>

            {article.tag_list.length > 0 && (
              <p className="text-xs leading-relaxed font-bold">
                {article.tag_list.map((tag) => `#${tag}`).join(" ")}
              </p>
            )}
          </div>
        ))}
      </div>

      {visibleCount < articles.length && (
        <Button className="mt-4 px-4 py-2" onClick={handleShowMore}>
          Click here to display more
        </Button>
      )}

      <Button icon={FaDev} className="mt-8 px-4 py-2" onClick={() => openURLInNewTab(links.dev)}>
        Articles on DEV
      </Button>
    </div>
  );
};

export default Blog;
