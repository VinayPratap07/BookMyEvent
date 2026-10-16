import React from "react";
import { HiTicket } from "react-icons/hi2";

interface LoadingScreenProps {
  /** Optional loading message displayed underneath */
  message?: string;
  /** If true, covers the entire viewport as an overlay; if false, fits its parent container */
  fullScreen?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading events...",
  fullScreen = true,
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs ${
        fullScreen ? "fixed inset-0 z-50 min-h-screen w-screen" : "h-64 w-full"
      }`}
    >
      {/* Animated Logo Container */}
      <div className="relative flex items-center justify-center">
        {/* Soft pulsing halo glow */}
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-sky-100 opacity-60 duration-1000" />

        {/* Minimal rotating dash ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-sky-100 border-t-sky-400 [animation-duration:1.2s]" />

        {/* Center Logo with gentle pulse */}
        <div className="absolute flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 shadow-xs ring-1 ring-sky-200/50">
          <HiTicket className="h-6 w-6 animate-pulse text-sky-500 duration-1000" />
        </div>
      </div>

      {/* Brand Text & Indicator */}
      <div className="mt-5 flex flex-col items-center">
        <span className="text-base font-semibold tracking-tight text-slate-800">
          BookMy<span className="text-sky-500">Event</span>
        </span>

        {message && (
          <p className="mt-1 text-xs font-medium text-slate-400">{message}</p>
        )}
      </div>

      {/* Accessible screen reader text */}
      <span className="sr-only">Loading, please wait...</span>
    </div>
  );
};

export default LoadingScreen;
