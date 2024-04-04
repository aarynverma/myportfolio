import React from "react";
import styles from "./page.module.css";
import ProjectList from "../components/ProjectsList";
import { projects } from "../utils/projects";
import { IoIosArrowBack } from "react-icons/io";
import { generateRandomColors } from "../utils/colorsGenerator";

const ProjectsPage = () => {
  const tagColors = generateRandomColors(5); 
  return (
    <div>
      <div className={styles.projects_wapper}>
        <div className={styles.projects_header}>
          <h1 className={styles.projects_title}>
            {" "}
            <a href="/" className={styles.back}>
              <IoIosArrowBack />
            </a>
            Projects
          </h1>
          <hr className={styles.hr_lines} />
          <div className={styles.projects_description_cards}>
            <ProjectList projects={projects} tagColors={tagColors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
