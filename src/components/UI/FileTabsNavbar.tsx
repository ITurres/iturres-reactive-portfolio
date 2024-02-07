import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FaReact } from 'react-icons/fa';

import '../../styles/UI/FileTabsNavbar.scss';

const FileTabsNavbar: React.FC = () => {
  const iconSize = 26;

  const { pathname } = useLocation();

  const paths = useMemo(
    () => ({
      homepage: '/iturres-reactive-portfolio/homepage',
      projects: '/iturres-reactive-portfolio/homepage/projects',
      contact: '/iturres-reactive-portfolio/homepage/contact',
      expertise: '/iturres-reactive-portfolio/homepage/expertise',
    }),
    [],
  );

  return (
    <nav className="file-tabs-navbar">
      <ul>
        <li>
          <Link
            to={paths.homepage}
            className={pathname === paths.homepage ? 'active' : ''}
          >
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="about me page"
            />
            About.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.projects}
            className={pathname === paths.projects ? 'active' : ''}
          >
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="my projects page"
            />
            Projects.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.contact}
            className={pathname === paths.contact ? 'active' : ''}
          >
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="contact page"
            />
            Contact.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.expertise}
            className={pathname === paths.expertise ? 'active' : ''}
          >
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="expertise page"
            />
            Expertise.tsx
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FileTabsNavbar;
