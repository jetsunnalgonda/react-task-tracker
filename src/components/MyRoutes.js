import React from 'react';
import { Route, Routes } from 'react-router-dom';
import About from './About';

const MyRoutes = () => {
  return (
    <Routes>
      {/* <Route path='/' element={<Dashboard />} /> */}
      <Route path='/about' element={<About />} />
    </Routes>
  );
}

export default MyRoutes;