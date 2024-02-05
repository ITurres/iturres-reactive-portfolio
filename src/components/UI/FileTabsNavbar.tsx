import React from 'react';
import { Link } from 'react-router-dom';

import { FaReact } from 'react-icons/fa';

import '../../styles/UI/FileTabsNavbar.scss';

const FileTabsNavbar: React.FC = () => {
  const iconSize = 26;

  return (
    <nav className="file-tabs-navbar">
      <ul>
        <li>
          <Link to="/iturres-reactive-portfolio/homepage">
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="about me page"
            />
            About.tsx
          </Link>
        </li>
        <li>
          <Link to="/iturres-reactive-portfolio/homepage/projects">
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="my projects page"
            />
            Projects.tsx
          </Link>
        </li>
        <li>
          <Link to="/iturres-reactive-portfolio/homepage/contact">
            <FaReact
              size={iconSize}
              className="tech-logo"
              title="contact page"
            />
            Contact.tsx
          </Link>
        </li>
        <li>
          <Link to="/iturres-reactive-portfolio/homepage/expertise">
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
