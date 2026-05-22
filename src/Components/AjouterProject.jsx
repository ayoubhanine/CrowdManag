import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../store/slices/projectSlice";

function AjouterProject() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.projects);

  const [form, setForm] = useState({
    title: "",
    description: "",
    capital: "",
    currentAmount: "",
    status: "active",
    maxInvestmentPercent: "",
    owner: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createProject(form))
      .unwrap()
      .then(() => {
        navigate("/projects");
      })
      .catch((err) => {
        console.error("error", err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-bold mb-4">Create New Project</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="capital"
            type="number"
            placeholder="Capital"
            value={form.capital}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* <input
            name="currentAmount"
            type="number"
            placeholder="Current Amount"
            value={form.currentAmount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          /> */}

          <input
            name="maxInvestmentPercent"
            type="number"
            placeholder="Max Investment %"
            value={form.maxInvestmentPercent}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* <input
            name="owner"
            placeholder="Owner"
            value={form.owner}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          /> */}

          <div className="flex gap-2 pt-3">
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-indigo-400"
            >
              {loading ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/projects")}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AjouterProject;
