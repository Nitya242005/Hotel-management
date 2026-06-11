import { useLocation, Link } from "react-router-dom";

const NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Reservations",
    href: "/reservations",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Rooms",
    href: "/rooms",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11" />
        <path d="M2 20h20" />
        <path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        <path d="M4 12h3M17 12h3" />
      </svg>
    ),
  },
  {
    label: "Housekeeping",
    href: "/housekeeping",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: "Guest Services",
    href: "/guests",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 shrink-0 bg-brown-espresso flex flex-col min-h-screen border-r border-white/5">
      {/* Section label */}
      <div className="px-5 pt-6 pb-3">
        <p className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-white/30">
          Navigation
        </p>
      </div>

      <nav className="flex flex-col gap-0.5 px-3 flex-1">
        {NAV.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 font-sans text-[13.5px] font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gold-champagne/20 text-gold-champagne border border-gold-champagne/25"
                  : "text-white/55 hover:bg-white/6 hover:text-white/90 border border-transparent"
              }`}
            >
              <span className={isActive ? "text-gold-champagne" : "text-white/40"}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold-champagne" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom decorative section */}
      <div className="mx-3 mb-5 mt-4 rounded-2xl border border-white/8 bg-white/4 p-4">
        <div className="mb-1 text-gold-champagne text-xs font-semibold tracking-wider">★★★★★</div>
        <p className="font-serif text-sm font-semibold text-white/80">Premium Portal</p>
        <p className="font-sans text-[10px] text-white/35 mt-0.5">Hotel Management System</p>
      </div>
    </aside>
  );
}
