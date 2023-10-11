import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/UI/AnimatedButton.scss';

const AnimatedButton: React.FC = () => (
  <button
    type="button"
    className="animated-button my-btn"
    aria-label="navigates to expertise page"
  >
    <Link
      to="/iturres-reactive-portfolio/homepage/expertise"
      className="text-hue-rotate"
    >
      languages
    </Link>
    <Link
      to="/iturres-reactive-portfolio/homepage/expertise"
      className="text-hue-rotate"
    >
      frameworks
    </Link>
    <Link
      to="/iturres-reactive-portfolio/homepage/expertise"
      className="text-hue-rotate"
    >
      skills
    </Link>
  </button>
);

export default AnimatedButton;
