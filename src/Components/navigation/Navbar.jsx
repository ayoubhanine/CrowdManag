import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  // On récupère les infos de l'utilisateur connecté depuis le state global Redux
  const { user } = useSelector((state) => state.auth);

  // Fonction rapide pour afficher un rôle propre à l'écran
  const formatRole = (role) => {
    if (role === 'owner') return 'Porteur de Projet';
    if (role === 'investor') return 'Investisseur';
    if (role === 'admin') return 'Administrateur';
    return role;
  };

  return (
    <div className="h-15 border-b border-slate-200 flex items-center justify-between px-5 bg-white">
      {/* Gauche : Fil d'ariane / Position */}
      <div className="text-sm font-medium text-slate-500">
        Workspace / <span className="text-slate-800 font-semibold">Dashboard</span>
      </div>

      {/* Droite : Profil de l'utilisateur connecté */}
      <div className="flex items-center gap-3">
        {/* Si l'utilisateur est un investisseur, on peut aussi afficher son solde (balance) */}
        {user?.role === 'investor' && (
          <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-1 rounded-full border border-emerald-200 mr-2">
            💰 {user.balance} €
          </span>
        )}

        <div className="text-sm font-medium text-slate-700 flex items-center gap-2">
          {/* Nom de l'utilisateur dynamique (ou "Invité" s'il n'est pas encore chargé) */}
          <span className="font-semibold text-slate-900">
            {user?.name || 'Utilisateur'}
          </span>
          
          {/* Badge de rôle dynamique */}
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
            {user ? formatRole(user.role) : 'Chargement...'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;