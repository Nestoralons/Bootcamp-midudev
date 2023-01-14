import axios from "axios";
const baseUrl = "https://ancient-brushlands-81129.herokuapp.com/api/login";
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};
export default { login };
