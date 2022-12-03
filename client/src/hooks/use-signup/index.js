import axios from "axios";
import { useState } from "react";

const useSignup = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);

  const signup = async (username, password) => {
    setIsSigningUp(true);

    try {
      const response = await axios.post("/api/signup", {
        username,
        password,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    } finally {
      setIsSigningUp(false);
    }
  };

  return [isSigningUp, signup];
};

export default useSignup;
