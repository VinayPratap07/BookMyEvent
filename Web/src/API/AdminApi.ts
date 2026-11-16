import axios from "axios";
import type { ScreenLayoutPayload } from "../Pages/Admin/ScreensLayout";

const api = axios.create({
  baseURL: "http://localhost:3000/api/organiser",
});

export const addScreens = async (data: {
  ScreenName: string;
  ScreenType: string;
  totalSeats: Number;
}) => {
  const res = await api.post("/addScreen", data, { withCredentials: true });

  return res.data;
};

export const getScreens = async () => {
  const res = await api.get("/screens", { withCredentials: true });

  return res.data;
};

//Events API
export const getEvents = async () => {
  const res = await api.get("/events", { withCredentials: true });

  return res.data;
};

export const addEvents = async (data: {
  event_name: string;
  event_description: string;
  event_type: string;
  event_imgLink: string;
  event_duration: Number;
  released_at: string;
  min_age: Number;
  genre: string;
  language: string;
}) => {
  const res = await api.post("/events", data, { withCredentials: true });

  return res.data;
};

//Layout API
export const uploadLayout = async (data: ScreenLayoutPayload) => {
  const res = await api.post("/layout", data, {
    withCredentials: true,
  });

  return res.data;
};

export const getLayout = async (screenId: string) => {
  const res = await api.get(`/layout?screenId=${screenId}`, {
    withCredentials: true,
  });

  return res.data;
};
