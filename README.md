# 🚀 Crowdfunder Frontend - Système d'Authentification

Ce dépôt contient la brique d'authentification complète du projet **Crowdfunder**, entièrement synchronisée avec notre modèle et notre API backend commune. 

---

## 🛠️ Stack Technique Utilisée

*   **Framework :** React (Vite)
*   **Gestion d'état global :** Redux Toolkit (`@reduxjs/toolkit` + `react-redux`)
*   **Routage :** React Router DOM
*   **Styles :** Tailwind CSS
*   **Client HTTP :** Axios (avec intercepteur automatique de Token JWT)

---

## 🔑 Fonctionnalités Prêtes

1.  **Inscription (`/register`) :** Formulaire connecté permettant de choisir son rôle : `investor` (Investisseur) ou `owner` (Porteur de projet).
2.  **Connexion (`/login`) :** Authentification par email/mot de passe. Récupère le token et les données utilisateur, puis les stocke dans Redux et le `localStorage`.
3.  **Déconnexion (`/logout`) :** Nettoie instantanément le store Redux et supprime les clés du `localStorage`, puis redirige vers la page de connexion.
4.  **Protection des routes (`MainLayout`) :** Bloque l'accès aux pages privées (Dashboard, Projets...) si l'utilisateur n'est pas connecté.
5.  **Interface Dynamique (`Navbar`) :** Affiche en temps réel le nom de l'utilisateur connecté, son badge de rôle, et **son solde (balance)** s'il s'agit d'un investisseur.

---

## 📁 Architecture des Fichiers Clés

Voici les fichiers que j'ai mis en place et que tu peux utiliser/modifier :

```text
src/
├── components/
│   └── navigation/
│       ├── Navbar.jsx       # Barre supérieure avec Nom + Rôle + Solde (Redux)
│       └── Sidebar.jsx      # Menu latéral avec liens et bouton Logout
├── layouts/
│   └── MainLayout.jsx       # Layout privé (Vérifie la présence du Token JWT)
├── pages/
│   └── auth/
│       ├── Login.jsx        # Formulaire de connexion
│       └── Register.jsx     # Formulaire d'inscription (Gestion rôles investor/owner)
├── services/
│   └── api.js               # Client Axios + Intercepteur (Injecte le Bearer Token)
└── store/
    └── slices/
        └── authSlice.js     # Gestion Redux globale (loginUser, registerUser, logout)