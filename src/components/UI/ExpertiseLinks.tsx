import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/UI/ExpertiseLinks.scss';

const ExpertiseLinks: React.FC = () => (
  <div className="expertise-links">
    <Link
      to="/homepage/expertise"
      className="text-hue-rotate"
      aria-label="navigate to expertise section"
    >
      languages
    </Link>
    <Link
      to="/homepage/expertise"
      className="text-hue-rotate"
      aria-label="navigate to expertise section"
    >
      frameworks
    </Link>
    <Link
      to="/homepage/expertise"
      className="text-hue-rotate"
      aria-label="navigate to expertise section"
    >
      skills
    </Link>
    <a
      href="https://docs.google.com/document/d/1vfOALwpILAh8Jn29zV6aO6jwuGZQwLyYjRb3_YKZfQ0/edit?usp=sharing"
      className="text-hue-rotate"
      aria-label="navigate to Arthur's resume which is hosted on Google Docs"
      target="_blank"
      rel="noreferrer noopener"
    >
      resume
    </a>
  </div>
);

export default ExpertiseLinks;
