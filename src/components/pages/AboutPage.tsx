import React, { useEffect } from 'react';

import profileImage from '../../assets/images/profile/profile.png';
import homepageDotsImage from '../../assets/images/bg/homepage-dots-img.png';
import '../../styles/pages/AboutPage.scss';

const AboutPage: React.FC = () => {
  useEffect(() => {
    const $aboutPage = document.querySelector<HTMLDivElement>('#aboutPage');
    if ($aboutPage) {
      $aboutPage.style.display = 'flex'; // ?overrides the {display: none} on 'aboutPage.scss'. This is to prevent the aboutPage from showing before animation is applied.
      $aboutPage.classList.add('blend-in-out');
    }
  });

  return (
    <section id="aboutPage" className="aboutPage container">
      <div className="aboutPage__about">
        <h1 className="aboutPage__about-title text-hue-rotate">
          i&apos;m arthur! your dev
          <span className="emoji">&#128075;</span>
        </h1>
        <p className="aboutPage__about-p">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse,
          suscipit et? Quo facere fugiat deserunt expedita pariatur consequuntur
          quos possimus quidem repellat ipsam sequi, mollitia perspiciatis
          suscipit id ipsa voluptates.
        </p>
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
    </section>
  );
};

export default AboutPage;
