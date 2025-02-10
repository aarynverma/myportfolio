// page.tsx
"use client";
import React from "react";
import styles from "./page.module.css";
import {
  FaGithub,
  FaLinkedin,
  FaPaperclip,
  FaRuler,
  FaTwitter,
} from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { FiExternalLink } from "react-icons/fi";

export default function Page() {
  const [isRotating, setRotating] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  React.useEffect(() => {
    if (audioRef.current) {
      if (isRotating) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isRotating]);

  const handleCDClick = () => {
    setRotating(!isRotating);
  };

  const handleCDDoubleClick = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
  };

  const icons = [
    {
      name: "Linkedin",
      css: { transform: "-8deg", marginTop: "1rem" },
      link: "https://www.linkedin.com/in/aryan-verma-software-engineer/",
    },
    // { name: "Twitter", css: { transform: "-5deg", marginTop: "8px" }, link:"https://www.linkedin.com/in/aryan-verma-software-engineer/" },
    {
      name: "Project",
      css: { transform: "-5deg", marginTop: "5px" },
      link: "/projects",
    },
    {
      name: "Reach Out",
      css: { transform: "0deg", marginTop: "0px" },
      link: "mailto:aryn1776@gmail.com",
    },
    {
      name: "Resume",
      css: { transform: "5deg", marginTop: "5px" },
      link: "https://drive.google.com/file/d/1fnUgtw03Iw3tLs-JM_lXdm_KtJIvpbye/view?usp=drive_link",
    },
    {
      name: "Github",
      css: { transform: "8deg", marginTop: "1rem" },
      link: "https://github.com/aarynverma",
    },
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
      case "reach out":
        return <TbMailFilled />;
      case "github":
        return <FaGithub />;
      default:
        return null;
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.home_title}>
        Aryan is a Software&nbsp;Engineer in <br /> Bangalore, Karnataka
      </h1>
      <div className={styles.home_icons_wrapper}>
        {icons.map((item, index) => (
          <a key={index} href={`${item.link}`} target={`${item.link === "/projects" ? "" : "_blank"}`} rel="noreferrer">
            <div
              className={`${styles.home_image_icon} ${styles.tooltip}`}
              style={{
                transform: `rotate(${item.css.transform}) scale(1)`,
                top: `${item.css.marginTop}`,
              }}
            >
              <div className={styles.iconWrapper}>
                {renderIcon(item.name)}
                <span className={styles.tooltiptext}>
                  {item.name}&nbsp;
                  <FiExternalLink />
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
      <span className={`${styles.memoji_wrapper}`}>
        <img src="/assets/memoji.png" alt="aryan" className={styles.memoji} />
      </span>
      <h1
        color="light"
        className={`${styles.logo} ${isRotating ? styles.rotating : ""}`}
        onClick={handleCDClick}
        onDoubleClick={() => {
          handleCDDoubleClick();
        }}
      >
        AV
      </h1>
      <span className={styles.clickme_wrapper}>
      {!isRotating && <p className={styles.clickme}>Click Me</p>}
      </span>
      <audio ref={audioRef}>
        <source src="/assets/music.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <div className={styles.home_footer}>
        <span className={styles.home_footer_title}>CURRENTLY</span>
        <p className={styles.home_footer_value}>
          Software Engineer at Augmento Labs Pvt. Ltd.
        </p>
      </div>
    </main>
  );
}
