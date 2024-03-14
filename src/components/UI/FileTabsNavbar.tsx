import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FaReact } from 'react-icons/fa';

import '../../styles/UI/FileTabsNavbar.scss';

const FileTabsNavbar: React.FC = () => {
  const iconSize = 26;

  const { pathname } = useLocation();

  const paths = useMemo(
    () => ({
      homepage: '/homepage',
      projects: '/homepage/projects',
      contact: '/homepage/contact',
      expertise: '/homepage/expertise',
    }),
    [],
  );

  return (
    <nav
      className="file-tabs-navbar"
      aria-label="Desktop File Tabs"
      role="navigation"
    >
      <ul>
        <li>
          <Link
            to={paths.homepage}
            aria-label="About Me Page - learn more about Arthur"
            className={pathname === paths.homepage ? 'active' : ''}
            title="About Arthur"
          >
            <FaReact size={iconSize} className="tech-logo" />
            About.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.projects}
            aria-label="My Projects Page - learn more about Arthur's projects"
            className={pathname === paths.projects ? 'active' : ''}
            title="Arthur's Projects Page"
          >
            <FaReact size={iconSize} className="tech-logo" />
            Projects.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.contact}
            aria-label="Contact Me Page - contact Arthur"
            className={pathname === paths.contact ? 'active' : ''}
            title="Arthur's Contact Page"
          >
            <FaReact size={iconSize} className="tech-logo" />
            Contact.tsx
          </Link>
        </li>
        <li>
          <Link
            to={paths.expertise}
            aria-label="My Expertise Page - learn more about Arthur's expertise"
            className={pathname === paths.expertise ? 'active' : ''}
            title="Arthur's Expertise Page"
          >
            <FaReact size={iconSize} className="tech-logo" />
            Expertise.tsx
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default FileTabsNavbar;
