import axios from "axios";

const useFetchReviews = () => {
  const fetchReviews = async (params) => {
    try {
      const response = await axios.get("/api/reviews", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchReviews];
};

export default useFetchReviews;
