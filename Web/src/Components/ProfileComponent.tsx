import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FiEdit2, FiCheck, FiCalendar, FiUser } from "react-icons/fi";
import { getUserInfo } from "../API/UserApi";
import LoadingScreen from "./Loading";
import ErrorState from "./Error";
import axios from "axios";

function ProfileComponent() {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("vinaypratap10457.10d@gmail.com");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [identity, setIdentity] = useState<"Woman" | "Man" | null>(null);
  const [isMarried, setIsMarried] = useState<"Yes" | "No" | null>(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserInfo,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log(data);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Something went wrong";

    const statusCode = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    return <ErrorState description={errorMessage} title={statusCode} />;
  }

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl border border-purple-100 shadow-sm p-8 font-sans text-gray-800">
      {/* User Header */}
      <div className="flex items-center gap-6 pb-8 border-b border-purple-50">
        <div className="w-24 h-24 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-300">
          <FiUser className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Guest
        </h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="mt-8 space-y-8">
        {/* Account Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Mobile Number */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>Mobile Number</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold text-xs transition-colors"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Get tickets on Whatsapp/SMS"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none text-sm placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                <span>Email Address</span>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold text-xs transition-colors"
                >
                  <FiEdit2 className="w-3.5 h-3.5" />
                  Edit
                </button>
              </div>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none text-sm placeholder:text-gray-400 transition-all"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-purple-600">
                  <FiCheck className="w-4 h-4 stroke-[2.5]" />
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Personal Details */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>

          {/* Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter first name here"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none text-sm placeholder:text-gray-400 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className="text-purple-600">*</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name here"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none text-sm placeholder:text-gray-400 transition-all"
              />
            </div>
          </div>

          {/* Birthday & Identity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Birthday (Optional)
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-100 outline-none text-sm text-gray-700 transition-all"
                />
                <FiCalendar className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="block text-sm font-medium text-gray-700">
                Identity (Optional)
              </span>
              <div className="flex gap-2">
                {(["Woman", "Man"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() =>
                      setIdentity(identity === option ? null : option)
                    }
                    className={`px-6 py-2 rounded-xl text-sm font-medium border transition-all ${
                      identity === option
                        ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold shadow-xs"
                        : "border-gray-200 text-gray-600 hover:border-purple-200 hover:bg-purple-50/40"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Married Status */}
          <div className="space-y-2">
            <span className="block text-sm font-medium text-gray-700">
              Married ? (Optional)
            </span>
            <div className="flex gap-2">
              {(["Yes", "No"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setIsMarried(isMarried === option ? null : option)
                  }
                  className={`px-6 py-2 rounded-xl text-sm font-medium border transition-all ${
                    isMarried === option
                      ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold shadow-xs"
                      : "border-gray-200 text-gray-600 hover:border-purple-200 hover:bg-purple-50/40"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 active:scale-[0.98] transition-all shadow-sm shadow-purple-200"
            >
              Save Changes
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}

export default ProfileComponent;
