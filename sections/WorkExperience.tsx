import Tippy from "@tippyjs/react";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { MdMoreHoriz } from "react-icons/md";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

const DISPLAY_COUNT = 3;

type WorkExperience = {
  id: number;
  logo: string;
  name: string;
  period: { start: string; end: string };
  position: string;
  location: string;
  summary: string;
  keyFocus: string[];
};

const workExperiences: WorkExperience[] = [
    {
      id: 1,
      logo: "/images/work-experience/softaculous.svg",
      name: "Softaculous Limited",
      period: { start: "Feb 23", end: "Present" },
      position: "Linux Support Engineer",
      location: "Kamla Mills, Lower Parel",
      summary: `
        - Administered the Virtualizor control panel, effectively managing and deploying virtual machines using KVM, Xen, OpenVZ, and LXC. Oversaw complete VM lifecycle management including creation, configuration, and monitoring.
        - Led the implementation and management of the Webuzo control panel, streamlining server administration and application deployment. Used Softaculous for seamless one-click installation and ongoing application maintenance.
        - Configured and optimized Apache and Nginx web servers to improve performance, ensure high availability, and address troubleshooting needs for a wide range of server environments.
        - Administered MySQL and MariaDB databases, focusing on database creation, user access management, and performance tuning to support application efficiency.
        - Developed and maintained automation scripts and custom server functionality using PHP, Python, and Bash scripting to enhance server automation and operational workflows.
        - Configured and administered email services using Exim and Postfix, while managing IMAP/POP3 services with Dovecot and Courier.
        - Implemented SSL/TLS encryption protocols to secure communications and managed system-level firewalls for strong security postures.
        - Managed backup and restore operations for critical applications, databases, and server configurations for disaster recovery and data protection.
        - Managed Linux environments using RPM/YUM (CentOS) and APT (Ubuntu) for system stability and efficient software updates.
        - Configured and managed DNS services with BIND, overseeing domain name resolution and ensuring uptime for key web services.
      `,
      keyFocus: [
        "Virtualizor",
        "Webuzo",
        "Apache",
        "Nginx",
        "MySQL",
        "MariaDB",
        "AWS Services",
        "Bash Scripting",
        "Python",
        "Linux Administration",
        "DNS Management",
      ],
    },
    {
      id: 2,
      logo: "/images/work-experience/reliance.svg",
      name: "Reliance Industries Limited",
      period: { start: "Jan 23", end: "Jan 24" },
      position: "System Engineer",
      location: "Reliance Corporate Park, Ghansoli",
      summary: `
        - Managed and resolved desktop-related issues via remote access in a large-scale enterprise environment.
        - Installed and configured whitelist applications within the Reliance network, ensuring smooth application deployment.
        - Provided and managed access to specific websites through Active Directory, maintaining network security and compliance.
        - Applied and maintained Windows patches, keeping systems up-to-date and secure.
        - Tested and implemented virtualization solutions using Accops and Citrix desktop environments, optimizing remote work capabilities.
        - Handled Data Loss Prevention (DLP) issues, ensuring data protection and security standards.
        - Troubleshot Office 365 and Office 2019 issues, including migrating users to Azure licenses, enhancing productivity.
        - Integrated and deployed Linux Ubuntu within the Reliance network, improving system performance and flexibility.
      `,
      keyFocus: [
        "Remote Desktop Support",
        "Windows Administration",
        "Active Directory",
        "Virtualization (Accops, Citrix)",
        "Data Loss Prevention (DLP)",
        "Office 365",
        "Azure",
        "Linux Administration",
      ],
    },
    // Add any additional experiences as needed
  ];
  

type Props = {
  data: WorkExperience;
  isFirst: boolean;
  isLast: boolean;
};

const WorkExperience: React.FC<Props> = ({ data, isFirst, isLast }) => (
  <div className="flex group">
    <div className={clsx("ml-1 w-1 flex-shrink-0 bg-neutral-500/25", { "rounded-t": isFirst, "rounded-b": isLast })} />

    <div className="-ml-2 mt-8 flex-shrink-0 relative w-3 h-3 rounded-full shadow-lg bg-teal-500/80 dark:bg-white/80 group-hover:w-6 transition-[width]" />

    <div className="mt-5 ml-8 grid gap-2 pb-2">
      <div className="relative w-[100px] h-10">
        <Image src={data.logo} alt={data.name} width={100} height={40} className="object-contain" />
      </div>

      <div>
        <h3>
          <span className="text-base font-bold">{data.name}</span>{" "}
          <span className="text-xs">
            ({data.period.start} - {data.period.end})
          </span>
        </h3>
        <h4>{data.position}</h4>
      </div>

      <h5 className="my-1 flex gap-2 items-center text-xs">
        <FaLocationArrow />
        <span>{data.location}</span>
      </h5>

      <p className="prose prose-sm prose-neutral dark:prose-invert">{data.summary}</p>

      <p className="text-xs leading-relaxed prose-sm prose-neutral dark:prose-invert">
        <strong>Key Focus:</strong> {data.keyFocus.join(", ")}
      </p>
    </div>
  </div>
);

const WorkExperienceTimeline = () => {
  const [showMore, setShowMore] = useState(workExperiences.length > DISPLAY_COUNT ? false : true);

  return (
    <div id={Section.WorkExperience}>
      {getSectionHeading(Section.WorkExperience)}

      <div className="flex flex-col">
        {workExperiences
          .filter((_, index) => (showMore ? true : index < DISPLAY_COUNT))
          .map((data, index) => (
            <WorkExperience key={data.id} data={data} isFirst={index === 0} isLast={index === 2} />
          ))}
      </div>

      {!showMore && (
        <Tippy content={`Show ${workExperiences.length - DISPLAY_COUNT} More`} placement="right">
          <div className="inline-block ml-8 p-2 cursor-pointer" onClick={() => setShowMore(true)}>
            <MdMoreHoriz size="24" />
          </div>
        </Tippy>
      )}
    </div>
  );
};

export default WorkExperienceTimeline;
