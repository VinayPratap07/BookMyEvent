import React, { useState } from "react";
import {
  MdOutlineDashboard,
  MdOutlineTheaters,
  MdOutlineAttachMoney,
  MdOutlinePlace,
  MdOutlineConfirmationNumber,
  MdOutlineSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FiChevronRight } from "react-icons/fi";

interface AdminNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: AdminNavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: MdOutlineDashboard },
  { id: "shows", label: "Manage Shows", icon: MdOutlineTheaters },
  { id: "pricing", label: "Pricing", icon: MdOutlineAttachMoney },
  { id: "venue", label: "Venue", icon: MdOutlinePlace },
  { id: "bookings", label: "Bookings", icon: MdOutlineConfirmationNumber },
  { id: "settings", label: "Settings", icon: MdOutlineSettings },
];

function AdminSidebar() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleLogout = () => {
    // Replace with auth clear / redirect logic
    window.location.href = "/login";
  };

  return (
    <aside className="w-64 min-h-screen bg-[#0c0d12] rounded-3xl border border-purple-950/60 shadow-2xl shadow-purple-950/20 flex flex-col justify-between p-5 font-sans select-none text-gray-300">
      {/* Top Section */}
      <div>
        {/* Brand / Header */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-purple-900/40">
            <span className="text-lg font-black tracking-wider">A</span>
          </div>
          <div>
            <h2 className="text-base font-bold text-white tracking-wide leading-tight">
              Admin Portal
            </h2>
            <span className="text-xs text-purple-400 font-medium">
              Management Suite
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1">
          <span className="block px-3 pb-2 text-[11px] font-semibold tracking-wider text-gray-500 uppercase">
            Menu
          </span>

          <nav className="flex flex-col space-y-1.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-purple-950/50 text-white border border-purple-700/60 shadow-sm shadow-purple-900/40"
                      : "text-gray-400 hover:text-gray-200 hover:bg-[#161822] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 transition-colors ${
                        isActive
                          ? "text-purple-400"
                          : "text-gray-400 group-hover:text-purple-400"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <FiChevronRight className="w-4 h-4 text-purple-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Section: Logout */}
      <div className="pt-4 border-t border-[#1c1f2e]">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 border border-transparent hover:border-red-900/30 transition-all duration-200 group"
        >
          <MdOutlineLogout className="w-5 h-5 text-red-400 transition-transform group-hover:-translate-x-0.5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
