import { createBrowserRouter } from "react-router-dom";

//Routing Pages
import HomePage from "../Pages/User/HomePage";
import EventShowPage from "../Pages/User/ShowsPage";
import AccountsPage from "../Pages/User/AccountsPage";
import ProfileComponent from "../Components/ProfileComponent";
import SeatPage from "../Pages/User/SeatsPage";
import SummaryPage from "../Pages/User/SummaryPage";
import SignupPage from "../Pages/User/SignupPage";
import SigninPage from "../Pages/User/SigninPage";
import PaymentSuccess from "../Pages/User/Successful PaymentPage";
import RedirectPage from "../Pages/User/RedirectPage";

//Layouts and Protected routes
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  //User Routes
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "shows/:id",
        element: <EventShowPage />,
      },
      {
        path: "/account",
        element: <AccountsPage />,
        children: [
          {
            path: "profile",
            element: <ProfileComponent />,
          },
          {
            path: "bookings",
          },
          {
            path: "devices",
          },
          {
            path: "stream",
          },
          {
            path: "wishlist",
          },
          {
            path: "quikpay",
          },
          {
            path: "rewards",
          },
        ],
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
  {
    path: "/payment/success",
    element: <PaymentSuccess />,
  },

  //Protected Admin Routes
  {
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
      },
    ],
  },
  {
    path: "*",
    element: <RedirectPage />,
  },
]);

export default router;
