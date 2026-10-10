import React, { useState } from "react";
import {
  FiMail,
  FiArrowRight,
  FiPhone,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { HiTicket } from "react-icons/hi2";

interface FooterLinkSection {
  title: string;
  links: { label: string; href: string }[];
}

const FOOTER_SECTIONS: FooterLinkSection[] = [
  {
    title: "Categories",
    links: [
      { label: "Movies & Cinema", href: "#" },
      { label: "Live Concerts", href: "#" },
      { label: "Stand-up Comedy", href: "#" },
      { label: "Theatre & Plays", href: "#" },
      { label: "Sports & Fitness", href: "#" },
      { label: "Workshops & Expos", href: "#" },
    ],
  },
  {
    title: "Cities",
    links: [
      { label: "Delhi-NCR", href: "#" },
      { label: "Mumbai", href: "#" },
      { label: "Bengaluru", href: "#" },
      { label: "Hyderabad", href: "#" },
      { label: "Pune", href: "#" },
      { label: "Kolkata", href: "#" },
    ],
  },
  {
    title: "Help & Support",
    links: [
      { label: "About Us", href: "#" },
      { label: "Help Center & FAQs", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Refund Policy", href: "#" },
      { label: "List Your Event", href: "#" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full border-t border-sky-100 bg-white text-slate-600">
      {/* Top Banner: Newsletter Subscription */}
      <div className="border-b border-sky-100/80 bg-gradient-to-r from-sky-50/70 via-sky-50/30 to-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="max-w-md text-center md:text-left">
            <h3 className="text-xl font-bold tracking-tight text-slate-800">
              Never miss an unforgettable show
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Get early access tickets, weekend event drops, and exclusive
              discounts straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            {isSubscribed ? (
              <div className="flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 px-4 py-2.5 text-sm font-medium text-sky-700">
                <FiCheckCircle className="h-4 w-4 shrink-0 text-sky-500" />
                <span>You're subscribed! We'll keep you in the loop.</span>
              </div>
            ) : (
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <FiMail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pr-28 pl-10 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-md bg-sky-400 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs transition hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 active:bg-sky-600"
                >
                  <span>Subscribe</span>
                  <FiArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info & Address */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-500">
                <HiTicket className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">
                BookMy<span className="text-sky-500">Event</span>
              </span>
            </div>

            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-slate-500">
              The premier destination to discover, reserve, and manage ticketing
              for concerts, movies, theatre, and sports across major Indian
              metropolitans.
            </p>

            <div className="mt-5 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <FiMapPin className="h-4 w-4 shrink-0 text-sky-400" />
                <span>Sector 62, Noida, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <FiPhone className="h-4 w-4 shrink-0 text-sky-400" />
                <span>+91 (011) 4567-8900</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-500"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation Columns */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-800">
                {section.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-500 transition hover:text-sky-500"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-sky-100/70 bg-sky-50/30 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 text-xs text-slate-400 sm:flex-row sm:px-6 lg:px-8">
          <p>
            © {new Date().getFullYear()} BookMyEvent Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-sky-500">
              Security
            </a>
            <a href="#" className="hover:text-sky-500">
              Cookie Settings
            </a>
            <a href="#" className="hover:text-sky-500">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
