import axios from "axios";

const useLogin = () => {
  const login = async (username, password) => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.log(error.message);
    }
  };

  return [login];
};

export default useLogin;
