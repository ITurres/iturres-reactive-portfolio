import React from 'react';
import { Link } from 'react-router-dom';

import FloatingAstronaut from '../animations/FloatingAstronaut.tsx';

import '../../styles/pages/NotFoundPage.scss';

type NotFoundPageProps = {
  fromPath: string;
};

const AstronautStyleProps = {
  animationSpeed: 45,
  maxWidth: 50,
  move: {
    fromTop: 200,
    toTop: 270,
    fromLeft: -50,
    toLeft: 100,
    fromRight: 0,
    toRight: 0,
  },
  rotation: {
    rotate: -130,
  },
};

const NotFoundPage: React.FC<NotFoundPageProps> = ({ fromPath }) => {
  const isWildCardAtAccessPage = fromPath === '/';

  const pathTo = isWildCardAtAccessPage
    ? '/iturres-reactive-portfolio/'
    : '/iturres-reactive-portfolio/homepage';

  return (
    <main className="not-found-page">
      <FloatingAstronaut
        animationSpeed={AstronautStyleProps.animationSpeed}
        maxWidth={AstronautStyleProps.maxWidth}
        move={AstronautStyleProps.move}
        rotation={AstronautStyleProps.rotation}
      />

      <header>
        <h2 className="text-hue-rotate">
          <span>&#128640;</span>
          &nbsp; Oops! It looks like you&apos;ve drifted off course! &nbsp;
          <span>&#127756;</span>
        </h2>
        <p>
          Houston, we have a problem... The page you&apos;re searching for seems
          to have floated away into the cosmic abyss. Our astronauts are out
          there on a mission to find it, but in the meantime, why not explore
          some of the other stellar destinations on the portfolio?
        </p>
        <Link
          to={pathTo}
          rel="noreferrer noopener"
          className="my-btn not-found-page-btn text-hue-rotate static-shadow"
        >
          {isWildCardAtAccessPage
            ? 'Go back to the Access Page'
            : 'Go back to the Home Page'}
        </Link>
      </header>
    </main>
  );
};

export default NotFoundPage;
