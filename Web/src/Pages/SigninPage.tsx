import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { loginUser } from "../API/UserApi";
import { Link, useNavigate } from "react-router-dom";

function SigninPage() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      setFormData({
        identifier: "",
        password: "",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      console.log("Error response:", error.message);
      setErrors((prev) => ({ ...prev, api: error.message }));
    },
  });

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.identifier.trim())
      nextErrors.identifier = "Full name is required";
    if (!formData.password) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name] || errors.api) {
      setErrors((prev) => ({ ...prev, [name]: undefined, api: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    console.log(formData);

    mutate({
      identifier: formData.identifier.trim(),
      password: formData.password,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50/50 via-white to-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-500 shadow-xs">
            <HiTicket className="h-7 w-7" />
          </div>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Log into your account
          </h2>
          <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">
            Join BookMyEvent to reserve tickets, get instant passes, and save
            your favorites.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-8 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50/40"
            >
              <FaGoogle className="h-3.5 w-3.5 text-rose-500" />
              <span>Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50/40"
            >
              <FaApple className="h-4 w-4 text-slate-800" />
              <span>Apple</span>
            </button>
          </div>

          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-slate-200" />
            <span className="absolute bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-400">
              Or sign in with email
            </span>
          </div>

          {errors.api && (
            <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-600">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Email or Phone No.
              </label>
              <div className="relative mt-1">
                <FiUser className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  name="identifier"
                  disabled={isPending}
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="e.g. bookmyevent@gmail.com"
                  className={`w-full rounded-lg border bg-white py-2 pr-3 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                    errors.identifier
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
              </div>
              {errors.identifier && (
                <p className="mt-1 text-[11px] text-rose-500">
                  {errors.identifier}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative mt-1">
                <FiLock className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  disabled={isPending}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className={`w-full rounded-lg border bg-white py-2 pr-9 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                    errors.password
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-sky-400 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer switch */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-sky-600 transition hover:text-sky-700 hover:underline focus:outline-none"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SigninPage;
