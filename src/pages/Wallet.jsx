import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWalletData, depositFundsServer } from '../store/slices/walletSlice'; // Ajuste le chemin d'accès

const Wallet = () => {
  const [amountInput, setAmountInput] = useState('');
  const dispatch = useDispatch();
  
  // Récupération des états depuis le store Redux
  const { balance, history, loading, error } = useSelector((state) => state.wallet);

  // Charger le solde et l'historique dès que l'utilisateur arrive sur la page
  useEffect(() => {
    dispatch(fetchWalletData());
  }, [dispatch]);

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!amountInput || isNaN(amountInput) || Number(amountInput) <= 0) {
      alert('Veuillez entrer un montant valide.');
      return;
    }

    dispatch(depositFundsServer(amountInput));
    setAmountInput(''); // Reset le champ de saisie
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">👛 Mon Portefeuille</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Carte Solde Actuel */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg col-span-1 flex flex-col justify-between">
          <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Solde Actuel</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">
              {loading ? "..." : `${balance.toLocaleString()} DH`}
            </p>
          </div>
        </div>

        {/* Formulaire de Dépôt */}
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg col-span-2">
          <h3 className="text-lg font-semibold mb-3">Alimenter le compte</h3>
          <form onSubmit={handleDeposit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="number"
              placeholder="Montant en DH (ex: 150)"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 outline-none focus:border-emerald-500 transition-all flex-1"
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold px-6 py-2.5 rounded-lg transition-all"
            >
              Créditer le solde
            </button>
          </form>
        </div>
      </div>

      {/* Historique des transactions */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-lg overflow-hidden">
        <div className="p-5 border-b border-slate-700">
          <h3 className="text-lg font-semibold">Historique des opérations</h3>
        </div>

        {loading && history.length === 0 ? (
          <p className="p-5 text-slate-400 text-center">Chargement des transactions...</p>
        ) : history.length === 0 ? (
          <p className="p-5 text-slate-400 text-center">Aucune transaction enregistrée pour le moment.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase font-semibold">
                  <th className="p-4">Date</th>
                  <th className="p-4">Type d'opération</th>
                  <th className="p-4 text-right">Montant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-sm">
                {history.map((op) => (
                  <tr key={op._id} className="hover:bg-slate-750/40 transition-colors">
                    <td className="p-4 text-slate-300">
                      {new Date(op.date).toLocaleString('fr-FR')}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        op.type === 'Dépôt' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {op.type}
                      </span>
                    </td>
                    <td className={`p-4 text-right font-bold ${
                      op.type === 'Dépôt' ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {op.type === 'Dépôt' ? '+' : '-'}{op.amount.toLocaleString()} DH
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;