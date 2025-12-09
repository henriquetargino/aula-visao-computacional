import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-[#0d1117] text-white">
      <Sidebar />
      <main className="flex-1 relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none fixed"></div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;