import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "../store/slices/projectSlice";
import { useNavigate } from "react-router-dom";

export default function ProjectListPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const currentUser = useSelector((state) => state.auth?.user);

  const isOwner = currentUser?.role === "owner";

  const {
    projects: projectList = [],
    error,
    loading,
  } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 bg-white p-5 rounded-xl shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            REGISTRE DES PROJETS
          </h1>
          <p className="text-sm text-gray-500">
            CONTRÔLE CENTRALISÉ DES OPÉRATIONS DE CAPITAL
          </p>
        </div>
     
        {isOwner && (
          <button
            onClick={() => navigate("/projects/create")}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-md hover:bg-indigo-700 hover:scale-[1.02] transition-all duration-200"
          >
            <i className="fa-solid fa-plus text-sm"></i>
            <span className="font-medium">NOUVEAU DÉPÔT</span>
          </button>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left text-sm font-semibold">Title</th>
              <th className="p-3 text-left text-sm font-semibold">Description</th>
              <th className="p-3 text-left text-sm font-semibold">Capital</th>
              <th className="p-3 text-left text-sm font-semibold">Current</th>
              <th className="p-3 text-left text-sm font-semibold">Status</th>
              <th className="p-3 text-left text-sm font-semibold">Max %</th>
              <th className="p-3 text-left text-sm font-semibold">Owner</th>
              <th className="p-3 text-left text-sm font-semibold">Details</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading && (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  Loading projects...
                </td>
              </tr>
            )}

            {error && !loading && (
              <tr>
                <td colSpan="8" className="text-center p-6 text-red-500">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && projectList.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center p-6 text-gray-500">
                  Aucun projet trouvé.
                </td>
              </tr>
            )}

            {/* DATA */}
            {!loading &&
              !error &&
              projectList.map((proj, index) => {
                const projectId = proj._id || proj.id;
                return (
                  <tr
                    key={projectId || index}
                    className="hover:bg-gray-50 transition"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900">
                      {proj.title}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {proj.description}
                    </td>
                    <td className="p-3 text-sm font-semibold text-gray-800">
                      {proj.capital} MAD
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {proj.currentAmount} MAD
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold
                        ${
                          proj.status === "active" || proj.status === "open"
                            ? "bg-green-100 text-green-700"
                            : proj.status === "closed"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      {proj.maxInvestmentPercent}%
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {typeof proj.owner === "string" && proj.owner.length > 10
                        ? `${proj.owner.substring(0, 5)}...`
                        : proj.owner?.name || proj.owner || "System"}
                    </td>

                    <td className="p-3 text-sm text-center">
                      <button
                        onClick={() => navigate(`/projects/${projectId}`)}
                        className="text-gray-400 hover:text-indigo-600 transition duration-150"
                        title="Voir les détails"
                      >
                        <i className="fa-solid fa-eye text-lg"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}