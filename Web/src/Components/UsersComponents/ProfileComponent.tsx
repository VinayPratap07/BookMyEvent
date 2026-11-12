import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiCalendar,
  FiClock,
  FiEdit3,
} from "react-icons/fi";
import { getUserInfo } from "../API/UserApi";
import LoadingScreen from "./Loading";
import ErrorState from "./Error";
import axios from "axios";

function ProfileComponent() {
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserInfo,
    refetchInterval: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const user = data?.user;

  if (error) {
    const errorMessage = axios.isAxiosError(error)
      ? error.response?.data?.message
      : "Something went wrong";

    const statusCode = axios.isAxiosError(error)
      ? error.response?.status
      : undefined;
    return <ErrorState description={errorMessage} title={statusCode} />;
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Not provided";
    const parsed = new Date(dateString);
    return isNaN(parsed.getTime())
      ? dateString
      : parsed.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  const fullName = user?.full_name || "Guest User";
  const email = user?.email || "Not provided";
  const phoneNo = user?.phone_no || "Not provided";
  const dob = formatDate(user?.dob);
  const createdAt = formatDate(user?.created_at);

  return (
    <div className="w-full max-w-4xl bg-white rounded-3xl border border-purple-100 shadow-sm p-8 font-sans text-gray-800">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-purple-50 gap-4">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-400">
            <FiUser className="w-10 h-10" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {fullName}
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">{email}</p>
          </div>
        </div>

        {/* Edit Profile Action */}
        <div>
          <button
            type="button"
            onClick={() => navigate("/profile/edit")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-medium text-sm hover:bg-purple-700 active:scale-[0.98] transition-all shadow-sm shadow-purple-200"
          >
            <FiEdit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        {/* Contact Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Account Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div className="p-4 rounded-2xl border border-purple-100/70 bg-purple-50/20">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
                <FiMail className="w-3.5 h-3.5" />
                Email Address
              </span>
              <p className="mt-2 text-sm font-medium text-gray-800 break-all">
                {email}
              </p>
            </div>

            {/* Phone */}
            <div className="p-4 rounded-2xl border border-purple-100/70 bg-purple-50/20">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
                <FiPhone className="w-3.5 h-3.5" />
                Phone Number
              </span>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {phoneNo}
              </p>
            </div>
          </div>
        </section>

        {/* Personal Details */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-gray-900">Personal Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Full Name */}
            <div className="p-4 rounded-2xl border border-purple-100/70 bg-purple-50/20">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
                <FiUser className="w-3.5 h-3.5" />
                Full Name
              </span>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {fullName}
              </p>
            </div>

            {/* Date of Birth */}
            <div className="p-4 rounded-2xl border border-purple-100/70 bg-purple-50/20">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
                <FiCalendar className="w-3.5 h-3.5" />
                Date of Birth
              </span>
              <p className="mt-2 text-sm font-medium text-gray-800">{dob}</p>
            </div>

            {/* Member Since / Created At */}
            <div className="p-4 rounded-2xl border border-purple-100/70 bg-purple-50/20">
              <span className="flex items-center gap-2 text-xs font-semibold text-purple-700 uppercase tracking-wide">
                <FiClock className="w-3.5 h-3.5" />
                Member Since
              </span>
              <p className="mt-2 text-sm font-medium text-gray-800">
                {createdAt}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ProfileComponent;
