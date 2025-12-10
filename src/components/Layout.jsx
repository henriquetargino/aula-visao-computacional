import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronLeft, Menu } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 relative">
      
      {/* Background: Blueprint Grid "Tech" Theme */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Sidebar Wrapper */}
      <div className={`${isSidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 relative flex-shrink-0 bg-white shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)] z-20`}>
        <div className="h-full border-r border-gray-200 overflow-hidden">
             <Sidebar />
        </div>
        
        {/* Close Button - Attached to Sidebar Edge (Only visible when Open) */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className={`absolute -right-3 top-6 z-50 p-1 bg-white text-slate-400 hover:text-blue-600 rounded-full shadow-md border border-gray-200 transition-colors flex items-center justify-center h-6 w-6 ${!isSidebarOpen && 'hidden'}`}
          title="Recolher Menu"
        >
          <ChevronLeft size={14} strokeWidth={3} />
        </button>
      </div>

      <main className="flex-1 relative overflow-y-auto scroll-smooth z-10">
         <div className="relative w-full h-full"> 
            <Outlet context={{ isSidebarOpen }} />
         </div>
         
         {/* Hamburger Open Button (Only visible when Closed) */}
         {!isSidebarOpen && (
             <button 
                onClick={() => setIsSidebarOpen(true)}
                className="fixed left-6 top-6 z-50 p-2 bg-white/80 backdrop-blur-sm hover:bg-white text-slate-600 hover:text-blue-600 rounded-lg shadow-sm border border-gray-200 transition-all hover:shadow-md group"
                title="Expandir Menu"
             >
                <Menu size={24} />
             </button>
         )}
      </main>
    </div>
  );
};

export default Layout;