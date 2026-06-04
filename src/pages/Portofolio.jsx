import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../store/slices/portofolioSlices.js";

const Portfolio = () => {
  const dispatch = useDispatch();

  const {
    projects = [],
    totalInvested = 0,
    loading,
    error,
  } = useSelector((state) => state.portfolio);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  const financedProjects = projects.length;

  if (loading) {
    return (
      <div className="p-8 text-slate-500 font-medium">
        Chargement du portefeuille...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* HEADER */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-black tracking-wider text-slate-800 uppercase">
          Portfolio Investisseur
        </h1>

        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mt-1">
          Gestion des participations financières
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-xs uppercase text-slate-400 font-semibold">
            Total investi
          </p>

          <h2 className="text-3xl font-bold text-emerald-600 mt-2">
            {totalInvested.toLocaleString("fr-FR")} MAD
          </h2>
        </div>

        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-xs uppercase text-slate-400 font-semibold">
            Projets financés
          </p>

          <h2 className="text-3xl font-bold text-blue-600 mt-2">
            {financedProjects}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4">Projet</th>
              <th className="p-4">Montant investi</th>
              <th className="p-4">Pourcentage détenu</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {projects.map((investment, index) => (
              <tr
                key={index}
                className="hover:bg-slate-50 transition"
              >
                <td className="p-4 font-semibold text-slate-800">
                  {investment.project}
                </td>

                <td className="p-4 font-medium text-slate-700">
                  {investment.amount.toLocaleString("fr-FR")} MAD
                </td>

                <td className="p-4">
                  <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold">
                    {investment.percentage}
                  </span>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td
                  colSpan="3"
                  className="text-center p-8 text-slate-400"
                >
                  Aucun investissement trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Portfolio;