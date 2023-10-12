import React, { useEffect, useRef } from 'react';

import profileImage from '../../assets/images/profile/profile.png';
import homepageDotsImage from '../../assets/images/bg/homepage-dots-img.png';
import '../../styles/pages/AboutPage.scss';

import AnimatedButton from '../UI/AnimatedButton.tsx';

import setPageTitle from '../../utils/setPageTitle.ts';

const AboutPage: React.FC = () => {
  const $aboutPage = useRef<HTMLElement>(null);

  setPageTitle('About me 🙋‍♂️');

  useEffect(() => {
    if ($aboutPage.current) {
      $aboutPage.current.style.display = 'flex'; // ?overrides the {display: none} on 'aboutPage.scss'. This is to prevent the aboutPage from showing before animation is applied.
      $aboutPage.current.classList.add('blend-in-out');
    }
  });

  return (
    <main ref={$aboutPage} className="aboutPage container">
      <div className="aboutPage__about">
        <h1 className="aboutPage__about-title text-hue-rotate">
          i&apos;m arthur! your dev
          <span className="emoji">&#128075;</span>
        </h1>
        <p className="aboutPage__about-p">
          I excel in remote collaboration, driven by a robust skill set
          developed through daily coding with global teams. I&apos;m adept at
          meeting tight deadlines and experienced in diverse tech stacks like
          React, Redux, TypeScript, JavaScript, SASS, CSS, HTML and more. My
          adaptability, honed by international living experiences, enables me to
          collaborate with diverse teams across the world seamlessly.
        </p>
        <AnimatedButton />
      </div>
      <div className="aboutPage__images">
        <img
          src={homepageDotsImage}
          alt="an abstract dotted figure"
          className="image-layer figure rotate-hue-rotate"
        />
        <img
          src={profileImage}
          alt="my profile"
          className="image-layer profile"
        />
      </div>
    </main>
  );
};

export default AboutPage;
