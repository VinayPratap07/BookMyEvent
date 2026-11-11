interface VenueStatsProps {
  totalScreens: number;
  activeScreens: number;
  totalCapacity: number;
}

function VenueStats({
  totalScreens,
  activeScreens,
  totalCapacity,
}: VenueStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
      <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Total Auditoriums
        </span>
        <p className="text-3xl font-black text-white mt-2">{totalScreens}</p>
      </div>

      <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Active Running Screens
        </span>
        <p className="text-3xl font-black text-purple-400 mt-2">
          {activeScreens} / {totalScreens}
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-[#161822] border border-purple-950/50">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Cumulative Venue Capacity
        </span>
        <p className="text-3xl font-black text-white mt-2">
          {totalCapacity}{" "}
          <span className="text-sm text-gray-400 font-medium">Seats</span>
        </p>
      </div>
    </div>
  );
}

export default VenueStats;
