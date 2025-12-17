import axios from "axios";
// import { cookies } from "next/headers";

export const serverApi = () => {
  const token = "hgfhfh";

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
    headers: token ? { Authorization: token } : {},
  });
};
