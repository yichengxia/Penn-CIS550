import axios from "axios";

const useFetchReviewer = () => {
  const fetchReviewer = async (reviewerId) => {
    try {
      const response = await axios.get(`/api/reviewer/${reviewerId}`);
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchReviewer];
};

export default useFetchReviewer;
