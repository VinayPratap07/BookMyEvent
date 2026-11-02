import { FiAlertCircle, FiArrowLeft, FiHome } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function RedirectPage() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full h-1/2 max-w-4xl bg-white rounded-3xl border border-purple-100 shadow-sm p-12 font-sans text-gray-800 flex flex-col items-center justify-center text-center">
        {/* Visual Badge / Icon */}
        <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6">
          <FiAlertCircle className="w-10 h-10 stroke-[2]" />
        </div>

        {/* Status Code */}
        <span className="text-sm font-semibold uppercase tracking-wider text-purple-600 bg-purple-50 border border-purple-100 px-3.5 py-1 rounded-full mb-3">
          404 Error
        </span>

        {/* Main Copy */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-500 max-w-md">
          The route you are trying to access does not exist, has been removed,
          or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-medium hover:border-purple-200 hover:bg-purple-50/50 active:scale-[0.98] transition-all"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-[0.98] transition-all shadow-sm shadow-purple-200"
          >
            <FiHome className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RedirectPage;
