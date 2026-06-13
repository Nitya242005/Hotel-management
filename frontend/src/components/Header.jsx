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

  const displayName = user?.name || "Akanksha Gupta";
  const displayRole = user?.role || "Hotel Administrator";

  return (
    <header className="sticky top-0 z-30 h-[72px] w-full rounded-[20px] border border-primary/10 bg-white/90 shadow-[0_8px_30px_rgba(30,111,142,0.04)] backdrop-blur-md">
      <div className="flex h-full items-center justify-between gap-4 px-6">
        {/* Search Bar */}
        <div className="min-w-0 flex-1 max-w-md">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary/40">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7.2" />
                <path d="M21 21l-4.5-4.5" />
              </svg>
            </span>
            <input
              type="search"
              placeholder="Search guests, rooms, bookings..."
              className="h-[44px] w-full rounded-[14px] border border-primary/10 bg-seaglass/50 pl-11 pr-4 text-sm text-secondary placeholder:text-primary/40 focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/10 transition-all duration-200"
            />
          </label>
        </div>

        {/* Action Controls & Profile */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            type="button"
            className="relative inline-flex h-[44px] w-[44px] items-center justify-center rounded-[14px] border border-primary/10 bg-white text-primary transition-all hover:border-primary/20 hover:bg-seaglass/40"
            aria-label="Notifications"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-white">
              3
            </span>
          </button>

          {/* Messages */}
          <button
            type="button"
            className="relative inline-flex h-[44px] w-[44px] items-center justify-center rounded-[14px] border border-primary/10 bg-white text-primary transition-all hover:border-primary/20 hover:bg-seaglass/40"
            aria-label="Messages"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-secondary ring-2 ring-white">
              2
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex items-center gap-3 rounded-[14px] border border-primary/10 bg-white p-2 pr-4 text-sm font-semibold text-secondary transition-all hover:border-primary/20 hover:shadow-sm"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-sm shadow-primary/10">
                {displayName.charAt(0).toUpperCase()}
              </span>
              <span className="hidden md:block text-left">
                <span className="block text-sm font-semibold text-secondary leading-tight">{displayName}</span>
                <span className="block text-[10px] uppercase tracking-wider text-primary/60 mt-0.5">{displayRole}</span>
              </span>
              <svg
                className={`h-3.5 w-3.5 text-primary/40 transition-transform duration-250 ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-3 w-56 overflow-hidden rounded-[16px] border border-primary/10 bg-white shadow-[0_12px_40px_rgba(30,111,142,0.12)]">
                <div className="space-y-0.5 p-2">
                  <button
                    type="button"
                    className="w-full rounded-[10px] px-4 py-2.5 text-left text-sm text-secondary hover:bg-seaglass/40 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-[10px] px-4 py-2.5 text-left text-sm text-secondary hover:bg-seaglass/40 transition-colors"
                  >
                    Settings
                  </button>
                </div>
                <div className="border-t border-primary/10 p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-[10px] bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-primary/10 hover:shadow-md transition-all"
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
