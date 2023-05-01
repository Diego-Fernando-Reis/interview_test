import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './src/pages/Login';
import AfterLogin from './src/pages/AfterLogin';

function Rotas() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/afterlogin" element={<AfterLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;
