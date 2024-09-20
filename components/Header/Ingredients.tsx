import Typewriter from "typewriter-effect";
import { useState } from "react";

const Ingredients = () => {
  const [loading, setLoading] = useState(false);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const handleLoadClick = () => {
    if (loadCompleted) {
      window.location.href = "https://dnyaneshwarshekade.github.io";
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
        <code className="text-center leading-loose">
          <Typewriter
            options={{ delay: 40 }}
            onInit={(typewriter) => {
              typewriter
                .pauseFor(2000)
                .typeString("<span class='text-green-500'>dnyaneshwar@linux:</span>")
                .typeString("<span class='text-blue-500'>~$</span> cat /etc/dnyaneshwar-release<br>")
                .pauseFor(500)
                .typeString("<span class='text-green-500'>AboutDnyaneshwar</span><br>")
                .typeString("<span class='pl-5'></span><span class='text-red-500'>Designer</span>, ")
                .typeString("<span class='text-red-500'>Administrator</span>, ")
                .typeString("<span class='text-red-500'>Photographer</span>, ")
                .typeString("<span class='text-red-500'>Writer</span>,<br>")
                .typeString("<span class='pl-5'></span><span class='text-red-500'>Sugar</span>, ")
                .typeString("<span class='text-red-500'>Spice</span>, ")
                .typeString("<span class='text-red-500'>...everythingNice</span><br>")
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
            <span>{loadCompleted ? "Loaded Ubuntu : Click here to check My Ubuntu Portfolio" : loading ? "Loading Ubuntu..." : "Click here to check My Ubuntu protfolio"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ingredients;
