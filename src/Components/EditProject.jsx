import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import getProjectByIdApi from "../services/getById"; // حتاجوها باش نجيبو الداتا الحالية أولا
import editProjectByIdApi from "../services/editProject"; // الفانكشن اللي عاد صاوبنا

export default function EditProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // الـ State فين غانخزنو الداتا ديال الفورم
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    capital: "",
    maxInvestmentPercent: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // 1️⃣ أول حاجة: كنجيبو الداتا الحالية ديال المشروع باش نعمرو الـ Inputs
  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const data = await getProjectByIdApi(id);
        setFormData({
          title: data.title || "",
          description: data.description || "",
          capital: data.capital || "",
          maxInvestmentPercent: data.maxInvestmentPercent || "",
        });
      } catch (err) {
        setError(err.message || "Impossible de charger les données du projet");
      } finally {
        setLoading(false);
      }
    }
    if (id) loadProject();
  }, [id]);

  // دالة لتحديث الـ State ملي يكتب المستخدم ف الـ inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 2️⃣ دالة إرسال التعديلات للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);
      
      // العيادة للـ API ديال التعديل
      await editProjectByIdApi(id, formData);
      
      // ملي يجرى التعديل بنجاح، يرجع لصفحة التفاصيل
      navigate(`/projects/${id}`);
    } catch (err) {
      setError(err.message || "Erreur lors de la modification");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6 text-center text-gray-500 font-medium">Chargement des données...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        
        {/* Header */}
        <div className="mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-slate-900">ÉDITER LE PROJET</h1>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">Modifier les paramètres du capital et les détails</p>
        </div>

        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium">{error}</div>}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Titre du Projet</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Plafond Emission (Capital)</label>
              <input
                type="number"
                name="capital"
                value={formData.capital}
                onChange={handleChange}
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Prise Part Max (%)</label>
              <input
                type="number"
                name="maxInvestmentPercent"
                value={formData.maxInvestmentPercent}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => navigate(`/projects/${id}`)}
              className="bg-white border text-gray-700 font-medium px-5 py-2 rounded-lg text-xs tracking-wider uppercase hover:bg-gray-50 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-indigo-600 text-white font-medium px-5 py-2 rounded-lg text-xs tracking-wider uppercase hover:bg-indigo-700 transition disabled:bg-indigo-400"
            >
              {submitting ? "Enregistrement..." : "Enregistrer les modifications"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}