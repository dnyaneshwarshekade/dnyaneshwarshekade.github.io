import type { GetStaticProps, NextPage } from "next";
import {
  AboutMe,
  Achievements,
  Blog,
  Certifications,
  Contact,
  Education,
  Footer,
  Header,
  Languages,
  Music,
  Philantrophy,
  Photography,
  Projects,
  Resume,
  Skills,
  WorkExperience,
} from "sections";
import { getArticles, getDribbbleShots, getInstagramMedia } from "services";
import type { Article, DribbbleShot, InstagramMedia } from "types/Sections";

// Updated getStaticProps without ISR revalidate option
export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles();
  const dribbbleShots = await getDribbbleShots();
  const instagramMedia = await getInstagramMedia();

  return {
    props: { articles, dribbbleShots, instagramMedia },
    // Removed revalidate since it's not compatible with static export
  };
};

type Props = {
  articles: Article[];
  dribbbleShots: DribbbleShot[];
  instagramMedia: InstagramMedia[];
};

const Home: NextPage<Props> = ({ articles, dribbbleShots, instagramMedia }) => (
  <div className="w-5/6 mx-auto md:container grid gap-24">
    <Header />
    <AboutMe />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <WorkExperience />
      <Education />
    </div>
    <Skills />
    <Projects />
    <Blog />
    <Languages />
    <div className="grid lg:grid-cols-3 gap-12">
      <Achievements />
      <Certifications />
      <Philantrophy />
    </div>
    <Photography instagramMedia={instagramMedia} />
    <Music />
    <Resume />
    <Contact />
    <Footer />
  </div>
);

export default Home;
