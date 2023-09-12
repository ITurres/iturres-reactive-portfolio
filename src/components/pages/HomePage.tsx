import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import AboutPage from './AboutPage.tsx';
import LineCount from '../UI/LineCount.tsx';
import Navbar from '../UI/Navbar.tsx';

const HomePage: React.FC = () => (
  <>
    <LineCount />
    <Navbar />
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<AboutPage />} />
      </Route>
    </Routes>
  </>
);

export default HomePage;
