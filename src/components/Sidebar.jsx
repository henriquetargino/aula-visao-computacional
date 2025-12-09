import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FlaskConical } from 'lucide-react';

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

  return (
    <aside className="w-72 bg-white flex flex-col h-full">
      <div className="p-8 border-b border-gray-100/50">
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
          Aula<span className="text-blue-600">.</span>HT
        </h1>
        <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Henrique Targino</p>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        <NavItem to="/" icon={LayoutDashboard} label="Apresentação" />
        <NavItem to="/lab" icon={FlaskConical} label="Laboratório OpenCV" />
      </nav>
    </aside>
  );
};

export default Sidebar;