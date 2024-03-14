import React, { useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';

import { AiOutlineMail } from 'react-icons/ai';

import profileImage from '../../assets/images/profile/profile.png';
import homepageDotsImage from '../../assets/images/bg/homepage-dots-img.png';
import '../../styles/pages/AboutPage.scss';

import ExpertiseLinks from '../UI/ExpertiseLinks.tsx';

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
          I excel in collaborative environments, leveraging a robust skill set
          honed through daily interactions with global teams. My experience
          spans diverse tech stacks, including Rails, React, Redux, TypeScript,
          JavaScript, SASS, CSS, HTML, and more. Committed to meeting tight
          deadlines, I am an advocate for teamwork, recognizing its pivotal role
          in driving organizational success. My adaptability, cultivated through
          international living experiences, enables me to seamlessly collaborate
          with diverse teams worldwide.
        </p>

        <ExpertiseLinks />

        <Link
          to="/homepage/contact"
          className="aboutPage__cta"
          title="This link will take you to the contact page."
        >
          <AiOutlineMail size={20} className="mail-icon text-hue-rotate" />
          &nbsp;Let&apos;s collaborate and drive success together. Reach out to
          discuss how we can achieve your goals. ( link )
        </Link>
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
