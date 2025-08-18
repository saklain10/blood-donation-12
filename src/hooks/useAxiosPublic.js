import axios from "axios";

const useAxiosPublic = () => {
  const instance = axios.create({
    baseURL: "https://ph-11-assignment-12-saklain.vercel.app",
  });

  return instance;
};

export default useAxiosPublic;
