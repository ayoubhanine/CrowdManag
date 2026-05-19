// src/pages/auth/Register.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/slices/authSlice';

const Register = () => {
  // On aligne les clés d'état avec ton modèle Mongoose
  const [userData, setUserData] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    role: 'investor' // 'investor' par défaut comme dans ton schéma Mongoose
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Les données envoyées correspondent maintenant exactement à ton schéma backend
    dispatch(registerUser(userData)).then((result) => {
      if (!result.error) {
        setSuccessMessage('Compte créé avec succès ! Redirection vers la page de connexion...');
        setTimeout(() => {
          navigate('/login');
        }, 2500);
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-100">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-800">🚀 Crowdfunder</h2>
          <p className="text-sm text-slate-500 mt-2">Créez votre compte sur la plateforme</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
            ⚠️ {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-emerald-50 text-emerald-600 text-sm rounded-lg border border-emerald-100">
            🎉 {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Adresse Email</label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="exemple@domaine.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Mot de passe</label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              placeholder="••••••••"
            />
          </div>

          {/* AJOUT DU SÉLECTEUR DE RÔLE CONFORME AU BACKEND */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Vous êtes un :</label>
            <select
              name="role"
              value={userData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-slate-700"
            >
              <option value="investor">Investisseur (Investor)</option>
              <option value="owner">Porteur de Projet (Owner)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-lg transition duration-200 text-sm flex justify-center items-center disabled:opacity-50"
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-600">
          Déjà un compte ?{' '}
          <button onClick={() => navigate('/login')} className="text-emerald-600 hover:underline font-medium">
            Se connecter
          </button>
        </div>

      </div>
    </div>
  );
};

export default Register;