import React, { useState } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiUsers,
  FiFilm,
  FiCalendar,
  FiArrowUpRight,
  FiClock,
} from "react-icons/fi";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Revenue Chart Datasets
const revenueDataDaily = [
  { time: "10 AM", revenue: 1240 },
  { time: "1 PM", revenue: 3450 },
  { time: "4 PM", revenue: 2890 },
  { time: "7 PM", revenue: 5620 },
  { time: "10 PM", revenue: 4100 },
];

const revenueDataWeekly = [
  { time: "Mon", revenue: 14200 },
  { time: "Tue", revenue: 18500 },
  { time: "Wed", revenue: 16800 },
  { time: "Thu", revenue: 22400 },
  { time: "Fri", revenue: 38900 },
  { time: "Sat", revenue: 49500 },
  { time: "Sun", revenue: 44200 },
];

const revenueDataMonthly = [
  { time: "Jan", revenue: 112000 },
  { time: "Feb", revenue: 135000 },
  { time: "Mar", revenue: 148000 },
  { time: "Apr", revenue: 162000 },
  { time: "May", revenue: 195000 },
  { time: "Jun", revenue: 224500 },
];

// Popular Shows Dataset
const popularShowsData = [
  { name: "Oppenheimer", bookings: 4230 },
  { name: "Dune: Part Two", bookings: 3890 },
  { name: "Interstellar (IMAX)", bookings: 2950 },
  { name: "Deadpool & Wolverine", bookings: 2410 },
  { name: "Jawan", bookings: 1920 },
];

// Recent Bookings Data
const recentBookings = [
  {
    id: "BMS-84920",
    customer: "Aarav Sharma",
    movie: "Dune: Part Two",
    venue: "PVR Directors Cut, Screen 2",
    seats: "E12, E13",
    amount: "₹1,150",
    status: "Confirmed",
    time: "4 mins ago",
  },
  {
    id: "BMS-84919",
    customer: "Rhea Sen",
    movie: "Oppenheimer",
    venue: "INOX Megaplex, Screen 4",
    seats: "C8",
    amount: "₹450",
    status: "Confirmed",
    time: "12 mins ago",
  },
  {
    id: "BMS-84918",
    customer: "Kabir Mehta",
    movie: "Interstellar",
    venue: "Cinepolis VIP, Screen 1",
    seats: "H10, H11, H12",
    amount: "₹2,400",
    status: "Confirmed",
    time: "25 mins ago",
  },
  {
    id: "BMS-84917",
    customer: "Pooja Hegde",
    movie: "Stree 2",
    venue: "Miraj Cinemas, Screen 3",
    seats: "D4, D5",
    amount: "₹720",
    status: "Pending",
    time: "32 mins ago",
  },
];

// Active & Upcoming Shows Data
const showsOverview = [
  {
    title: "Dune: Part Two",
    language: "English • IMAX 2D",
    screens: 14,
    occupancy: 92,
    status: "Running",
  },
  {
    title: "Oppenheimer",
    language: "English • 70mm IMAX",
    screens: 8,
    occupancy: 86,
    status: "Running",
  },
  {
    title: "Gladiator II",
    language: "English • 3D / 2D",
    screens: 22,
    occupancy: 0,
    status: "Upcoming",
    releaseDate: "Starts Nov 15",
  },
  {
    title: "Kalki 2898 AD",
    language: "Hindi, Telugu • 3D",
    screens: 12,
    occupancy: 74,
    status: "Running",
  },
];

