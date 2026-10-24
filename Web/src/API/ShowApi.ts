import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/show",
});

//Get All events
export const getAllEvents = async () => {
  const res = await api.get("/getEvents", {
    withCredentials: true,
  });

  return res.data;
};

//Get all shows for a particular event using eventID
export const getAllShows = async (id: string) => {
  const res = await api.get(`/getShows/${id}`, {
    withCredentials: true,
  });

  return res.data;
};

//Get seats for a show
export const getShowSeats = async (id: string) => {
  const res = await api.get(`/getSeats/${id}`, { withCredentials: true });

  return res.data;
};
