import axios from "axios";

const host = `http://localhost:4010`;
export const resgisterRoute = `${host}/register`;
export const loginRoute = `${host}/login`;
export const avtarRoute = `${host}/avtar`;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${resgisterRoute}`, userData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${loginRoute}`, userData);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export const avtarUser = async () => {};
