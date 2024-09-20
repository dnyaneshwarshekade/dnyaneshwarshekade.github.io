import certificationsList from "data/certifications";
import { MdChevronRight } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const Certifications = () => (
  <div id={Section.Certifications}>
    {getSectionHeading(Section.Certifications)}

    <div className="grid gap-4">
      {certificationsList.map((certification) => (
        <div key={certification.id} className="flex gap-5 group">
          <div>
            <MdChevronRight
              fontSize={20}
              className="relative left-0 group-hover:left-3 group-hover:text-orange-500 transition-[left_color]"
            />
          </div>

          <div className="leading-relaxed">
            <h5 className="font-bold group-hover:text-orange-500 transition-[color]">{certification.title}</h5>
            <p className="prose prose-sm prose-neutral dark:prose-invert">{certification.issuer}</p>
            <p className="prose prose-sm prose-neutral dark:prose-invert">{certification.grade}</p>
            <a href={certification.certificateLink} className="text-orange-500 hover:underline">
              View Certificate
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Certifications;
