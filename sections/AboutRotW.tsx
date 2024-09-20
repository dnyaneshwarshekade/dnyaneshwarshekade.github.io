import Button from "components/Button";
import links from "data/links";
import { MdStar } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading, openURLInNewTab } from "utils";

const AboutRotW = () => (
  <div id={Section.AboutRotW}>
    {getSectionHeading(Section.AboutRotW)}

    <div className="w-full lg:w-3/4 max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
  <p>
    <strong>Agnibyte Tech</strong> is a venture that I have been passionate about since its inception. I wanted to create a platform that offers innovative IT solutions, making technology accessible to businesses and individuals alike. This vision led to the creation of Agnibyte Tech.
  </p>

  <p>
    We continuously evolve to stay ahead in the tech landscape, embodying our belief that, much like technology, we should not be static. Our team embraces the latest advancements, pushing boundaries to learn new frameworks, explore cutting-edge tools, and experiment with fresh design concepts—all while ensuring that our core mission remains clear: to provide exceptional web hosting and cloud services.
  </p>

  <p>
    Our platform is built using Next.js (React) and Tailwind CSS for a streamlined user experience, and we utilize reliable hosting solutions to ensure optimal performance.
  </p>

  <p>
    We hope you enjoy exploring our services as much as we enjoy delivering them. If you have any feedback or inquiries, please reach out using the contact form above; we would be thrilled to connect with you.
  </p>

  <p>
    If you're interested in the technology behind our solutions, you can find our complete source code on GitHub. Feel free to explore and customize it, as our project is open-sourced under the permissive MIT License.
  </p>
</div>


    <Button icon={MdStar} className="mt-8" onClick={() => openURLInNewTab(links.repository)}>
      Star this Project on GitHub
    </Button>
  </div>
);

export default AboutRotW;
