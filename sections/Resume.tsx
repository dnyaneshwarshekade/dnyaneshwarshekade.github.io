import Button from "components/Button";
import links from "data/links";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";
import { useState } from "react";

const Resume = () => {
  const [showResumeModal, setShowResumeModal] = useState(false);

  const handleResumeAction = () => {
    setShowResumeModal(true);
  };

  return (
    <div id={Section.Resume}>
      {getSectionHeading(Section.Resume)}

      <div className="flex flex-col md:flex-row items-center gap-12">
        <div 
          className="w-full flex-1 cursor-pointer transform transition-transform duration-300 hover:scale-105" 
          onClick={handleResumeAction}
        >
          <img
            src="/images/resume/cover.jpg"
            alt="Dnyaneshwar's Resume on Print"
            height={300}
            className="w-full h-auto rounded-lg shadow-md" // Add styles as needed
          />
        </div>

        <div className="flex flex-col items-start gap-8 flex-[2]">
          <div className="max-w-full prose prose-lg md:prose-2xl prose-neutral dark:prose-invert">
            <h4>
              To those HRs out there who need a more organized and minimal version of my information, you can download the
              trusted PDF version here:
            </h4>
          </div>

          <div>
            <Button onClick={handleResumeAction}>View and Download Resume</Button>
          </div>
        </div>
      </div>

      {showResumeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <h2 className="text-lg font-semibold mb-2">Resume</h2>
            <iframe
              src="/files/Dnyaneshwar's-Resume.pdf"
              width="100%"
              height="400px"
              title="Resume"
            />
            <div className="mt-4 flex justify-end">
              <Button onClick={() => setShowResumeModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resume;
