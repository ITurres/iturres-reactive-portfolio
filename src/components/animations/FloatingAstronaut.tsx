import React, { CSSProperties } from 'react';

import floatingAstronaut from '../../assets/images/gif/floatingAstronaut.gif';

import '../../styles/animations/FloatingAstronaut.scss';

/* eslint-disable no-undef */
interface FloatingAstronautProps {
  animationSpeed: number;
  maxWidth: number;
  move?: {
    fromTop: number;
    toTop: number;
    fromLeft: number;
    fromRight: number;
    toLeft: number;
    toRight: number;
  };
  scale?: {
    fromScale: number | string;
    toScale: number | string;
  };
  rotation?: {
    rotate: number;
  };
}

const FloatingAstronaut: React.FC<FloatingAstronautProps> = ({
  animationSpeed,
  maxWidth,
  move,
  scale,
  rotation,
}) => (
  <img
    src={floatingAstronaut}
    alt=""
    className="floating-astronaut"
    aria-hidden="true"
    style={
      {
        '--maxWidth': `${maxWidth}px`,
        '--animationSpeed': `${animationSpeed}s`,
        '--fromLeft': `${move?.fromLeft}px`,
        '--fromRight': `${move?.fromRight}px`,
        '--toLeft': `${move?.toLeft}%`,
        '--toRight': `${move?.toRight}%`,
        '--fromTop': `${move?.fromTop}px`,
        '--toTop': `${move?.toTop}px`,
        '--fromScale': `${scale?.fromScale}`,
        '--toScale': `${scale?.toScale}`,
        '--rotate': `${rotation?.rotate}deg`,
      } as CSSProperties
    }
  />
);

FloatingAstronaut.defaultProps = {
  move: {
    fromTop: 0,
    toTop: 0,
    fromLeft: 0,
    fromRight: 0,
    toLeft: 0,
    toRight: 0,
  },
  scale: {
    fromScale: 'unset',
    toScale: 'unset',
  },
  rotation: {
    rotate: 0,
  },
};

export default FloatingAstronaut;
