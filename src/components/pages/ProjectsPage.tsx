import React, { useState, useEffect, useCallback } from 'react';

import '../../styles/pages/ProjectsPage.scss';

import projects from '../../db/projects.json';
import SplideCarousel from '../UI/SplideCarousel.tsx';

import getRandomId from '../../utils/getRandomId.ts';
import setPageTitle from '../../utils/setPageTitle.ts';

import involvement from '../../services/involvementAPI/involvementAPI.ts';

const ProjectsPage: React.FC = () => {
  setPageTitle('My projects 😊');

  const [projectsLikes, setProjectsLikes] = useState([{}]);

  const getProjectsLikes = useCallback(async () => {
    try {
      const requestedProjectsLikes = (await involvement.getLikes()) as Array<{}>;

      setProjectsLikes(requestedProjectsLikes);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setProjectsLikes([
        {
          error: true,
          message: error,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    getProjectsLikes();
  }, [getProjectsLikes]);

  return (
    <div className="blend-in-out">
      <main className="projects-page container">
        {Object.values(projects).map((projectGroup) => (
          <SplideCarousel
            key={getRandomId()}
            projectsGroup={projectGroup}
            projectsLikes={projectsLikes}
          />
        ))}
      </main>
    </div>
  );
};

export default ProjectsPage;
