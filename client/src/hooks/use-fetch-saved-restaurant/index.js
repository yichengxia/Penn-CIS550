import axios from "axios";

const useFetchSavedRestaurant = () => {
  const fetchSavedRestaurant = async (params) => {
    try {
      const response = await axios.get("/api/saved_restaurant", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchSavedRestaurant];
};

export default useFetchSavedRestaurant;
