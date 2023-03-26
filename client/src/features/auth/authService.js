import axios from "axios";

const API_URL = "/api/users/";

// Register User
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login User
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};
// Login User
const googlelogin = async (userData) => {
  // const { data } = await axios.post(API_URL + "googlelogin", userData);

  // if (data) {
  //   localStorage.setItem("user", JSON.stringify(data));
  // }
  console.log(userData, { ...userData });
  // return data;
};
// Login User
const googleregister = async (userData) => {
  const { data } = await axios.post(API_URL + "googleregister", userData);

  if (data) {
    localStorage.setItem("user", JSON.stringify(data));
  }
  console.log(data, userData.email);
  return data;
};
// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  googlelogin,
  googleregister,
};

export default authService;
