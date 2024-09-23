import React, { useEffect, useState } from "react";
import Button from "components/Button";
import links from "data/links";
import { FaDev } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading, openURLInNewTab } from "utils";

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const articleIds = new Set<string>();

  const fetchArticles = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://dev.to/api/articles?username=dnyaneshwarshekade&page=${page}`);
      if (!response.ok) throw new Error("Failed to fetch articles");
      
      const data = await response.json();
      const newArticles = data.filter((article: Article) => {
        if (!articleIds.has(article.id.toString())) {
          articleIds.add(article.id.toString());
          return true;
        }
        return false;
      });

      if (newArticles.length === 0) {
        setError("No new articles available.");
      } else {
        setArticles((prevArticles) => [...prevArticles, ...newArticles]);
      }
    } catch (error) {
      console.error(error);
      setError("Error fetching articles from Dev.to. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const loadMoreArticles = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getDescription = (description: string) => {
    const words = description.split(" ");
    const truncated = words.length > 20 ? `${words.slice(0, 20).join(" ")}...` : description;
    return <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert">{truncated}</p>;
  };

  return (
    <div id={Section.Blog} className="p-4 md:p-6">
      {getSectionHeading(Section.Blog)}

      {loading && <p aria-live="polite">Loading...</p>}
      {error && <p className="text-red-500" aria-live="assertive">{error}</p>}
      
      {!loading && !error && articles.length === 0 && <p>No articles found.</p>}

      {!loading && !error && articles.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm transition-transform transform hover:scale-105 hover:text-orange-500 active:text-orange-600">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
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

          <Button className="mt-4 px-4 py-2" onClick={loadMoreArticles}>
            Load More Articles
          </Button>

          <Button icon={FaDev} className="mt-8 px-4 py-2" onClick={() => openURLInNewTab(links.dev)}>
            Dnyaneshwar Articles on DEV
          </Button>
        </>
      )}
    </div>
  );
};

export default Blog;
