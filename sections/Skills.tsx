import { FaLinux, FaChartLine, FaCloud, FaDatabase, FaServer, FaEnvelope, FaCogs, FaCode, FaDesktop } from 'react-icons/fa';
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

type Skill = {
  id: number;
  icon: JSX.Element;
  name: string;
  technologies: string[];
};

const skills: Skill[] = [
  {
    id: 1,
    icon: <FaLinux />,
    name: "Linux Server Management",
    technologies: [
      "Ubuntu",
      "CentOS",
      "AlmaLinux",
      "Red Hat",
      "Bash/Shell Scripting",
      "SSH",
      "IPTables",
      "Firewalld"
    ],
  },
  {
    id: 2,
    icon: <FaChartLine />,
    name: "Server Monitoring & Performance Tuning",
    technologies: ["Syslog", "Journalctl"],
  },
  {
    id: 3,
    icon: <FaCloud />,
    name: "Virtualization Management",
    technologies: ["KVM", "Xen", "OpenVZ", "LXC"],
  },
  {
    id: 4,
    icon: <FaCogs />,
    name: "Webuzo Management",
    technologies: ["Softaculous", "Application Deployment"],
  },
  {
    id: 5,
    icon: <FaCloud />,
    name: "AWS & Cloud Management",
    technologies: ["EC2", "S3", "AWS Management Console"],
  },
  {
    id: 6,
    icon: <FaDatabase />,
    name: "Database Management",
    technologies: ["MySQL", "MariaDB", "Performance Tuning"],
  },
  {
    id: 7,
    icon: <FaServer />,
    name: "Web Server Management",
    technologies: ["Apache", "Nginx", "OpenLiteSpeed"],
  },
  {
    id: 8,
    icon: <FaEnvelope />,
    name: "Email Services Management",
    technologies: ["Exim", "Postfix", "Dovecot", "Courier"],
  },
  {
    id: 9,
    icon: <FaDesktop />,
    name: "Control Panels Management",
    technologies: ["cPanel", "Plesk", "Webuzo"],
  },
  {
    id: 10,
    icon: <FaCode />,
    name: "Programming & Scripting",
    technologies: ["PHP", "Python", "Bash Scripting"],
  },
];

const Skills = () => (
  <div id={Section.Skills}>
    {getSectionHeading(Section.Skills)}

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {skills.map((skill) => (
        <div
          key={skill.id}
          className="px-4 py-2 border border-neutral-900/10 dark:border-neutral-50/10 hover:border-neutral-900/30 dark:hover:border-neutral-50/30 rounded flex items-center gap-4 transition-colors duration-700 hover:duration-100"
        >
          <div className="w-5 h-5 text-orange-500"> {/* Set text color to orange */}
            {skill.icon}
          </div>

          <div className="min-w-0 flex-1 flex flex-col">
            <strong className="truncate">{skill.name}</strong>
            <small className="truncate">({skill.technologies.join(", ")})</small>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Skills;
