import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/pages/AccessPage.scss';
import '../../styles/animations/button-slide.scss';

const AccessPage = () => (
  <main>
    <span>Arthur Iturres</span>
    <h1>Delivering The Future</h1>
    <Link to="/homepage">
      <button type="button" className="my-btn color2 slide-up">
        Access
      </button>
    </Link>
  </main>
);

export default AccessPage;
