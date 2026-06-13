import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Header() {
  const user = getUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 h-[72px] w-full rounded-[16px] border border-[#1E6F8E]/15 bg-white/90 shadow-[0_8px_20px_rgba(30,111,142,0.08)] backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-[1600px] items-center justify-between gap-4 px-4 md:px-0">
        <div className="min-w-0 flex-1">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#1E6F8E]/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7.2" />
                <path d="M21 21l-4.5-4.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search guests, rooms, bookings..."
              className="h-[48px] w-full rounded-[14px] border border-[#1E6F8E]/10 bg-[#EAF4F6] pl-12 pr-4 text-sm text-[#17384F] placeholder:text-[#1E6F8E]/50 focus:border-[#1E6F8E]/30 focus:outline-none focus:ring-2 focus:ring-[#1E6F8E]/10"
            />
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="relative inline-flex h-[48px] w-[48px] items-center justify-center rounded-[14px] border border-[#1E6F8E]/10 bg-white text-[#1E6F8E] transition hover:border-[#1E6F8E]/20 hover:bg-[#EAF4F6]"
            aria-label="Notifications"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#D9B77A] ring-2 ring-white" />
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center gap-3 rounded-[14px] border border-[#1E6F8E]/10 bg-white px-4 py-3 text-sm font-semibold text-[#17384F] transition hover:border-[#1E6F8E]/20 hover:shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-gradient-to-br from-[#1E6F8E] to-[#17384F] text-sm font-semibold text-white">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </span>
              <span className="hidden sm:block text-left">
                <span className="block text-sm font-semibold text-[#17384F]">{user?.name || "Hotel Manager"}</span>
                <span className="block text-xs uppercase tracking-[0.24em] text-[#1E6F8E]/60">Hotel Admin</span>
              </span>
              <svg
                className={`h-3 w-3 text-[#1E6F8E]/50 transition-transform duration-200 ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-3 w-56 overflow-hidden rounded-[16px] border border-[#1E6F8E]/15 bg-white shadow-[0_12px_32px_rgba(30,111,142,0.15)]">
                <div className="space-y-1 p-3">
                  <button
                    type="button"
                    className="w-full rounded-[12px] px-4 py-3 text-left text-sm text-[#1E6F8E] transition hover:bg-[#EAF4F6]"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-[12px] px-4 py-3 text-left text-sm text-[#1E6F8E] transition hover:bg-[#EAF4F6]"
                  >
                    Settings
                  </button>
                </div>
                <div className="border-t border-[#1E6F8E]/10 px-3 py-3">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-[12px] bg-gradient-to-r from-[#1E6F8E] to-[#17384F] px-4 py-3 text-sm font-semibold text-white transition hover:shadow-md"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
