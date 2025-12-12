import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FlaskConical, ScanEye, Linkedin, Github } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const NavItem = ({ to, icon: Icon, label }) => {
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium border ${
          isActive
            ? 'bg-blue-50 border-blue-100 text-blue-700 shadow-sm' 
            : 'border-transparent text-slate-600 hover:bg-gray-50 hover:text-slate-900'
        }`}
      >
        <Icon size={20} />
        <span>{label}</span>
      </Link>
    );
  };

  /* Custom Discord Logo because Lucide doesn't have the official brand icon */
  const DiscordLogo = ({ size = 24, className }) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="-10 -10 148 117" 
      fill="none"
      stroke="currentColor"
      strokeWidth="10" 
      strokeLinecap="round"
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.09,105.09,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.89,105.89,0,0,0,126.6,80.22c2.36-24.44-2.54-46.31-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
    </svg>
  );

  const SocialLink = ({ href, icon: Icon, isCustom }) => (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-slate-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg flex items-center justify-center h-12 w-12"
    >
      {isCustom ? <Icon size={28} /> : <Icon size={28} />}
    </a>
  );

  return (
    <aside className="w-72 bg-white flex flex-col h-full border-r border-gray-100">
      <div className="p-8 border-b border-gray-100/50">
        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 whitespace-nowrap">
          <ScanEye className="text-blue-600" size={28} />
          <span>Computer Vision</span>
        </h1>
        <p className="text-xs text-slate-400 mt-2 uppercase tracking-wider font-semibold pl-9">Henrique Targino</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <NavItem to="/" icon={LayoutDashboard} label="Apresentação" />
        <NavItem to="/lab" icon={FlaskConical} label="Laboratório" />
      </nav>

      <div className="p-6 border-t border-gray-100/50">
        <div className="flex justify-center gap-6">
          <SocialLink href="https://www.linkedin.com/in/henriquetargino" icon={Linkedin} />
          <SocialLink href="https://github.com/henriquetargino" icon={Github} />
          <SocialLink href="https://discord.com/users/henrique_targino" icon={DiscordLogo} isCustom />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;