import Tippy from "@tippyjs/react";
import Button from "components/Button";
import ImageLink from "components/ImageLink";
import links from "data/links";
import projectsList from "data/projects"; // Import your projectsList here
import { BiLinkExternal } from "react-icons/bi";
import { FaGithub } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";
import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://api.github.com/users/dnyaneshwarshekade/repos', {
          headers: {

          }
        });
        const formattedProjects = response.data.map(repo => ({
          id: repo.id,
          name: repo.name,
          summary: repo.description || 'No description available',
          tags: repo.topics || [], // Assuming topics are used as tags
          link: {
            github: repo.html_url,
            web: repo.homepage || '', // If a homepage link is available
          },
          image: `https://via.placeholder.com/500x250?text=${repo.name}`, // Placeholder image
        }));
        setProjects(formattedProjects);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div id={Section.Projects}>
      {getSectionHeading(Section.Projects)}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col gap-2">
            <ImageLink
              alt={project.name}
              src={project.image}
              dimensions={{ width: 500, height: 250 }}
              href={project.link.web || project.link.github}
            />

            <h4 className="text-lg font-bold">{project.name}</h4>

            <p className="prose prose-sm prose-neutral dark:prose-invert">{project.summary}</p>

            <p className="text-xs leading-relaxed font-bold">{project.tags.map((tag) => `#${tag}`).join(" ")}</p>

            {project.link && (
              <div className="mt-1 flex gap-5">
                {project.link.web && (
                  <Tippy content="Visit Website" placement="bottom">
                    <a href={project.link.web} target="_blank" rel="noreferrer">
                      <BiLinkExternal fontSize={18} />
                    </a>
                  </Tippy>
                )}

                {project.link.github && (
                  <Tippy content="Checkout Source Code" placement="bottom">
                    <a href={project.link.github} target="_blank" rel="noreferrer">
                      <FaGithub fontSize={18} />
                    </a>
                  </Tippy>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <Button icon={FaGithub} className="mt-8" onClick={() => openURLInNewTab(links.github)}>
        Projects on GitHub
      </Button>
    </div>
  );
};

export default Projects;
