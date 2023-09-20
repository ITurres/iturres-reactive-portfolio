import React, { useState, useEffect } from 'react';

import Drone from '../animations/Drone.tsx';

const ContactPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const laptopWidth = 1366;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  return <div>{windowWidth >= laptopWidth ? <Drone /> : null}</div>;
};

export default ContactPage;
