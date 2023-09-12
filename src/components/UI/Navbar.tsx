import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import { SiAboutdotme } from 'react-icons/si';
import { CgMenuMotion } from 'react-icons/cg';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { BiLogoLinkedin, BiExit } from 'react-icons/bi';
import { FaProjectDiagram } from 'react-icons/fa';

import '../../styles/UI/Navbar.scss';

const Navbar: React.FC = () => {
  const iconSize = 30;

  const toggleMenu = () => {
    const menu = document.querySelector<HTMLElement>('#menu');
    menu?.classList.toggle('active');
  };

  return (
    <nav id="menu" className="menu-navbar">
      <button
        className="toggle-menu my-btn hover-text"
        type="button"
        onClick={toggleMenu}
        title="Menu"
      >
        <CgMenuMotion size={iconSize} className="text-hue-rotate" />
      </button>
      <ul>
        <li style={{ '--elem': 0 } as CSSProperties}>
          <Link to="/homepage">
            <SiAboutdotme
              size={iconSize}
              className="text-hue-rotate"
              title="About me"
            />
          </Link>
        </li>
        <li style={{ '--elem': 1 } as CSSProperties}>
          <a
            href="https://github.com/ITurres"
            target="_blank"
            rel="noreferrer noopener"
          >
            <AiFillGithub
              size={iconSize}
              className="text-hue-rotate"
              title="My Github"
            />
          </a>
        </li>
        <li style={{ '--elem': 2 } as CSSProperties}>
          <a
            href="https://www.linkedin.com/in/arturoemanuelguerraiturres/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <BiLogoLinkedin
              size={iconSize}
              className="text-hue-rotate"
              title="My Linkedin"
            />
          </a>
        </li>
        <li style={{ '--elem': 3 } as CSSProperties}>
          <Link to="/homepage">
            <FaProjectDiagram
              size={iconSize}
              className="text-hue-rotate"
              title="My Projects"
            />
          </Link>
        </li>
        <li style={{ '--elem': 4 } as CSSProperties}>
          <Link to="/homepage">
            <AiOutlineMail
              size={iconSize}
              className="text-hue-rotate"
              title="Contact me!"
            />
          </Link>
        </li>
        <li style={{ '--elem': 5 } as CSSProperties}>
          <Link to="/">
            <BiExit size={iconSize} className="text-hue-rotate" title="Exit" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;