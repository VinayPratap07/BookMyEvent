import React from "react";
import {
  FiAlertTriangle,
  FiRefreshCw,
  FiHome,
  FiWifiOff,
  FiInbox,
} from "react-icons/fi";

export type ErrorVariant = "general" | "network" | "notFound";

interface ErrorStateProps {
  /** Title header for the error message */
  title?: string;
  /** Detailed explanatory description */
  description?: string;
  /** Variant style and icon preset */
  variant?: ErrorVariant;
  /** Primary action callback (e.g. refetching data) */
  onRetry?: () => void;
  /** Secondary action callback (e.g. redirecting home) */
  onGoHome?: () => void;
  /** Custom label for retry button */
  retryLabel?: string;
  /** Whether the retry operation is currently pending */
  isRetrying?: boolean;
  /** Renders full-screen if true, or contained in its parent block if false */
  fullScreen?: boolean;
}

const VARIANT_ICONS = {
  general: FiAlertTriangle,
  network: FiWifiOff,
  notFound: FiInbox,
};

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  description,
  variant = "general",
  onRetry,
  onGoHome,
  retryLabel = "Try Again",
  isRetrying = false,
  fullScreen = false,
}) => {
  const IconComponent = VARIANT_ICONS[variant];

  const defaultTitles: Record<ErrorVariant, string> = {
    general: "Something went wrong",
    network: "Connection lost",
    notFound: "No events found",
  };

  const defaultDescriptions: Record<ErrorVariant, string> = {
    general:
      "We couldn't load the requested details. Please try again or head back to browse upcoming events.",
    network: "Check your internet connection and reload the page to continue.",
    notFound:
      "We couldn't locate any events matching your criteria or location. Try clearing your filters.",
  };

  const resolvedTitle = title || defaultTitles[variant];
  const resolvedDescription = description || defaultDescriptions[variant];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex flex-col items-center justify-center p-6 text-center ${
        fullScreen
          ? "fixed inset-0 z-50 min-h-screen w-screen bg-white"
          : "min-h-[380px] w-full rounded-2xl border border-sky-100 bg-sky-50/20"
      }`}
    >
      {/* Icon Capsule with ambient rings */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 rounded-full bg-rose-50" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-100 bg-white text-rose-500 shadow-xs">
          <IconComponent className="h-6 w-6" />
        </div>
      </div>

      {/* Copy */}
      <div className="mt-5 max-w-md">
        <h3 className="text-lg font-bold tracking-tight text-slate-800 sm:text-xl">
          {resolvedTitle}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          {resolvedDescription}
        </p>
      </div>

      {/* Action Buttons */}
      {(onRetry || onGoHome) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <button
              type="button"
              disabled={isRetrying}
              onClick={onRetry}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FiRefreshCw
                className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`}
              />
              <span>{isRetrying ? "Retrying..." : retryLabel}</span>
            </button>
          )}

          {onGoHome && (
            <button
              type="button"
              onClick={onGoHome}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-xs transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-100"
            >
              <FiHome className="h-4 w-4 text-slate-400" />
              <span>Back to Home</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorState;
