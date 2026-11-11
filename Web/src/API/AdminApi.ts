import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/organiser",
});

export const addScreens = async (data: {
  name: string;
  type: string;
  totalSeats: Number;
}) => {
  const res = await api.post("/addScreen", data, { withCredentials: true });

  return res.data;
};
