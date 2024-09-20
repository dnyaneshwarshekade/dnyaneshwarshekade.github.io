import Tippy from "@tippyjs/react";
import Button from "components/Button";
import ImageLink from "components/ImageLink";
import links from "data/links";
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";
import { useEffect, useState } from "react";
import axios from "axios";

// Define the type for your project
interface Project {
  name: string;
  summary: string;
  link: {
    github: string;
    web: string;
  };
  image: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/dnyaneshwarshekade/repos', {
          headers: {
            'Authorization': `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`
          }
        });

        const formattedProjects = response.data
          .filter((repo: any) => repo.stargazers_count > 0)
          .map((repo: any) => ({
            name: repo.name,
            summary: repo.description || 'No description available',
            link: {
              github: repo.html_url,
              web: repo.homepage || '',
            },
            image: `https://via.placeholder.com/500x250?text=${repo.name}`, // Placeholder image
          }));

        setProjects(formattedProjects);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id={Section.Projects} className="px-4">
      {getSectionHeading(Section.Projects)}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="flex flex-col gap-2 p-4 border rounded-lg shadow-md transition-transform transform hover:scale-105">
            <ImageLink
              alt={project.name}
              src={project.image}
              dimensions={{ width: 500, height: 250 }}
              href={project.link.web || project.link.github}
              className="rounded-lg overflow-hidden"
            />

            <h4 className="text-lg font-bold truncate">{project.name}</h4> {/* Added truncate class */}

            <p className="prose prose-sm prose-neutral dark:prose-invert overflow-hidden text-ellipsis whitespace-nowrap">{project.summary}</p> {/* Added overflow and text classes */}

            {project.link && (
              <div className="mt-1 flex gap-4">
                {project.link.web && (
                  <Tippy content="Visit Website" placement="bottom">
                    <a href={project.link.web} target="_blank" rel="noreferrer">
                      <BiLinkExternal fontSize={20} />
                    </a>
                  </Tippy>
                )}

                {project.link.github && (
                  <Tippy content="Checkout Source Code" placement="bottom">
                    <a href={project.link.github} target="_blank" rel="noreferrer">
                      <FaGithub fontSize={20} />
                    </a>
                  </Tippy>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button icon={FaGithub} className="mt-8 w-full sm:w-auto" onClick={() => openURLInNewTab(links.github)}>
        Projects on GitHub
      </Button>
    </div>
  );
};

export default Projects;
