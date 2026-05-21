import axios from "axios";

async function investInProjectApi(id, amount) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token non trouvé");

    const res = await axios.post(
      `http://localhost:5000/api/investments/${id}/invest`,
      { amount: Number(amount) },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.error("INVEST ERROR:", error);
    const errorMsg =
      error.response?.data?.message ||
      error.message ||
      "Erreur lors de l'investissement";
    throw new Error(errorMsg);
  }
}

export default investInProjectApi;
