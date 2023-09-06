import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const $homepage = document.querySelector<HTMLDivElement>('#homepage');
    if ($homepage) {
      $homepage.classList.add('blend-in-out');
    }
  });

  return (
    <div id="homepage" className="homepage">
      <h1>Home Page</h1>
    </div>
  );
};

export default HomePage;
