import { Outlet } from "react-router-dom";
import AdminSideBar from "../Components/AdminSideBar";

function AdminLayout() {
  return (
    <div className="bg-[#0c0d12] h-screen w-full flex overflow-hidden">
      {/* Sidebar container: pinned height, no shrink */}
      <div className="shrink-0 p-6 flex flex-col justify-center">
        <AdminSideBar />
      </div>

      {/* Main content viewport: expands to fill remaining space, handles its own scrolling */}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
