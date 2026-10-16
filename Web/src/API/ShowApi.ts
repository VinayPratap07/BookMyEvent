import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/show",
});

export const getAllEvents = async () => {
  const res = await api.get("/getEvents", {
    withCredentials: true,
  });

  return res.data;
};
