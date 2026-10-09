import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiChevronDown, FiMapPin, FiX } from "react-icons/fi";
import { HiTicket } from "react-icons/hi2";

interface NavbarProps {
  onSearch?: (query: string) => void;
  onCitySelect?: (city: string) => void;
  onSignInClick?: () => void;
}

const CITIES: string[] = [
  "Mumbai",
  "Delhi-NCR",
  "Bengaluru",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
];

export const Navbar: React.FC<NavbarProps> = ({
  onSearch,
  onCitySelect,
  onSignInClick,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("Delhi-NCR");
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsCityDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery.trim());
    }
  };

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setIsCityDropdownOpen(false);
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onSearch) {
      onSearch("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-sky-100 bg-white shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-500">
            <HiTicket className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">
            BookMy<span className="text-sky-500">Event</span>
          </span>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative max-w-lg flex-1 "
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 ">
            <FiSearch className="h-4 w-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for movies, events, plays, sports and activities"
            className="w-full rounded-lg border border-slate-200 bg-sky-50/40 py-2 pr-8 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition duration-150 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </form>

        {/* Controls: City Dropdown & Sign In */}
        <div className="flex shrink-0 items-center gap-3">
          {/* City Selection Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsCityDropdownOpen((prev) => !prev)}
              aria-expanded={isCityDropdownOpen}
              className="flex items-center gap-1.5 rounded-lg border border-transparent px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-600 focus:border-sky-300 focus:outline-none"
            >
              <FiMapPin className="h-4 w-4 text-sky-500" />
              <span>{selectedCity}</span>
              <FiChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                  isCityDropdownOpen ? "rotate-180 text-sky-500" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isCityDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-sky-100 bg-white py-1.5 shadow-lg">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Select Location
                </div>
                {CITIES.map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => handleCitySelect(city)}
                    className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition ${
                      selectedCity === city
                        ? "bg-sky-50 font-semibold text-sky-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-sky-500"
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sign In Button */}
          <button
            type="button"
            onClick={onSignInClick}
            className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-medium text-white shadow-xs transition duration-150 hover:bg-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none active:bg-sky-600"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
