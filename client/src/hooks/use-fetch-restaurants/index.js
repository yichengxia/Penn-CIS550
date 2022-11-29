import axios from "axios";

const useFetchRestaurants = () => {
  const fetchRestaurants = async (params) => {
    try {
      const response = await axios.get("/api/restaurants", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchRestaurants];
};

export default useFetchRestaurants;
