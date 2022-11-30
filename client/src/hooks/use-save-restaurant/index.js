import axios from "axios";

const useSaveRestaurant = () => {
  const saveRestaurant = async (userId, restaurantId, lastUpdated) => {
    try {
      const response = await axios.post("/api/save", {
        userId,
        restaurantId,
        lastUpdated,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [saveRestaurant];
};

export default useSaveRestaurant;
