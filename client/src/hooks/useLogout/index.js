import axios from "axios";

const useLogout = () => {
  const logout = async () => {
    try {
      const response = await axios.get("/api/logout");
      return response.status;
    } catch (error) {
      console.log(error.message);
      return error.response.status;
    }
  };

  return [logout];
};

export default useLogout;
