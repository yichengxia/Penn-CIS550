import axios from "axios";
import { useState } from "react";

const useFetchCurrentUser = () => {
  const [isFetchingCurrentUser, setIsFetchingCurrentUser] = useState(false);

  const fetchCurrentUser = async () => {
    setIsFetchingCurrentUser(true);
    try {
      const response = await axios.get("/api/current_user");
      return response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsFetchingCurrentUser(false);
    }
  };

  return [isFetchingCurrentUser, fetchCurrentUser];
};

export default useFetchCurrentUser;
