import axios from "axios";

const useFetchCurrentUser = () => {
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/current_user");
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [fetchCurrentUser];
};

export default useFetchCurrentUser;
