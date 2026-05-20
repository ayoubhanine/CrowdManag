import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProjectListPage from "./Components/ProjectListPage";
import AjouterProject from "./Components/AjouterProject";
import ProjectDetailsPage from "./Components/DeatilsProject";
import EditProjectPage from "./Components/EditProject";

// Pages de test temporaires
const Dashboard = () => (
  <div>
    <h2>Voici le contenu du Dashboard</h2>
  </div>
);
// const Projects = () => <div><ProjectListPage /></div>;
const Investisseurs = () => (
  <div>
    <h2>Voici la liste des Investisseurs</h2>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. ROUTE PUBLIQUE : Totalement indépendante du MainLayout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 2. ROUTES PRIVÉES : Le MainLayout les enveloppe et les sécurise */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* Pas de "/" devant les sous-routes, React Router gère la suite de l'URL automatiquement */}
          <Route path="projects" element={<ProjectListPage />} />
          <Route path="projects/create" element={<AjouterProject />} />

          <Route path="projects/:id" element={<ProjectDetailsPage />} />
          <Route path="/projects/:id/edit" element={<EditProjectPage />} />
          <Route path="projects/investisseurs" element={<Investisseurs />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
