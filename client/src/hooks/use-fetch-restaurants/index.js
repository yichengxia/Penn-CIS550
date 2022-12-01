import axios from "axios";
import { useState } from "react";

const useFetchRestaurants = () => {
  const [isFetchingRestaurants, setIsFetchingRestaurants] = useState(false);

  const fetchRestaurants = async (params) => {
    setIsFetchingRestaurants(true);
    try {
      const response = await axios.get("/api/restaurants", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingRestaurants(false);
    }
  };

  return [isFetchingRestaurants, fetchRestaurants];
};

export default useFetchRestaurants;
