import React, { useEffect, useState } from "react";
import Button from "components/Button";
import links from "data/links";
import { FaDev } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading, openURLInNewTab } from "utils";

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [latestArticles, setLatestArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const articleIds = new Set<string>(); // Set to track unique article IDs

  const fetchArticles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dev.to/api/articles?username=dnyaneshwarshekade&page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();
      
      // Filter out duplicates
      const newArticles = data.filter((article: Article) => {
        if (!articleIds.has(article.id.toString())) {
          articleIds.add(article.id.toString());
          return true; // Keep the article
        }
        return false; // Filter out the duplicate
      });

      setArticles((prevArticles) => [...prevArticles, ...newArticles]); // Append unique articles
    } catch (error) {
      console.error(error);
      setError("Error fetching articles from Dev.to. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page); // Fetch articles for the current page
  }, [page]);

  useEffect(() => {
    // Always keep the latest 5 articles in a separate state
    const latest = articles.slice(0, 5);
    setLatestArticles(latest);
  }, [articles]);

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1); // Increment page number to load more articles
  };

  const handleArticleClick = (e: React.MouseEvent, articleUrl: string) => {
    e.preventDefault();
    window.open(articleUrl, "_blank", "noopener,noreferrer");
  };

  const getDescription = (description: string) => {
    const words = description.split(" ");
    if (words.length > 20) {
      const truncated = words.slice(0, 20).join(" ") + "...";
      return (
        <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert">
          {truncated}
        </p>
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

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:text-orange-500 active:text-orange-600">
                <a
                  href={article.url}
                  onClick={(e) => handleArticleClick(e, article.url)}
                  className="flex flex-col"
                >
                  <h4 className="text-lg md:text-xl font-bold truncate">{article.title}</h4>
                  <p className="mt-1 text-xs md:text-sm">
                    Published on {formatDateString(article.published_at)} | {article.public_reactions_count} Reactions
                  </p>
                  {getDescription(article.description)}
                </a>

                {article.tag_list.length > 0 && (
                  <p className="text-xs leading-relaxed font-bold">
                    {article.tag_list.map((tag) => `#${tag}`).join(" ")}
                  </p>
                )}
              </div>
            ))}
          </div>

          {showMore && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
              {articles.slice(5).map((article) => (
                <div key={article.id} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:text-orange-500 active:text-orange-600">
                  <a
                    href={article.url}
                    onClick={(e) => handleArticleClick(e, article.url)}
                    className="flex flex-col"
                  >
                    <h4 className="text-lg md:text-xl font-bold truncate">{article.title}</h4>
                    <p className="mt-1 text-xs md:text-sm">
                      Published on {formatDateString(article.published_at)} | {article.public_reactions_count} Reactions
                    </p>
                    {getDescription(article.description)}
                  </a>

                  {article.tag_list.length > 0 && (
                    <p className="text-xs leading-relaxed font-bold">
                      {article.tag_list.map((tag) => `#${tag}`).join(" ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {!showMore && (
            <Button className="mt-4 px-4 py-2" onClick={() => setShowMore(true)}>
              Read More Articles
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
