import axios from "axios";

async function getProjectByIdApi(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("token not found");

    const res = await axios.get(`http://localhost:5000/api/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("API ERROR:", error);
    throw error;
  }
}

export default getProjectByIdApi;