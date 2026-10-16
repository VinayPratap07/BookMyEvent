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
//Harded coded id for testing
export const getAllShows = async () => {
  const res = await api.get(`/getShows/1`, {
    withCredentials: true,
  });

  return res.data;
};
