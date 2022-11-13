import axios from "axios";

const useSignup = () => {
  const signup = async (username, password) => {
    try {
      const response = await axios.post("/api/signup", {
        username,
        password,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [signup];
};

export default useSignup;
