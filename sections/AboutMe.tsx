import Image from "next/image";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const AboutMe = () => (
  <div id={Section.AboutMe}>
    {getSectionHeading(Section.AboutMe)}

    <div className="grid md:grid-cols-4 gap-12">
      <div className="relative col-span-1 hidden md:block">
        <Image
          fill
          alt="Dnyaneshwar Shekade"
          src="/images/about-me/selfie-boy.svg" // Update this path if you have a different image
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="col-span-3 max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
        <p>Hey there!</p>

        <p>
          I&apos;m Dnyaneshwar Shekade, and as you might have already guessed, I&apos;m a Linux Server & DevOps Engineer. This website was created to showcase my skills and projects. Don&apos;t judge my writing based on this section; I hope to improve it over time.
        </p>

        <p>
          I entered the IT field because I have a deep passion for technology and problem-solving. I thrive on optimizing systems and making them more efficient, ensuring that they run smoothly.
        </p>

        <p>
          My expertise lies in server management, virtualization, and cloud services, with a keen interest in Deep Learning and AI. I love exploring new technologies and finding innovative solutions to complex challenges.
        </p>

        <p>
          Outside of work, I enjoy reading technical literature, playing cricket, and watching YouTube videos on various topics. I believe that continuous learning is key to staying relevant in this fast-paced field.
        </p>

        <p>
          I created this website to showcase my work and make it easier for you to connect with me. If you like what you see, head over to the <a href="#contact">contact section</a> below and send me a message. I would love to hear from you!
        </p>
      </div>
    </div>
  </div>
);

export default AboutMe;
