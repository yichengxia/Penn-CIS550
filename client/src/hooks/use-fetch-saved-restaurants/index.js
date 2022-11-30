import axios from "axios";

const useFetchSavedRestaurants = () => {
  const fetchSavedRestaurants = async (params) => {
    try {
      const response = await axios.get("/api/saved_restaurants", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchSavedRestaurants];
};

export default useFetchSavedRestaurants;
