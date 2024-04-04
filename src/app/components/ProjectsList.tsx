// ProjectList.tsx
import React from 'react';
import { Project } from '../utils/projects';
import styles from './ProjectList.module.css';

interface ProjectListProps {
  projects: Project[];
  tagColors: string[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, tagColors }) => {
  // Function to determine the contrast color based on luminance
  // const getContrastColor = (hexColor: string) => {
  //   // Convert hex color to RGB
  //   const rgbColor = parseInt(hexColor.replace('#', ''), 16);
  //   const r = (rgbColor >> 16) & 0xff;
  //   const g = (rgbColor >> 8) & 0xff;
  //   const b = rgbColor & 0xff;
  //   // Calculate luminance
  //   const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  //   // Return white for dark backgrounds and black for light backgrounds
  //   return luminance > 0.5 ? '#000000' : '#ffffff';
  // };

  const generateLightOpacityColor = (color: string, opacity: number) => {
    const rgb = color.match(/\w\w/g)?.map((hex) => parseInt(hex, 16));
    if (!rgb) return color; // Return the original color if parsing fails
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
  };

  return (
    <div className={styles.projectListWrapper}>
      {projects.map((project, projectIndex) => (
        <div className={styles.projectList} key={project.id}>
          <a href={project.deployedUrl} target="_blank">
            <div className={styles.projectListCard}>
              <iframe
                src={project.deployedUrl}
                width="100%"
                height="250px"
                frameBorder="0"
                scrolling="no"
                style={{
                  pointerEvents: "none",
                  borderRadius: "10px 10px 0px 0px",
                }}
              />
              <div className={styles.projectListFooter}>
                <span className={styles.projectListHeading}>
                  {project.name}
                </span>
                <span className={styles.projectListDescription}>
                  {project.description}
                </span>
                <div className={styles.tags}>
                  {project.tags.map((tag, tagIndex) => {
                    const backgroundColor = tagColors[(projectIndex * project.tags.length + tagIndex) % tagColors.length];
                    const lightOpacityColor = generateLightOpacityColor(backgroundColor, 0.5); // Change opacity value as needed
                    // const textColor = getContrastColor(backgroundColor);
                    return (
                      <span
                        key={tagIndex}
                        className={styles.tag}
                        style={{ backgroundColor: lightOpacityColor}}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
