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
    <a
      href="https://docs.google.com/document/d/1vfOALwpILAh8Jn29zV6aO6jwuGZQwLyYjRb3_YKZfQ0/edit?usp=sharing"
      className="text-hue-rotate"
      target="_blank"
      rel="noreferrer noopener"
    >
      resume
    </a>
  </button>
);

export default AnimatedButton;
