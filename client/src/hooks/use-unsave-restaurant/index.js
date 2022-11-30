import axios from "axios";

const useUnsaveRestaurant = () => {
  const unsaveRestaurant = async (restaurantId) => {
    try {
      const response = await axios.delete(`/api/unsave/${restaurantId}`);
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [unsaveRestaurant];
};

export default useUnsaveRestaurant;
