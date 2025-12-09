import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Lab from './pages/Lab';
import { PyodideProvider } from './context/PyodideContext';

function App() {
  return (
    <PyodideProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="lab" element={<Lab />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PyodideProvider>
  );
}

export default App;