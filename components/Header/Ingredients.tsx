import { useState } from "react";
import Typewriter from "typewriter-effect";

const Ingredients = () => {
  const [loading, setLoading] = useState(false);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const handleLoadClick = () => {
    if (loadCompleted) {
      window.location.href = "https://dnyaneshwarshekade.github.io/portfolio";
    }
  };

  const handleMouseEnter = () => {
    if (!loadCompleted) {
      setLoading(true);
      setTimeout(() => {
        setLoadCompleted(true);
      }, 4000); // Simulate loading for 4 seconds
    }
  };

  return (
    <div className="terminal-window w-full max-w-[90%] mx-auto">
      <div className="terminal-header flex items-center justify-between">
        <div className="buttons flex gap-1">
          <span className="close w-3 h-3 rounded-full bg-red-500"></span>
          <span className="minimize w-3 h-3 rounded-full bg-yellow-500"></span>
          <span className="maximize w-3 h-3 rounded-full bg-green-500"></span>
        </div>
        <p className="terminal-title text-sm">bash</p>
      </div>
      <div className="terminal-body p-4">
        <code className="text-center leading-loose code-block block text-xs sm:text-sm">
          <Typewriter
            options={{ delay: 20 }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(1000)
                .typeString("<span class='text-green-500'>dnyaneshwar@linux:</span>")
                .typeString("<span class='text-blue-500'>~$</span> cat /etc/dnyaneshwar-release<br>")
                .pauseFor(250)
                .typeString("<span class='text-green-500'>AboutDnyaneshwar</span><br>")
                .typeString("<span class='pl-5'></span><span class='text-red-500'>Designer</span>, ")
                .typeString("<span class='text-red-500'>Administrator</span>, ")
                .typeString("<span class='text-red-500'>Blogger</span>,<br> ")
                .typeString("<span class='text-red-500'>Sugar, Spice</span>")
                .typeString("<span class='pl-5'></span><span class='text-red-500'>...everythingNice</span>")
                .start();
            }}
          />
        </code>
        <div
          className="loading-bar-container mt-4 cursor-pointer text-center"
          onClick={handleLoadClick}
          onMouseEnter={handleMouseEnter}
        >
          <div className={`loading-bar px-2 py-1 text-xs sm:text-sm ${loadCompleted ? 'loaded' : loading ? 'loading' : ''}`}>
            <span>{loadCompleted ? "Loaded Ubuntu Portfolio Click to check" : loading ? "Loading Ubuntu..." : "Click here to Load Dnyaneshwar Ubuntu Portfolio"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
