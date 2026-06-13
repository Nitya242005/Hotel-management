import { useLocation, Link } from "react-router-dom";

const NAV = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    )
  },
  {
    label: "Reservations",
    href: "/reservations",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    )
  },
  {
    label: "Rooms",
    href: "/rooms",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11" />
        <path d="M2 20h20" />
        <path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        <path d="M4 12h3M17 12h3" />
      </svg>
    )
  },
  {
    label: "Housekeeping",
    href: "/housekeeping",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  },
  {
    label: "Billing",
    href: "/billing",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    )
  },
  {
    label: "Guest Services",
    href: "/guests",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    )
  },
  {
    label: "Reports",
    href: "/reports",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M2 20h20" />
      </svg>
    )
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )
  }
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex flex-col justify-between rounded-[24px] border border-primary/10 bg-white p-6 shadow-[0_20px_50px_rgba(30,111,142,0.04)]">
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-primary to-secondary text-white font-display text-lg font-bold">
              AC
            </div>
            <div>
              <p className="font-display text-sm font-bold tracking-wider text-secondary">AZURE COAST</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">Collection</p>
            </div>
          </div>
          <p className="px-2 text-[10px] font-bold uppercase tracking-[0.24em] text-secondary/30">Hospitality Suite</p>
        </div>

        <nav className="space-y-1">
          {NAV.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group flex items-center gap-3 rounded-[14px] px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-secondary/70 hover:bg-seaglass/50 hover:text-primary"
                }`}
              >
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-[10px] transition-colors ${
                  isActive
                    ? "bg-white/15 text-white"
                    : "bg-seaglass/65 text-secondary/60 group-hover:bg-primary/10 group-hover:text-primary"
                }`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-6">
        <div className="relative overflow-hidden rounded-[20px] h-[190px] mt-6 flex flex-col justify-end p-5">
          <img src="/azure_coast.png" alt="Azure Coast Resort" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent" />
          <div className="relative z-10">
            <p className="font-display text-base font-light text-white leading-tight">Elevating Every Stay</p>
            <p className="text-[9px] text-accent font-semibold mt-1 uppercase tracking-widest">with Oceanfront Hospitality</p>
          </div>
        </div>

        <div className="px-2 text-[10px] text-secondary/40 font-medium leading-relaxed">
          <p>© 2026 Azure Coast Collection.</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </aside>
  );
}
