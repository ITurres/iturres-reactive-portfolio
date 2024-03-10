import React, {
  useEffect,
  useState,
  CSSProperties,
  useRef,
} from 'react';

import { Link } from 'react-router-dom';

import { SiAboutdotme } from 'react-icons/si';
import { CgMenuMotion } from 'react-icons/cg';
import { AiFillGithub, AiOutlineMail } from 'react-icons/ai';
import { BiLogoLinkedin, BiExit } from 'react-icons/bi';
import { FaProjectDiagram, FaAngellist } from 'react-icons/fa';
import { LuSquareStack } from 'react-icons/lu';

import '../../styles/UI/Navbar.scss';

const Navbar: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const minWith = 768;

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });

    return () => {
      window.removeEventListener('resize', () => {
        setWindowWidth(window.innerWidth);
      });
    };
  }, [windowWidth]);

  const $menu = useRef<HTMLElement>(null);
  const iconSize = 30;

  const toggleMenu = () => {
    $menu.current?.classList.toggle('active');
  };

  return (
    <nav
      ref={$menu}
      className="menu-navbar"
      aria-label="Menu"
      role="navigation"
    >
      {/* ! SHOW ONLY ON MOBILE */}
      <button
        className="toggle-menu my-btn hover-text"
        type="button"
        onClick={toggleMenu}
        title="Links"
        aria-label="Menu button"
      >
        <CgMenuMotion size={iconSize} className="text-hue-rotate" />
      </button>
      <ul>
        <li style={{ '--elem': 1 } as CSSProperties}>
          <a
            href="https://github.com/ITurres"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Author's Github Profile"
          >
            <AiFillGithub
              size={iconSize}
              className="text-hue-rotate"
              title="Arthur's Github"
            />
          </a>
        </li>
        <li style={{ '--elem': 2 } as CSSProperties}>
          <a
            href="https://www.linkedin.com/in/arturoemanuelguerraiturres/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Author's Linkedin Profile"
          >
            <BiLogoLinkedin
              size={iconSize}
              className="text-hue-rotate"
              title="Arthur's Linkedin"
            />
          </a>
        </li>
        <li style={{ '--elem': 3 } as CSSProperties}>
          <a
            href="https://wellfound.com/u/arturo-arthur-emanuel-guerra-iturres"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Author's Wellfound Profile"
          >
            <FaAngellist
              size={iconSize}
              className="text-hue-rotate"
              title="Arthur's Wellfound"
            />
          </a>
        </li>
        <li style={{ '--elem': 4 } as CSSProperties}>
          <Link to="/" aria-label="Exit to the Access page">
            <BiExit
              size={iconSize}
              className="text-hue-rotate"
              title="Exit to Access Page"
            />
          </Link>
        </li>

        {/* ! SHOW ONLY ON MOBILE */}
        {windowWidth < minWith && (
          <>
            <li style={{ '--elem': 5 } as CSSProperties}>
              <Link
                to="/homepage"
                aria-label="About Me Page - learn more about Arthur"
              >
                <SiAboutdotme
                  size={iconSize}
                  className="text-hue-rotate"
                  title="About Arthur"
                />
              </Link>
            </li>
            <li style={{ '--elem': 6 } as CSSProperties}>
              <Link
                to="/homepage/projects"
                aria-label="Arthur's Projects Page - learn more about Arthur's projects"
              >
                <FaProjectDiagram
                  size={iconSize}
                  className="text-hue-rotate"
                  title="Arthur's Projects"
                />
              </Link>
            </li>
            <li style={{ '--elem': 7 } as CSSProperties}>
              <Link
                to="/homepage/contact"
                aria-label="Contact me Page - contact Arthur"
              >
                <AiOutlineMail
                  size={iconSize}
                  className="text-hue-rotate"
                  title="Contact Arthur!"
                />
              </Link>
            </li>
            <li style={{ '--elem': 8 } as CSSProperties}>
              <Link
                to="/homepage/expertise"
                aria-label="Expertise Page - learn more about the author's expertise"
              >
                <LuSquareStack
                  size={iconSize}
                  className="text-hue-rotate"
                  title="Arthur's Expertise"
                />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
