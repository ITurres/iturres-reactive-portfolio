import React from 'react';

import '../../styles/pages/ProjectsPage.scss';

import projects from '../../db/projects.json';
import SplideCarousel from '../UI/SplideCarousel.tsx';

import getRandomId from '../../utils/getRandomId.ts';

const ProjectsPage: React.FC = () => (
  <div className="blend-in-out">
    <main className="projects-page container">
      {Object.values(projects).map((projectGroup) => (
        <SplideCarousel
          key={getRandomId()}
          projectsGroup={projectGroup}
        />
      ))}
    </main>
  </div>
);

export default ProjectsPage;
