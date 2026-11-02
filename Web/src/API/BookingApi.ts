import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/book",
});

//Get summary
export const getBookingSummary = async (showId: string, seatIds: string[]) => {
  const params = new URLSearchParams({
    showId,
    seats: seatIds.join(","),
  });
  const res = await api.get(`/getBookingSummary?showId=${params.toString()}`, {
    withCredentials: true,
  });

  return res.data;
};

//Create Booking session
export const initiateBooking = async (data: {
  showId: string;
  seatIds: string[];
}) => {
  const res = await api.post("/create-session", data, {
    withCredentials: true,
  });

  return res.data;
};
