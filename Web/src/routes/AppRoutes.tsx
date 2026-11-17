import { createBrowserRouter } from "react-router-dom";

//Routing Pages
import HomePage from "../Pages/User/HomePage";
import EventShowPage from "../Pages/User/ShowsPage";
import AccountsPage from "../Pages/User/AccountsPage";
import SeatPage from "../Pages/User/SeatsPage";
import SummaryPage from "../Pages/User/SummaryPage";
import SignupPage from "../Pages/User/SignupPage";
import SigninPage from "../Pages/User/SigninPage";
import PaymentSuccess from "../Pages/User/Successful PaymentPage";
import RedirectPage from "../Pages/User/RedirectPage";

//Layouts and Protected routes
import UserLayout from "../layouts/UserLayout";
import OrganizerLayout from "../layouts/OrganizerLayout";
import ProtectedRoute from "./ProtectedRoute";
import OrganizerDashboard from "../Pages/Organizer/DashboardPage";
import ManageVenue from "../Pages/Organizer/ManageVenuePage";
import ScreensLayout from "../Pages/Organizer/ScreensLayout";
import EventsPage from "../Pages/Organizer/EventsPage";
import ProfileComponent from "../Components/UsersComponents/ProfileComponent";

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

  //Protected Organizer  Routes
  {
    // element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        path: "/organizer",
        element: <OrganizerLayout />,
        children: [
          {
            path: "dashboard",
            element: <OrganizerDashboard />,
          },
          {
            path: "manageEvents",
            element: <EventsPage />,
          },
          {
            path: "screens/layout",
            element: <ScreensLayout />,
          },
          {
            path: "venue",
            element: <ManageVenue />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <RedirectPage />,
  },
]);

export default router;
