import axios from "axios";
import { useState } from "react";

const useFetchSavedRestaurants = () => {
  const [isFetchingSavedRestaurants, setIsFetchingSavedRestaurants] =
    useState(false);

  const fetchSavedRestaurants = async (params) => {
    setIsFetchingSavedRestaurants(true);
    try {
      const response = await axios.get("/api/saved_restaurants", { params });
      return response.data.results;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingSavedRestaurants(false);
    }
  };

  return [isFetchingSavedRestaurants, fetchSavedRestaurants];
};

export default useFetchSavedRestaurants;
