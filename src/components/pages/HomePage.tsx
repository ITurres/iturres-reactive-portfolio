import React, { useEffect } from 'react';

import profileImage from '../../assets/images/profile/profile.png';
import homepageDotsImage from '../../assets/images/bg/homepage-dots-img.png';
import '../../styles/pages/HomePage.scss';

const HomePage = () => {
  useEffect(() => {
    const $homepage = document.querySelector<HTMLDivElement>('#homepage');
    if ($homepage) {
      $homepage.classList.add('blend-in-out');
    }
  });

  return (
    <section id="homepage" className="homepage container">
      <div className="homepage__about">
        <h1 className="homepage__about-title text-hue-rotate">
          i&apos;m arthur! your dev
          <span className="emoji">&#128075;</span>
        </h1>
        <p className="homepage__about-p">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Esse,
          suscipit et? Quo facere fugiat deserunt expedita pariatur consequuntur
          quos possimus quidem repellat ipsam sequi, mollitia perspiciatis
          suscipit id ipsa voluptates.
        </p>
      </div>
      <div className="homepage__images">
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

export default HomePage;
