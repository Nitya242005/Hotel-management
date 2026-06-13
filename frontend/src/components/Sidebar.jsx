import { useLocation, Link } from "react-router-dom";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ) },
  { label: "Reservations", href: "/reservations", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ) },
  { label: "Rooms", href: "/rooms", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11" />
        <path d="M2 20h20" />
        <path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        <path d="M4 12h3M17 12h3" />
      </svg>
    ) },
  { label: "Housekeeping", href: "/housekeeping", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ) },
  { label: "Billing", href: "/billing", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ) },
  { label: "Guest Services", href: "/guests", icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ) },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex min-h-[420px] flex-col justify-between rounded-[24px] border border-slate-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] xl:sticky xl:top-6">
      <div className="space-y-8">
        <div className="space-y-3">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-[22px] bg-slate-950 text-white">
            <span className="text-lg font-semibold">AC</span>
          </div>
          <div>
            <p className="text-base font-semibold tracking-tight text-slate-950">Azure Coast</p>
            <p className="mt-1 text-sm text-slate-500">Hospitality suite</p>
          </div>
        </div>

        <nav className="space-y-2">
          {NAV.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`group flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition ${
                  isActive
                    ? "bg-slate-950 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] bg-slate-100 text-slate-700 group-hover:bg-slate-200">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-[20px] border border-slate-200/70 bg-slate-50 p-5">
        <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Need support?</p>
        <p className="mt-3 text-sm font-semibold text-slate-950">Reach concierge</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">Available 24/7 for operations, billing and guest requests.</p>
      </div>
    </aside>
  );
}
