import React, { useEffect, useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import AboutPage from './AboutPage.tsx';
import LineCount from '../UI/LineCount.tsx';
import Navbar from '../UI/Navbar.tsx';
import ExpertiseSummaryPage from './ExpertiseSummaryPage.tsx';
import ContactPage from './ContactPage.tsx';
import ProjectsPage from './ProjectsPage.tsx';
import NotFoundPage from './NotFoundPage.tsx';
import FileTabsNavbar from '../UI/FileTabsNavbar.tsx';

const HomePage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const minWith = 768;

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowWidth(window.innerWidth);
    });
  }, [windowWidth]);

  return (
    <>
      <LineCount />
      {windowWidth > minWith && <FileTabsNavbar />}
      <Navbar />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route path="/" element={<AboutPage />} />
          <Route path="/expertise" element={<ExpertiseSummaryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/*" element={<NotFoundPage fromPath="/homepage" />} />
        </Route>
      </Routes>
    </>
  );
};

export default HomePage;
