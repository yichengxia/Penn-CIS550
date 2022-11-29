import axios from "axios";

const useFetchRestaurant = () => {
  const fetchRestaurant = async (restaurantId) => {
    try {
      const response = await axios.get(`/api/restaurant/${restaurantId}`);
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchRestaurant];
};

export default useFetchRestaurant;
