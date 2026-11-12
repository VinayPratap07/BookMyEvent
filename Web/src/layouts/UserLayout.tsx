import { Outlet } from "react-router-dom";
import Navbar from "../Components/UsersComponents/Navbar";
import Footer from "../Components/UsersComponents/footer";

function UserLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default UserLayout;
