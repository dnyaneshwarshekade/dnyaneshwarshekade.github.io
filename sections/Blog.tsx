import React, { useEffect, useState, useRef } from "react";
import Button from "components/Button";
import links from "data/links";
import { FaDev } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading, openURLInNewTab } from "utils";

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]); // State to store all articles
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [page, setPage] = useState(1); // State to manage the current page
  const articleIds = useRef(new Set<string>()); // Ref to track unique article IDs

  // Fetch articles from Dev.to API
  const fetchArticles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://dev.to/api/articles?username=dnyaneshwarshekade&page=${page}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch articles");
      }
      const data = await response.json();

      // Filter out duplicates based on article ID
      const newArticles = data.filter((article: Article) => {
        if (!articleIds.current.has(article.id.toString())) {
          articleIds.current.add(article.id.toString()); // Mark article as seen
          return true; // Include the article in the list
        }
        return false; // Exclude duplicates
      });

      // Append new articles to existing ones
      setArticles((prevArticles) => [...prevArticles, ...newArticles]);
    } catch (error) {
      console.error(error);
      setError("Error fetching articles from Dev.to. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles when the component mounts or when the page number changes
  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  // Function to load more articles (increments the page)
  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1); // Move to the next page
  };

  // Function to open article link in a new tab
  const handleArticleClick = (e: React.MouseEvent, articleUrl: string) => {
    e.preventDefault();
    window.open(articleUrl, "_blank", "noopener,noreferrer");
  };

  // Truncate long descriptions
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
          {/* Display all the articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:text-orange-500 active:text-orange-600"
              >
                <a
                  href={article.url}
                  onClick={(e) => handleArticleClick(e, article.url)}
                  className="flex flex-col"
                >
                  <h4 className="text-lg md:text-xl font-bold truncate">
                    {article.title}
                  </h4>
                  <p className="mt-1 text-xs md:text-sm">
                    Published on {formatDateString(article.published_at)} |{" "}
                    {article.public_reactions_count} Reactions
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

          {/* Load more articles button */}
          <Button
            className="px-3 py-1 bg-gray-200 text-black border rounded"
            onClick={loadMoreArticles}
          >
            Load More Articles
          </Button>

          {/* Button to open the Dev.to profile */}
          <Button
            icon={FaDev}
            className="mt-8 px-4 py-2"
            onClick={() => openURLInNewTab(links.dev)}
          >
            Dnyaneshwar Articles on DEV
          </Button>
        </>
      )}
    </div>
  );
};

export default Blog;
