import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getProjectByIdApi from "../services/getById";
import deletProjectByIdApi from "../services/deletProject";
import editProjectByIdApi from "../services/editProject";
import investInProjectApi from "../services/invest";

export default function ProjectDetailsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [investAmount, setInvestAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.auth?.user);
  const currentUserId = currentUser?._id || currentUser?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInvestSubmit = async (e) => {
    e.preventDefault();
    if (!investAmount || Number(investAmount) <= 0) {
      alert("Veuillez entrer un montant valide");
      return;
    }

    try {
      setIsSubmitting(true);
      const responseData = await investInProjectApi(id, investAmount);

      const updatedProject = responseData?.project || responseData;

      if (updatedProject && updatedProject._id) {
        setProject(updatedProject);
      } else {
        const freshData = await getProjectByIdApi(id);
        setProject(freshData);
      }

      setIsModalOpen(false);
      setInvestAmount("");
      alert("Votre investissement a été enregistré avec succès !");
    } catch (err) {
      alert(err.message || "Erreur lors de l'investissement");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloture = async () => {
    const confirmCloture = window.confirm(
      "Êtes-vous sûr de vouloir clôturer cette levée de fonds ?",
    );
    if (!confirmCloture) return;

    try {
      const updatedProject = await editProjectByIdApi(id, { status: "closed" });

      setProject(updatedProject);
      alert("Le projet a été clôturé avec succès !");
      navigate("/projects");
    } catch (err) {
      alert(err.message || "Erreur lors de la clôture du projet");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Êtes-vous sûr de vouloir délister ce projet ?",
    );
    if (!confirmDelete) return;

    try {
      await deletProjectByIdApi(id);
      alert("Projet délisté avec succès !");
      navigate("/projects");
    } catch (err) {
      alert(err.message || "Erreur lors de la suppression");
    }
  };

  useEffect(() => {
    async function fetchDetails() {
      try {
        setLoading(true);
        const data = await getProjectByIdApi(id);
        setProject(data);
      } catch (err) {
        setError(err.message || "Impossible de charger les détails");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchDetails();
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="p-6 text-center text-red-500 font-medium">{error}</div>
    );
  if (!project)
    return (
      <div className="p-6 text-center text-gray-500 font-medium">
        Projet introuvable
      </div>
    );

  const capitalNum = Number(project.capital) || 0;
  const currentNum = Number(project.currentAmount) || 0;
  const maturityPercent =
    capitalNum > 0
      ? Math.min(Math.round((currentNum / capitalNum) * 100), 100)
      : 0;

  const investorsList = project.investors || [];

  const isOwner =
    currentUserId &&
    project.owner &&
    (currentUserId === project.owner || currentUserId === project.owner._id);

  const formatOwner = (ownerData) => {
    if (!ownerData) return "System";
    if (typeof ownerData === "string" && ownerData.length > 10) {
      return `${ownerData.substring(0, 6)}...${ownerData.substring(ownerData.length - 4)}`;
    }
    return ownerData.name || ownerData;
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      {/* TOP NAVIGATION & ACTIONS */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => navigate("/projects")}
            className="text-xs font-semibold text-gray-500 hover:text-gray-800 tracking-wider uppercase flex items-center gap-2 transition"
          >
            ← RETOUR AU REGISTRE DES ACTIFS
          </button>

          {!isOwner && (
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={project.status === "closed"}
              className={`font-semibold px-4 py-1.5 rounded text-xs tracking-wider uppercase transition shadow-sm
      ${
        project.status === "closed"
          ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
          : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]"
      }`}
            >
              INVESTIR
            </button>
          )}
        </div>

        {isOwner && (
          <div className="flex gap-2 animate-fadeIn w-full sm:w-auto justify-end">
            <button
              onClick={() => navigate(`/projects/${id}/edit`)}
              disabled={project.status === "closed"}
              className={`font-medium px-4 py-1.5 rounded text-xs tracking-wider uppercase transition shadow-sm border
                ${
                  project.status === "closed"
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                }`}
            >
              EDITER
            </button>

            <button
              onClick={handleCloture}
              disabled={project.status === "closed"}
              className={`font-medium px-4 py-1.5 rounded text-xs tracking-wider uppercase transition shadow-sm
                ${
                  project.status === "closed"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed opacity-60"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
            >
              CLÔTURER
            </button>

            <button
              onClick={handleDelete}
              className="bg-white border border-red-200 text-red-500 font-medium px-4 py-1.5 rounded text-xs tracking-wider uppercase hover:bg-red-50 transition shadow-sm"
            >
              DÉLISTER
            </button>
          </div>
        )}
      </div>

      {/* MAIN CARD (MAIN INFOS) */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col md:flex-row justify-between gap-8 mb-6">
        {/* Left Side: Title & Metrics */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                project.status === "open" || project.status === "active"
                  ? "bg-emerald-50 text-emerald-600"
                  : project.status === "closed"
                    ? "bg-red-50 text-red-600"
                    : "bg-amber-50 text-amber-600"
              }`}
            >
              {project.status || "Opérationnel"}
            </span>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-2 uppercase">
              {project.title}
            </h1>
          </div>

          {/* Grid Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 border-t pt-6 mt-8">
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                PLAFOND EMISSION
              </p>
              <p className="text-lg font-bold text-slate-800">
                {capitalNum.toLocaleString()} MAD
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-blue-600 tracking-wider uppercase mb-1">
                LIBÉRATION CAPITAL
              </p>
              <p className="text-lg font-bold text-blue-600">
                {currentNum.toLocaleString()} MAD
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                ACTIONNAIRES
              </p>
              <p className="text-lg font-bold text-slate-800">
                {investorsList.length}{" "}
                {investorsList.length <= 1 ? "entrée" : "entrées"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-1">
                PRISE PART MAX
              </p>
              <p className="text-lg font-bold text-slate-800">
                {project.maxInvestmentPercent || 10}%
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Progress Card */}
        <div className="w-full md:w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
          <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
            MATURITÉ DE LEVÉE
          </p>
          <p className="text-5xl font-black text-blue-500 mb-4">
            {maturityPercent}%
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-6">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${maturityPercent}%` }}
            ></div>
          </div>

          <p className="text-[10px] font-bold text-gray-300 tracking-widest uppercase">
            HANDSHAKE_VERIFIED
          </p>
        </div>
      </div>

      {/* DESCRIPTION BLOCK */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6">
        <h3 className="text-[10px] font-bold text-gray-400 tracking-wider uppercase mb-2">
          OVERVIEW & DESCRIPTION DU PROJET
        </h3>
        <p className="text-slate-700 text-sm font-normal leading-relaxed">
          {project.description ||
            "Aucune description détaillée n'a été fournie."}
        </p>
      </div>

      {/* BOTTOM TABLE (OFF-CHAIN CAPITAL) */}
      <div className="max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 bg-white border-b border-gray-100 flex justify-between items-center px-6">
          <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
            TABLEAU DE CAPTATION CAPITAL (OFF-CHAIN)
          </h2>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            MISE À JOUR RELATIVE: INSTANT
          </span>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 bg-slate-50 text-[10px] font-bold text-gray-400 tracking-wider uppercase">
              <th className="p-4 px-6">ENTITÉ INVESTISSEUR</th>
              <th className="p-4">VOLUME INVESTI</th>
              <th className="p-4">QUOTES-PARTS</th>
              <th className="p-4 text-right px-6">OWNER REGISTRE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm font-medium text-slate-700">
            {investorsList.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-8 text-gray-400 text-xs uppercase tracking-wide"
                >
                  Aucune transaction enregistrée pour le moment.
                </td>
              </tr>
            ) : (
              investorsList.map((inv, index) => {
                const investorId =
                  inv._id ||
                  inv.id ||
                  inv.user ||
                  (typeof inv === "string" ? inv : null);

                const isCurrentUser = investorId === currentUserId;

                const displayName =
                  inv.name ||
                  (isCurrentUser ? currentUser?.name : null) ||
                  "Investisseur";

                return (
                  <tr key={index} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 px-6 font-bold text-slate-900">
                      {displayName}
                    </td>
                    <td className="p-4">
                      {Number(inv.amount || inv).toLocaleString()} MAD
                    </td>
                    <td className="p-4">
                      <span className="bg-blue-50 text-blue-600 text-xs font-bold px-2 py-0.5 rounded">
                        {inv.share || "0"}%
                      </span>
                    </td>
                    <td className="p-4 text-right px-6 text-gray-400 text-xs font-normal">
                      {formatOwner(project.owner)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-100 mx-4">
            {/* Header Modal */}
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Saisir le montant de l'investissement
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold leading-none"
              >
                &times;
              </button>
            </div>

            {/* Form Modal */}
            <form onSubmit={handleInvestSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">
                  Montant (MAD)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={investAmount}
                    onChange={(e) => setInvestAmount(e.target.value)}
                    placeholder="Ex: 5000"
                    required
                    min="1"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500 font-semibold"
                  />
                  <span className="absolute right-4 top-2.5 text-xs font-bold text-gray-400">
                    MAD
                  </span>
                </div>
              </div>

              {/* Buttons Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-white border text-gray-600 px-4 py-1.5 rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-indigo-700 transition disabled:bg-indigo-400"
                >
                  {isSubmitting ? "Confirmation..." : "Confirmer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
