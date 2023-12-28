// page.tsx

import styles from "./page.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaPaperclip,
  FaRuler,
  FaTwitter,
} from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";

export default function Page() {
  const icons = [
    { name: "Linkedin", css: { transform: "-10deg", marginTop: "1.5rem" } },
    { name: "Twitter", css: { transform: "-5deg", marginTop: "8px" } },
    { name: "Project", css: { transform: "-2deg", marginTop: "0px" } },
    { name: "Mail", css: { transform: "2deg", marginTop: "0px" } },
    { name: "Resume", css: { transform: "5deg", marginTop: "8px" } },
    { name: "Github", css: { transform: "10deg", marginTop: "1.5rem" } },
  ];

  const renderIcon = (name: any) => {
    switch (name.toLowerCase()) {
      case "linkedin":
        return <FaLinkedin />;
      case "twitter":
        return <FaTwitter />;
      case "project":
        return <FaRuler />;
      case "resume":
        return <FaPaperclip />;
      case "mail":
        return <TbMailFilled />;
      case "github":
        return <FaGithub />;
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.home_title}>
        Aryan is a Software Engineer in Bangalore, Karnataka
      </div>
      <div className={styles.home_icons_wrapper}>
        {icons.map((item, index) => (
          <div
            key={index}
            className={`${styles.home_image_icon} ${styles.tooltip}`}
            style={{
              transform: `rotate(${item.css.transform})`,
              top: `${item.css.marginTop}`,
            }}
          >
            {renderIcon(item.name)}
            <span className={styles.tooltiptext}>{item.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
