import { format } from "date-fns";
import { useState } from "react";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const [loadCompleted, setLoadCompleted] = useState(false);

  const handleLoadClick = () => {
    if (loadCompleted) {
      window.location.href = "https://dnyaneshwarshekade.github.io";
    } else {
      setLoading(true);
      // Simulate loading process
      setTimeout(() => {
        setLoading(false);
        setLoadCompleted(true);
      }, 2000); // Adjust time as needed
    }
  };

  const handleMouseEnter = () => {
    // Optional: handle mouse enter events if needed
  };

  return (
    <div id="footer" className="mb-16 text-xs leading-loose opacity-30">
      <div
        className="loading-bar-container"
        onClick={handleLoadClick}
        onMouseEnter={handleMouseEnter}
      >
        <div className={`loading-bar ${loadCompleted ? 'loaded' : loading ? 'loading' : ''}`}>
          <span>
            {loadCompleted
              ? "Loaded Ubuntu Portfolio Click to check"
              : loading
              ? "Loading Ubuntu..."
              : "Click here to Load Dnyaneshwar Ubuntu Portfolio"}
          </span>
        </div>
      </div>
      
      Licensed under MIT.
      <br />
      Copyright {format(Date.now(), "yyyy")} Dnyaneshwar Shekade.
    </div>
  );
};

export default Footer;
