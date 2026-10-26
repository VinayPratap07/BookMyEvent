import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EventShowPage from "./Pages/ShowsPage.tsx";
import SignupPage from "./Pages/SignupPage.tsx";
import SigninPage from "./Pages/SigninPage.tsx";
import SeatPage from "./Pages/SeatsPage.tsx";
import SummaryPage from "./Pages/SummaryPage.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/shows/:id",
        element: <EventShowPage />,
      },
    ],
  },
  {
    path: "/movies/show/:showId",
    element: <SeatPage />,
  },
  {
    path: "/booking/summary",
    element: <SummaryPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/signin",
    element: <SigninPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes} />
    </QueryClientProvider>
  </StrictMode>,
);
