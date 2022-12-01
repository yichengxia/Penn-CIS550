import axios from "axios";
import { useState } from "react";

const useFetchRestaurant = () => {
  const [isFetchingRestaurant, setIsFetchingRestaurant] = useState(false);

  const fetchRestaurant = async (restaurantId) => {
    setIsFetchingRestaurant(true);
    try {
      const response = await axios.get(`/api/restaurant/${restaurantId}`);
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingRestaurant(false);
    }
  };

  return [isFetchingRestaurant, fetchRestaurant];
};

export default useFetchRestaurant;
