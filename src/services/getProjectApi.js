import axios from "axios";
async function getProjectApi() {
  try {
    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    const endpoint =
      user.role === "investor"
        ? "http://localhost:5000/api/projects"
        : "http://localhost:5000/api/projects/my";

    const res = await axios.get(endpoint, {
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
export default getProjectApi;
