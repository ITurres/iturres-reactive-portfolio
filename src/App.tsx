import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AccessPage from './components/pages/AccessPage.tsx';
import HomePage from './components/pages/HomePage.tsx';

const App: React.FC = () => (
  <>
    <Routes>
      <Route path="/" element={<AccessPage />} />
      <Route path="homepage/*" element={<HomePage />} />
    </Routes>
  </>
);

export default App;
