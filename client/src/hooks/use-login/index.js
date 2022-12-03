import axios from "axios";
import { useState } from "react";

const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const login = async (username, password) => {
    setIsLoggingIn(true);

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    } finally {
      setIsLoggingIn(false);
    }
  };

  return [isLoggingIn, login];
};

export default useLogin;
