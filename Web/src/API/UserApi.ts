import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/user",
});

export const signupUser = async (data: {
  fullName: string;
  email: string;
  phoneNo: string;
  password: string;
}) => {
  const res = await api.post("/register", data, { withCredentials: true });

  return res.data;
};
