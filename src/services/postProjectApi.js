import axios from "axios";

async function postProjectApi(projectData) {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("token not found");
    }

    const res = await axios.post(
      "http://localhost:5000/api/projects/",
      projectData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (error) {
    console.log("API ERROR:", error);
    throw error;
  }
}

export default postProjectApi;
