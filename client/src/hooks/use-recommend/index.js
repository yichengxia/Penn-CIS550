import axios from "axios";
import { useState } from "react";

const useRecommend = () => {
  const [isRecommending, setIsRecommending] = useState(false);

  const recommend = async (params) => {
    setIsRecommending(true);
    try {
      const response = await axios.get("/api/recommend", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsRecommending(false);
    }
  };

  return [isRecommending, recommend];
};

export default useRecommend;
