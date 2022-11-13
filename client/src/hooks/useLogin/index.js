import axios from "axios";

const useLogin = () => {
  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [login];
};

export default useLogin;
