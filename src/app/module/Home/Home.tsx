import React from "react";
import { useEffect } from "react";
import { AppDispatch } from "@/redux/mainStore";
import { useDispatch } from "react-redux";
// import { homeMiddleware } from "../../../features/Thunks/home/homeThunks";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getHomeData = async () => {
    const useId = "shjsj";
    // const data = await dispatch(homeMiddleware(useId));
    // return data;
  };
  useEffect(() => {
    getHomeData();
  }, []);
  return <div>hjdjhds</div>;
};
export default Home;
