import { HiTicket } from "react-icons/hi2";

function LoadingScreen({ message = "Loading events...", fullScreen = true }) {
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
        <div className="absolute h-20 w-20 animate-ping rounded-full bg-purple-100 opacity-60 duration-1000" />

        {/* Minimal rotating dash ring */}
        <div className="h-16 w-16 animate-spin rounded-full border-2 border-purple-100 border-t-purple-400 [animation-duration:1.2s]" />

        {/* Center Logo with gentle pulse */}
        <div className="absolute flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 shadow-xs ring-1 ring-purple-200/50">
          <HiTicket className="h-6 w-6 animate-pulse text-purple-500 duration-1000" />
        </div>
      </div>

      {/* Brand Text & Indicator */}
      <div className="mt-5 flex flex-col items-center">
        <span className="text-base font-semibold tracking-tight text-slate-800">
          BookMy<span className="text-purple-500">Event</span>
        </span>

        {message && (
          <p className="mt-1 text-xs font-medium text-slate-400">{message}</p>
        )}
      </div>

      {/* Accessible screen reader text */}
      <span className="sr-only">Loading, please wait...</span>
    </div>
  );
}

export default LoadingScreen;
