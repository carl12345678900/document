import api from "../../api/axios";

export async function getCategory() {
  try {
    const res = await api.get(`/category/`);
    return res.data;
  } catch (error) {
    console.error("fetch:", error);
    throw error;
  }
}
