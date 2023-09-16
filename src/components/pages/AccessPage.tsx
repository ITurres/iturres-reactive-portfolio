import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/AccessPage.scss';
import '../../styles/animations/button-slide.scss';
import '../../styles/animations/shrink-and-center.scss';
import AccessPageVideo from '../animations/AccessPageVideo.tsx';

const AccessPage = () => {
  const navigate = useNavigate();

  const handleAccess = () => {
    const $accessPageMain = document.querySelector<HTMLElement>('.access-page-main');
    if ($accessPageMain) {
      $accessPageMain.classList.remove('text-hue-rotate');
      $accessPageMain.classList.add('shrink-and-center');
    }

    const $videoElement = document.querySelector<HTMLVideoElement>('#access-page-video');
    if ($videoElement) {
      setTimeout(() => {
        $videoElement.style.display = 'block';
        $videoElement.play();
      }, 200);

      $videoElement.addEventListener('ended', () => navigate('/homepage'));
    }
  };

  return (
    <div className="blend-in-out">
      <main className="access-page-main text-hue-rotate">
        <span>Arthur Iturres</span>
        <h1>Delivering The Future</h1>
        <button
          type="button"
          className="my-btn color2 slide-up"
          onClick={handleAccess}
        >
          Access
        </button>
      </main>
      <AccessPageVideo />
    </div>
  );
};

export default AccessPage;
