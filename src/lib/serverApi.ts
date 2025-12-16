import axios from "axios";
import { cookies } from "next/headers";

export const serverApi = () => {
  // const token = cookies().get("token")?.value; 

  // const instance = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api",
  //   headers: token ? { Authorization: `${token}` } : {},
  // });

  // return instance;
};
