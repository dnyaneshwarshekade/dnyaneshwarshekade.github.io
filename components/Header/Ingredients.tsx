import Typewriter from "typewriter-effect";
import { useState } from "react";

const Ingredients = () => {
  const [loading, setLoading] = useState(false);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const handleLoadClick = () => {
    if (loadCompleted) {
      window.location.href = "https://dnyaneshwar.github.io";
    }
  };

  const handleMouseEnter = () => {
    if (!loadCompleted) {
      setLoading(true);
      setTimeout(() => {
        setLoadCompleted(true);
      }, 2000); // Simulate loading for 2 seconds
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="buttons">
          <span className="close"></span>
          <span className="minimize"></span>
          <span className="maximize"></span>
        </div>
        <p className="terminal-title">bash</p>
      </div>
      <div className="terminal-body">
        <code className="text-center leading-loose code-block">
          <Typewriter
            options={{ delay: 40 }}
            onInit={(typewriter) => {
              typewriter
              .pauseFor(2000)
              .typeString("<span class='text-green-500'>dnyaneshwar@linux:</span>")
              .typeString("<span class='text-blue-500'>~$</span> cat /etc/dnyaneshwar-release<br>")
              .pauseFor(500)
              .typeString("<span class='text-green-500'>Dnyaneshwar OS</span><br>")
              .typeString("<span class='text-gray-500'>Version: 1.0.0</span><br>")
              .typeString("<span class='text-gray-500'>Codename: Dnyaneshwar</span><br>")
              .typeString("<span class='text-gray-500'>Release Date: 2024-09-20</span><br>")
              .typeString("<span class='text-gray-500'>Architecture: x86_64</span><br>")
              .start();
            }}
          />
        </code>
        <div
          className="loading-bar-container"
          onClick={handleLoadClick}
          onMouseEnter={handleMouseEnter}
        >
          <div className={`loading-bar ${loadCompleted ? 'loaded' : loading ? 'loading' : ''}`}>
            <span>{loadCompleted ? "Loaded Ubuntu" : loading ? "Loading Ubuntu..." : "Hover to load Ubuntu"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
