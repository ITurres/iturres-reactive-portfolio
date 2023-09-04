import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AccessPage from './components/pages/AccessPage.tsx';

const App = () => (
  <>
    <Routes>
      <Route path="/" element={<AccessPage />} />
    </Routes>
  </>
);

export default App;
