import React from 'react';
import mp4Video from '../../assets/images/bg/portfolio-access-animation-2-short.mp4';
import webmVideo from '../../assets/images/bg/portfolio-access-animation-2-short.webm';

const AccessPageVideo: React.FC = () => (
  /* eslint-disable jsx-a11y/media-has-caption */
  <video
    playsInline
    id="access-page-video"
    className="accessPage-video"
    width="100%"
  >
    <source src={webmVideo} type="video/webm" />
    <source src={mp4Video} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
  /* eslint-disable jsx-a11y/media-has-caption */
);

export default AccessPageVideo;
