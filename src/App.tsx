import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AccessPage from './components/pages/AccessPage.tsx';
import HomePage from './components/pages/HomePage.tsx';

const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/iturres-reactive-portfolio/" element={<AccessPage />} />
      <Route path="/iturres-reactive-portfolio/homepage/*" element={<HomePage />} />
    </Routes>
  </>
);

export default App;
