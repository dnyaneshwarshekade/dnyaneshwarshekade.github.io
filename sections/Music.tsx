import React, { useState, useEffect } from "react";
import Button from "components/Button";
import { FaSpotify } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const Music = () => {
  const [isIframeVisible, setIframeVisible] = useState(false);

  useEffect(() => {
    // Show iframe by default on desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIframeVisible(true);
      } else {
        setIframeVisible(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleButtonClick = () => {
    setIframeVisible(true);
  };

  return (
    <div id={Section.Music} className="px-4 py-8 md:px-8">
      {getSectionHeading(Section.Music)}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="max-w-full prose prose-sm md:prose-base prose-neutral dark:prose-invert">
          <p>
            If you&apos;ve read about my profile so far and found it interesting, studies show that knowing what type
            of music a person listens to would say a lot about them.
          </p>

          <p>
            I&apos;ve been known for my good taste in music and always wanted to share the latest and greatest hits. 
            Here&apos;s a Spotify Playlist I&apos;ve created called "My Everyday": a dynamic playlist of what&apos;s on my daily roster of music.
          </p>

          {!isIframeVisible && (
            <Button
              icon={FaSpotify}
              className="mt-6 text-sm"
              onClick={handleButtonClick}
            >
              Listen to My Everyday on Spotify
            </Button>
          )}
        </div>

        {isIframeVisible && (
          <div className="md:col-span-2 col-span-full">
            <iframe
              src="https://open.spotify.com/embed/playlist/4ynog50nYPDm024X0NJ9Ho?utm_source=generator"
              width="100%"
              height="512"
              frameBorder="0"
              allow="encrypted-media"
              className="rounded shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