export const AdminDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState<"daily" | "weekly" | "monthly">(
    "weekly",
  );

  const activeRevenueDataset =
    timeframe === "daily"
      ? revenueDataDaily
      : timeframe === "weekly"
        ? revenueDataWeekly
        : revenueDataMonthly;

  return (
    <div className="w-full min-h-screen bg-[#0c0d12] text-gray-200 p-6 sm:p-8 font-sans space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-purple-950/40 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Analytics & Overview
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Real-time telemetry, box office metrics, and inventory demand.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#161822] border border-purple-950/60 p-1.5 rounded-2xl text-xs font-semibold">
          {(["daily", "weekly", "monthly"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded-xl uppercase tracking-wider transition-all ${
                timeframe === t
                  ? "bg-purple-600 text-white shadow-md shadow-purple-900/40"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiDollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-3">
            ₹2,48,920
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <FiArrowUpRight className="w-3.5 h-3.5" />
            <span>+14.8% vs last cycle</span>
          </div>
        </div>

        {/* Total Bookings */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiTrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-3">
            14,240
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <FiArrowUpRight className="w-3.5 h-3.5" />
            <span>+8.2% new reservations</span>
          </div>
        </div>

        {/* Total Users */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Active Registered Users
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiUsers className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-3">
            38,910
          </p>
          <div className="flex items-center gap-1.5 text-xs text-purple-400 mt-2 font-medium">
            <span>+420 onboarded this week</span>
          </div>
        </div>

        {/* Total Active Shows */}
        <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50 shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Active Shows / Runs
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-950/60 border border-purple-700/40 flex items-center justify-center text-purple-400">
              <FiFilm className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-white mt-3">28</p>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-2 font-medium">
            <span>Across 46 screens</span>
          </div>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Velocity Curve */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#161822] border border-purple-950/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Revenue Trajectory
              </h2>
              <p className="text-xs text-gray-400">
                Gross sales volume filtered by {timeframe} window
              </p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={activeRevenueDataset}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="purpleGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#23263b"
                  vertical={false}
                />
                <XAxis
                  dataKey="time"
                  stroke="#6b7280"
                  tickLine={false}
                  textAnchor="middle"
                  fontSize={12}
                />
                <YAxis stroke="#6b7280" tickLine={false} fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0c0d12",
                    borderColor: "#581c87",
                    borderRadius: "0.75rem",
                    color: "#f3f4f6",
                  }}
                  formatter={(val: number) => [
                    `₹${val.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#a855f7"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#purpleGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Most Popular Titles Bar Chart */}
        <div className="p-6 rounded-3xl bg-[#161822] border border-purple-950/50">
          <div className="mb-6">
            <h2 className="text-base font-bold text-white tracking-wide">
              Box Office Traction
            </h2>
            <p className="text-xs text-gray-400">
              Top titles ranked by seat bookings
            </p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={popularShowsData}
                layout="vertical"
                margin={{ top: 5, right: 10, left: 10, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#23263b"
                  horizontal={false}
                />
                <XAxis type="number" stroke="#6b7280" fontSize={11} hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#9ca3af"
                  fontSize={11}
                  tickLine={false}
                  width={90}
                />
                <Tooltip
                  cursor={{ fill: "rgba(147, 51, 234, 0.08)" }}
                  contentStyle={{
                    backgroundColor: "#0c0d12",
                    borderColor: "#581c87",
                    borderRadius: "0.75rem",
                    color: "#f3f4f6",
                  }}
                  formatter={(val: number) => [`${val} seats`, "Bookings"]}
                />
                <Bar
                  dataKey="bookings"
                  fill="#8b5cf6"
                  radius={[0, 6, 6, 0]}
                  barSize={14}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables & Operational Logs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-[#161822] border border-purple-950/50 overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-[#23263b]">
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                Live Bookings Stream
              </h2>
              <p className="text-xs text-gray-400">
                Incoming reservations across screens
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-purple-400 bg-purple-950/40 border border-purple-800/40 px-3 py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>

          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs">
              <thead className="text-gray-400 uppercase tracking-wider font-semibold border-b border-[#23263b]">
                <tr>
                  <th className="pb-3 px-2">ID</th>
                  <th className="pb-3 px-2">User</th>
                  <th className="pb-3 px-2">Show & Venue</th>
                  <th className="pb-3 px-2">Seats</th>
                  <th className="pb-3 px-2">Amount</th>
                  <th className="pb-3 px-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#23263b]/60">
                {recentBookings.map((b) => (
                  <tr
                    key={b.id}
                    className="hover:bg-purple-950/20 transition-colors"
                  >
                    <td className="py-3 px-2 font-mono text-purple-400">
                      {b.id}
                    </td>
                    <td className="py-3 px-2 text-white font-medium">
                      {b.customer}
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-semibold text-gray-200">
                        {b.movie}
                      </div>
                      <div className="text-[11px] text-gray-500">{b.venue}</div>
                    </td>
                    <td className="py-3 px-2 text-gray-300 font-mono">
                      {b.seats}
                    </td>
                    <td className="py-3 px-2 font-bold text-white">
                      {b.amount}
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          b.status === "Confirmed"
                            ? "bg-emerald-950/60 text-emerald-400 border border-emerald-800/40"
                            : "bg-amber-950/60 text-amber-400 border border-amber-800/40"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Current & Upcoming Pipeline */}
        <div className="p-6 rounded-3xl bg-[#161822] border border-purple-950/50 flex flex-col justify-between">
          <div>
            <div className="pb-4 border-b border-[#23263b]">
              <h2 className="text-base font-bold text-white tracking-wide">
                Show Catalog State
              </h2>
              <p className="text-xs text-gray-400">
                Current runs and scheduled rollouts
              </p>
            </div>

            <div className="space-y-4 mt-5">
              {showsOverview.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#0c0d12] border border-purple-950/40 flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {item.title}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.status === "Running"
                          ? "bg-purple-950 text-purple-400 border border-purple-800/40"
                          : "bg-gray-800 text-gray-300"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400">{item.language}</p>

                  {item.status === "Running" ? (
                    <div className="mt-1">
                      <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                        <span>{item.screens} Screens Active</span>
                        <span className="font-semibold text-purple-400">
                          {item.occupancy}% Occupancy
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-[#1e2235] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                          style={{ width: `${item.occupancy}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-xs text-purple-400/80 mt-1">
                      <FiCalendar className="w-3.5 h-3.5" />
                      <span>{item.releaseDate}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-[#23263b] mt-5">
            <button
              type="button"
              className="w-full py-2.5 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-300 hover:bg-purple-900/30 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <FiClock className="w-3.5 h-3.5" />
              <span>Configure Schedule Grid</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
