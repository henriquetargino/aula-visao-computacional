import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FlaskConical } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation(); // Pega a URL atual para saber onde estamos

  // Componente interno para cada item do menu
  const NavItem = ({ to, icon: Icon, label }) => {
    // CORREÇÃO AQUI: Definimos o que é "isActive" comparando a URL atual com o link do botão
    const isActive = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
          isActive
            ? 'bg-blue-600 text-white' // Cor quando está ativo
            : 'text-slate-400 hover:bg-slate-800 hover:text-white' // Cor normal
        }`}
      >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          VisionLab Pro
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/" icon={LayoutDashboard} label="Dashboard" />
        <NavItem to="/lab" icon={FlaskConical} label="Laboratório" />
      </nav>

      <div className="p-4 border-t border-slate-800">
        <p className="text-xs text-slate-500 text-center">
          v1.0.0 Alpha
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;