import axios from "axios";

const useRecommend = () => {
  const recommend = async (params) => {
    try {
      const response = await axios.get("/api/recommend", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [recommend];
};

export default useRecommend;
