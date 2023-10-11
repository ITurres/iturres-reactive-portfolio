import React from 'react';

import { SplideSlide } from '@splidejs/react-splide';

import LikeButton from './LikeButton.tsx';

/* eslint-disable no-undef */
interface SplideCarouselSlideProps {
  projectData: {
    id: string;
    data: {
      img: {
        src: string;
        alt: string;
      };
      projectName: {
        name1: string;
        name2: string;
      };
      description: string[];
      stack: string[];
      liveVersionHref: string;
      sourceCodeHref: string;
    };
  };
}

const SplideCarouselSlide: React.FC<SplideCarouselSlideProps> = ({
  projectData,
}) => (
  <SplideSlide>
    <div className="splide__slide__container">
      <img
        className="splide__slide__img"
        src={`${process.env.PUBLIC_URL}/projects-preview/${projectData.data.img.src}`}
        alt={projectData.data.img.alt}
      />
      <div className="splide__slide__overlay">
        <div className="splide__slide__overlay__text">
          <h2 className="text-hue-rotate">
            {projectData.data.projectName.name1}
            <br />
            {projectData.data.projectName.name2}
          </h2>
          <div className="d-flex justify-content-between align-items-start flex-wrap">
            <details>
              <summary>Description</summary>
              <p>{projectData.data.description.join(' ')}</p>
            </details>
            <LikeButton itemId={projectData.id} />
          </div>
          <div className="splide__slide__overlay__text__stack text-hue-rotate">
            {projectData.data.stack.map((stackItem) => (
              <span key={stackItem}>
                {stackItem}
                &nbsp;
              </span>
            ))}
          </div>
          <div className="splide__slide__overlay__text__links">
            <a
              href={projectData.data.liveVersionHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Live version
            </a>
            <a
              href={projectData.data.sourceCodeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Source code
            </a>
          </div>
        </div>
      </div>
    </div>
  </SplideSlide>
);

export default SplideCarouselSlide;
