import axios from "axios";

const useThirdPartyLogin = () => {
  const thirdPartyLogin = async (method) => {
    try {
      await axios.get(`/auth/${method}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return [thirdPartyLogin];
};

export default useThirdPartyLogin;
