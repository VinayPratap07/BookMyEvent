import { useNavigate, useLocation } from "react-router-dom";
import {
  FiCheckCircle,
  FiArrowRight,
  FiDownload,
  FiShoppingBag,
  FiHash,
  FiCalendar,
  FiCreditCard,
} from "react-icons/fi";

function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract query params if passed via redirection (e.g., /payment-success?txn=TXN_98721&amount=49.99)
  const searchParams = new URLSearchParams(location.search);
  const transactionId = searchParams.get("txn") || "TXN-984210385";
  const amount = searchParams.get("amount") || "$49.99";
  const paymentMethod = searchParams.get("method") || "Card ending in 4242";

  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-8 sm:p-12 font-sans text-gray-800 flex flex-col items-center text-center">
      {/* Success Badge */}
      <div className="w-20 h-20 rounded-full bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-6 shadow-inner">
        <FiCheckCircle className="w-10 h-10 stroke-[2.2]" />
      </div>

      <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-3.5 py-1 rounded-full mb-3">
        Payment Completed
      </span>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        Thank you for your order!
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-500 max-w-md">
        Your payment was processed successfully. A confirmation receipt and
        invoice have been dispatched to your email.
      </p>

      {/* Payment Details Card */}
      <div className="w-full max-w-md mt-8 p-6 rounded-2xl border border-purple-100/80 bg-purple-50/20 text-left space-y-4">
        {/* Total Paid */}
        <div className="flex justify-between items-baseline pb-4 border-b border-purple-100/60">
          <span className="text-sm font-medium text-gray-500">Amount Paid</span>
          <span className="text-2xl font-black text-gray-900 tracking-tight">
            {amount}
          </span>
        </div>

        {/* Transaction ID */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-gray-500 font-medium">
            <FiHash className="w-4 h-4 text-purple-600" />
            Transaction ID
          </span>
          <span className="font-mono font-semibold text-gray-800">
            {transactionId}
          </span>
        </div>

        {/* Date & Time */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-gray-500 font-medium">
            <FiCalendar className="w-4 h-4 text-purple-600" />
            Payment Date
          </span>
          <span className="font-semibold text-gray-800">{formattedDate}</span>
        </div>

        {/* Payment Method */}
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="flex items-center gap-2 text-gray-500 font-medium">
            <FiCreditCard className="w-4 h-4 text-purple-600" />
            Payment Method
          </span>
          <span className="font-semibold text-gray-800">{paymentMethod}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:border-purple-200 hover:bg-purple-50/50 active:scale-[0.98] transition-all"
        >
          <FiDownload className="w-4 h-4 text-purple-600" />
          <span>Receipt</span>
        </button>

        <button
          type="button"
          onClick={() => navigate("/orders")}
          className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white text-sm font-semibold hover:bg-purple-700 active:scale-[0.98] transition-all shadow-sm shadow-purple-200"
        >
          <FiShoppingBag className="w-4 h-4" />
          <span>View Orders</span>
          <FiArrowRight className="w-3.5 h-3.5 ml-0.5" />
        </button>
      </div>
    </div>
  );
}

export default PaymentSuccess;
