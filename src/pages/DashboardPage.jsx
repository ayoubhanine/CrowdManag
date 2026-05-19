import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardData } from '../store/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // On récupère les données calculées depuis le store Redux
  const { kpis, projects, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 font-medium">
        ⏳ Chargement des statistiques en cours...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm font-medium">
        ⚠️ {error}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ----------------------------------------------------
          SECTION 1 : LES KPIS (HAUT DE PAGE)
         ---------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        {/* KPI 1 : Total Projets */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Projets</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-900">{kpis.totalProjects}</span>
            <span className="text-xs font-medium text-slate-500">créés</span>
          </div>
        </div>

        {/* KPI 2 : Projets Ouverts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projets Ouverts</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-emerald-600">{kpis.openProjects}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">Actifs</span>
          </div>
        </div>

        {/* KPI 3 : Projets Fermés */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Projets Fermés</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-3xl font-bold text-slate-500">{kpis.closedProjects}</span>
            <span className="text-xs font-medium text-slate-400">atteints</span>
          </div>
        </div>

        {/* KPI 4 : Total Levé */}
        <div className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm bg-linear-to-br from-white to-emerald-50/20 flex flex-col justify-between">
          <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Capital Total Levé</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-black text-slate-900">{kpis.totalRaised}</span>
            <span className="text-lg font-bold text-slate-900">€</span>
          </div>
        </div>

      </div>

      {/* ----------------------------------------------------
          SECTION 2 : TABLEAU DES PROJETS RÉCENTS
         ---------------------------------------------------- */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-lg">Projets récents</h3>
          <span className="text-xs font-medium text-slate-400">{projects.length} listés</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 text-slate-400 text-xs font-semibold uppercase tracking-wider border-b border-slate-100">
                <th className="p-4 pl-6">Titre du projet</th>
                <th className="p-4">Statut</th>
                <th className="p-4">Capital Cible</th>
                <th className="p-4">Investi</th>
                <th className="p-4 pr-6">Progression</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {projects.map((project) => (
                <tr key={project._id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Titre & Owner */}
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-slate-900">{project.title}</div>
                    <div className="text-xs text-slate-400">par {project.owner?.name || 'Inconnu'}</div>
                  </td>
                  
                  {/* Statut */}
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      project.status === 'open' 
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {project.status}
                    </span>
                  </td>

                  {/* Capital Cible */}
                  <td className="p-4 font-medium text-slate-900">{project.capital} €</td>

                  {/* Investi */}
                  <td className="p-4 font-semibold text-slate-700">{project.currentAmount} €</td>

                  {/* Barre de progression */}
                  <td className="p-4 pr-6">
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-slate-700 text-xs min-w-7 text-right">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-400 font-medium">
                    Aucun projet disponible pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;