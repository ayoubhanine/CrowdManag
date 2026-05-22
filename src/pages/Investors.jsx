// src/pages/Investors.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartners } from "../store/slices/partnerSlice";

const Investors = () => {
  const dispatch = useDispatch();
  const { list: partners, loading, error } = useSelector((state) => state.partners);

  useEffect(() => {
    dispatch(fetchPartners());
  }, [dispatch]);

  if (loading) {
    return <div className="p-8 text-slate-500 font-medium">Chargement de l'annuaire...</div>;
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">{error}</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* En-tête du document style Design */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-black tracking-wider text-slate-800 uppercase font-mono">
          Annuaire des Partenaires
        </h1>
        <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mt-1">
          Base de données consolidée des apporteurs de capitaux
        </p>
      </div>

      {/* Conteneur de la table - Bordures strictes fidèles au design */}
      <div className="bg-white rounded-lg border border-slate-700 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-700 text-slate-500 text-[10px] font-black uppercase tracking-widest">
              <th className="p-4 pl-6">Nom de l'investisseur</th>
              <th className="p-4">Projet Associé</th>
              <th className="p-4">montant investi (€)</th>
              <th className="p-4 pr-6 text-right">Part (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs font-medium">
            {partners.map((partner) => (
              <tr key={partner.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Nom du partenaire */}
                <td className="p-5 pl-6 font-bold text-slate-900">{partner.entityName}</td>
                
                {/* Lien/Titre du projet souligné */}
                <td className="p-5">
                  <span className="underline cursor-pointer text-slate-700 hover:text-emerald-600 font-semibold">
                    {partner.associatedProject}
                  </span>
                </td>
                
                {/* Volume financier */}
                <td className="p-5 font-mono text-slate-800 font-semibold">
                  €{partner.volume.toLocaleString("fr-FR")}
                </td>
                
                {/* Pourcentage de participation (Badge bleu) */}
                <td className="p-5 pr-6 text-right">
                  <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-black px-2 py-1 rounded border border-blue-100">
                    {partner.share}%
                  </span>
                </td>
              </tr>
            ))}

            {partners.length === 0 && (
              <tr>
                <td colSpan="4" className="p-8 text-center text-slate-400">
                  Aucun apporteur de capitaux enregistré.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Investors;