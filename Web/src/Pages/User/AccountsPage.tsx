import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar";

function AccountsPage() {
  return (
    <div className="flex items-start justify-center gap-8 w-full max-w-7xl mx-auto p-16">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AccountsPage;
