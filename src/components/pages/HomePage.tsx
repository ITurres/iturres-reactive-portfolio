import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import AboutPage from './AboutPage.tsx';
import LineCount from '../UI/LineCount.tsx';

const HomePage: React.FC = () => (
  <>
    <LineCount />
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route path="/" element={<AboutPage />} />
      </Route>
    </Routes>
  </>
);

export default HomePage;
