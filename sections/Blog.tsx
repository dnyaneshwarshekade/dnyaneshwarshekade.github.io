import React, { useEffect, useState } from "react";
import Button from "components/Button";
import ImageLink from "components/ImageLink";
import links from "data/links";
import { FaDev } from "react-icons/fa";
import { Article, Section } from "types/Sections";
import { formatDateString, getSectionHeading, openURLInNewTab } from "utils";

const Blog: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?username=dnyaneshwarshekade');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles from Dev.to:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };

  return (
    <div id={Section.Blog} className="p-4 md:p-6">
      {getSectionHeading(Section.Blog)}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.slice(0, visibleCount).map((article) => (
          <div key={article.id} className="flex flex-col gap-4 p-4 border rounded-lg shadow-sm">
            <ImageLink
              href={article.url}
              alt={article.title}
              src={article.social_image}
              height={250}
              className="w-full h-auto"
            />

            <div>
              <h4 className="text-lg md:text-xl font-bold truncate">{article.title}</h4>
              <p className="mt-1 text-xs md:text-sm">
                Published on {formatDateString(article.published_at)} | {article.public_reactions_count} Reactions
              </p>
            </div>

            <p className="prose prose-sm md:prose-base prose-neutral dark:prose-invert">{article.description}</p>

            {article.tag_list.length > 0 && (
              <p className="text-xs leading-relaxed font-bold">{article.tag_list.map((tag) => `#${tag}`).join(" ")}</p>
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
