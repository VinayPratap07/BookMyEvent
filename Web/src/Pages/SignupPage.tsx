import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
} from "react-icons/fi";
import { FaGoogle, FaApple } from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";
import { signupUser } from "../API/UserApi";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: signupUser,
    onSuccess: () => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
      navigate("/login");
    },
    onError: (error: Error) => {
      console.log("Error response:", error.message);
      setErrors((prev) => ({ ...prev, api: error.message }));
    },
  });

  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength++;
    if (/[A-Z]/.test(pass)) strength++;
    if (/[0-9]/.test(pass)) strength++;
    if (/[^A-Za-z0-9]/.test(pass)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  const getStrengthBarColor = () => {
    if (passwordStrength <= 1) return "bg-rose-400";
    if (passwordStrength === 2) return "bg-amber-400";
    if (passwordStrength === 3) return "bg-sky-400";
    return "bg-emerald-500";
  };

  const getStrengthLabel = () => {
    if (!formData.password) return "";
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!formData.fullName.trim())
      nextErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, "");
    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(cleanPhone)) {
      nextErrors.phone = "Please enter a valid 10-digit number";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      nextErrors.agreeToTerms = "You must agree to the Terms & Privacy Policy";
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
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phoneNo: formData.phone,
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
            Create your account
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
              Or sign up with email
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
                Full Name
              </label>
              <div className="relative mt-1">
                <FiUser className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  name="fullName"
                  disabled={isPending}
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Rahul Sharma"
                  className={`w-full rounded-lg border bg-white py-2 pr-3 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                    errors.fullName
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-[11px] text-rose-500">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Email Address
              </label>
              <div className="relative mt-1">
                <FiMail className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="email"
                  name="email"
                  disabled={isPending}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={`w-full rounded-lg border bg-white py-2 pr-3 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                    errors.email
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] text-rose-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Phone Number
              </label>
              <div className="relative mt-1 flex rounded-lg shadow-2xs">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-200 bg-sky-50/50 px-3 text-xs font-medium text-slate-600">
                  +91
                </span>
                <div className="relative w-full">
                  <FiPhone className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    disabled={isPending}
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="98765 43210"
                    className={`w-full rounded-r-lg border bg-white py-2 pr-3 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                      errors.phone
                        ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                        : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                    }`}
                  />
                </div>
              </div>
              {errors.phone && (
                <p className="mt-1 text-[11px] text-rose-500">{errors.phone}</p>
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

              {formData.password && (
                <div className="mt-2">
                  <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-slate-100">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 transition-all duration-300 ${
                          step <= passwordStrength
                            ? getStrengthBarColor()
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                    <span>Password strength</span>
                    <span className="font-semibold text-slate-600">
                      {getStrengthLabel()}
                    </span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-[11px] text-rose-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Confirm Password
              </label>
              <div className="relative mt-1">
                <FiLock className="pointer-events-none absolute inset-y-0 left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  disabled={isPending}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full rounded-lg border bg-white py-2 pr-9 pl-9 text-xs text-slate-800 placeholder-slate-400 outline-none transition focus:ring-2 disabled:bg-slate-50 sm:text-sm ${
                    errors.confirmPassword
                      ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100"
                      : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff className="h-4 w-4" />
                  ) : (
                    <FiEye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-[11px] text-rose-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  disabled={isPending}
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                />
                <span className="text-xs text-slate-500 leading-tight">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="font-semibold text-sky-600 hover:underline"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-[11px] text-rose-500">
                  {errors.agreeToTerms}
                </p>
              )}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer switch */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-semibold text-sky-600 transition hover:text-sky-700 hover:underline focus:outline-none"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
