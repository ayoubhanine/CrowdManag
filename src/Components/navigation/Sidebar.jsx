import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice'; // Ajuste le chemin selon ton projet
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role=useSelector((state)=>state.auth.user?.role || state.auth.role)

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="w-62.5 bg-slate-900 text-white p-5 flex flex-col justify-between h-screen border-r border-slate-800">
      {/* Haut de la Sidebar : Logo et Liens */}
      <div>
        <h2 className="text-xl font-bold text-emerald-400 flex items-center gap-2 mb-8">
           Crowdfunder
        </h2>
        
        <nav className="flex flex-col gap-3">
          <Link 
            to="/" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/projects" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            📁 Projects
          </Link>
          {/* ─── L'AFFICHAGE CONDITIONNEL ICI ─── */}
          {role === 'owner' && (
          <Link 
            to="/projects/create" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            ➕ Create Project
          </Link>)}
           {role === 'owner' && ( <Link 
            to="/investisseurs" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            👥 Investisseurs
          </Link>)}
            {role === 'investor' && (<Link 
            to="/wallet" 
            className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-lg text-sm font-medium transition-all"
          >
            👛 Wallet / Solde
          </Link>)}
        </nav>
      </div>

      {/* Bas de la Sidebar : Bouton Logout */}
      <div className="border-t border-slate-800 pt-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all text-left"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;