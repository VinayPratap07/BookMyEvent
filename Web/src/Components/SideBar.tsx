import React, { useState } from "react";
import {
  IoCloseOutline,
  IoPersonCircleOutline,
  IoPlayCircleOutline,
  IoHeartOutline,
  IoLogOutOutline,
  IoChevronForward,
} from "react-icons/io5";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { MdOutlineDevices, MdOutlineCreditCard } from "react-icons/md";
import { FiGift } from "react-icons/fi";
import { useMutation } from "@tanstack/react-query";
import { logoutUser } from "../API/UserApi";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "./Loading";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  hasChevron?: boolean;
}

const navItems: NavItem[] = [
  {
    id: "profile",
    label: "Profile",
    icon: IoPersonCircleOutline,
    hasChevron: true,
  },
  { id: "orders", label: "Your Orders", icon: HiOutlineReceiptTax },
  { id: "devices", label: "Saved Devices", icon: MdOutlineDevices },
  { id: "stream", label: "Stream Library", icon: IoPlayCircleOutline },
  { id: "wishlist", label: "Your Wishlist", icon: IoHeartOutline },
  { id: "quikpay", label: "QuikPay", icon: MdOutlineCreditCard },
  { id: "rewards", label: "Rewards", icon: FiGift },
];

function Sidebar() {
  const [activeTab, setActiveTab] = useState<string>("profile");
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      navigate("/");
    },
  });

  if (isPending) {
    return <LoadingScreen />;
  }

  const handleLogOut = () => {
    mutate();
  };

  return (
    <aside className="w-64 h-[720px] bg-white rounded-2xl border border-purple-100 shadow-sm flex flex-col justify-between p-4 font-sans select-none">
      {/* Top Section */}
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-5 px-2">
          <h2 className="text-xl font-bold text-gray-800 tracking-tight">
            My Account
          </h2>
          <button
            type="button"
            className="text-gray-400 hover:text-purple-700 transition-colors p-1 rounded-md"
            aria-label="Close"
          >
            <IoCloseOutline className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isStreamLibrary = item.id === "stream";

            return (
              <React.Fragment key={item.id}>
                {/* Thin horizontal divider before Stream Library matching the reference UI */}
                {isStreamLibrary && (
                  <hr className="border-t border-purple-100/70 my-3 mx-2" />
                )}

                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-semibold shadow-xs"
                      : "text-gray-600 hover:bg-purple-50/50 hover:text-purple-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? "text-purple-700" : "text-gray-500"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.hasChevron && isActive && (
                    <IoChevronForward className="w-4 h-4 text-purple-700" />
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      {/* Footer / Sign Out */}
      <div className="pt-4 border-t border-purple-100/70">
        <button
          type="button"
          onClick={handleLogOut}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-purple-600 hover:bg-purple-50 transition-colors"
        >
          <IoLogOutOutline className="w-5 h-5 text-purple-600" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
