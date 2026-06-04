import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvestorDashboard } from "../store/slices/investorDashboardSlice";

const DashboardInvestor = () => {
  const dispatch = useDispatch();

  const { stats, loading } = useSelector(
    (state) => state.investorDashboard
  );

  useEffect(() => {
    dispatch(fetchInvestorDashboard());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Chargement...</p>
      </div>
    );
  }

  const kpis = stats?.kpis || {};

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Dashboard Investisseur
        </h1>
        <p className="text-slate-500 mt-1">
          Vue globale de votre portefeuille
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        
        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="text-3xl mb-3">💰</div>
          <h3 className="text-slate-500 text-sm">Solde disponible</h3>
          <p className="text-3xl font-bold text-emerald-600 mt-2">
            {kpis.balance || 0} DH
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="text-3xl mb-3">📈</div>
          <h3 className="text-slate-500 text-sm">Total investi</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {kpis.totalInvested || 0} DH
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="text-3xl mb-3">📂</div>
          <h3 className="text-slate-500 text-sm">Projets financés</h3>
          <p className="text-3xl font-bold text-violet-600 mt-2">
            {kpis.projectsCount || 0}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition">
          <div className="text-3xl mb-3">💼</div>
          <h3 className="text-slate-500 text-sm">Portefeuille global</h3>
          <p className="text-3xl font-bold text-amber-600 mt-2">
            {kpis.portfolioValue || 0} DH
          </p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-8 bg-white rounded-2xl border shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">
          Résumé
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-slate-500 text-sm">
              Capital investi
            </p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              {kpis.totalInvested || 0} DH
            </p>
          </div>

          <div>
            <p className="text-slate-500 text-sm">
              Nombre de participations
            </p>
            <p className="text-2xl font-bold text-slate-800 mt-1">
              {kpis.projectsCount || 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInvestor;