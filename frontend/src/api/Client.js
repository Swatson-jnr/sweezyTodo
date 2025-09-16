import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// export const apifetcher = async (url) => {
//   const response = await apiClient.get(url, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
//     },
//   });
//   return response.data;
// };

// export const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;
