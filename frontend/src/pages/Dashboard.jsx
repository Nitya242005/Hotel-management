import DashboardLayout from "../layouts/DashboardLayout";
import { getUser } from "../utils/auth";

const STATS = [
  {
    label: "Available Rooms",
    value: "42",
    sub: "of 68 total",
    color: "from-gold-champagne/20 to-beige-warm/40",
    border: "border-gold-champagne/25",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-gold-champagne">
        <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11" />
        <path d="M2 20h20" /><path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        <path d="M7 13h4v7H7zM13 13h4v7h-4z" />
      </svg>
    ),
  },
  {
    label: "Today's Check-ins",
    value: "18",
    sub: "3 pending arrival",
    color: "from-bronze-soft/15 to-beige-warm/30",
    border: "border-bronze-soft/25",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-bronze-soft">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M19 8l2 2-2 2M21 10h-6" />
      </svg>
    ),
  },
  {
    label: "Occupancy Rate",
    value: "76%",
    sub: "+4% from yesterday",
    color: "from-gold-champagne/15 to-ivory/60",
    border: "border-gold-champagne/20",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-gold-champagne">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M2 20h20" />
      </svg>
    ),
  },
  {
    label: "Revenue Today",
    value: "$12.4k",
    sub: "Target: $15k",
    color: "from-brown-espresso/8 to-beige-warm/40",
    border: "border-brown-espresso/15",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-brown-espresso">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

const QUICK_ACTIONS = [
  {
    label: "New Reservation",
    desc: "Book a room for a guest",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18M12 14v4M10 16h4" />
      </svg>
    ),
  },
  {
    label: "Check-in Guest",
    desc: "Process today's arrivals",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
      </svg>
    ),
  },
  {
    label: "Housekeeping",
    desc: "Assign cleaning tasks",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Generate Invoice",
    desc: "Billing and payments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
  },
];

const RECENT_ACTIVITY = [
  { guest: "Priya Sharma", action: "Checked in", room: "Suite 201", time: "10 mins ago", status: "in" },
  { guest: "Rahul Mehta", action: "Checked out", room: "Deluxe 105", time: "42 mins ago", status: "out" },
  { guest: "Ananya Patel", action: "Reservation confirmed", room: "Premium 308", time: "1 hr ago", status: "reserved" },
  { guest: "Vikram Singh", action: "Room service", room: "Suite 202", time: "2 hrs ago", status: "service" },
  { guest: "Neha Joshi", action: "Checked in", room: "Classic 112", time: "3 hrs ago", status: "in" },
];

const STATUS_STYLES = {
  in: "bg-gold-champagne/15 text-gold-champagne border border-gold-champagne/30",
  out: "bg-brown-espresso/10 text-brown-espresso border border-brown-espresso/20",
  reserved: "bg-bronze-soft/15 text-bronze-soft border border-bronze-soft/25",
  service: "bg-beige-warm text-bronze-soft border border-bronze-soft/20",
};

export default function Dashboard() {
  const user = getUser();

  return (
    <DashboardLayout>
      {/* Welcome Section */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-2 mb-1">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-champagne animate-pulse" />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-bronze-soft">
            Live Dashboard
          </span>
        </div>
        <h1 className="font-serif text-3xl font-semibold text-brown-espresso leading-tight">
          Welcome back{user?.name ? `, ${user.name}` : ""}
        </h1>
        <p className="mt-1 font-sans text-sm font-light text-brown-espresso/60">
          Here's what's happening at your hotel today.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.color} p-5 shadow-[0_4px_20px_rgba(59,47,47,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,47,47,0.08)] backdrop-blur-sm`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 border border-white/80 shadow-sm">
                {stat.icon}
              </div>
            </div>
            <div className="font-serif text-3xl font-bold text-brown-espresso leading-none mb-1">
              {stat.value}
            </div>
            <div className="font-sans text-sm font-medium text-brown-espresso/80 mb-0.5">
              {stat.label}
            </div>
            <div className="font-sans text-[11px] text-bronze-soft/80">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Lower Grid: Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h2 className="font-serif text-lg font-semibold text-brown-espresso mb-4">
            Quick Actions
          </h2>
          <div className="flex flex-col gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.label}
                className="flex items-center gap-4 rounded-2xl border border-beige-warm bg-white/60 px-4 py-3.5 text-left shadow-[0_2px_12px_rgba(59,47,47,0.04)] transition-all duration-200 hover:border-gold-champagne/40 hover:bg-white hover:shadow-[0_4px_20px_rgba(212,168,79,0.1)] backdrop-blur-sm group"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-beige-warm bg-ivory text-bronze-soft transition-all duration-200 group-hover:border-gold-champagne/40 group-hover:bg-gold-champagne/10 group-hover:text-gold-champagne">
                  {action.icon}
                </div>
                <div>
                  <div className="font-sans text-sm font-semibold text-brown-espresso group-hover:text-brown-espresso">
                    {action.label}
                  </div>
                  <div className="font-sans text-[11px] text-bronze-soft/70">
                    {action.desc}
                  </div>
                </div>
                <svg className="ml-auto text-bronze-soft/30 group-hover:text-gold-champagne transition-colors" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-lg font-semibold text-brown-espresso mb-4">
            Recent Activity
          </h2>
          <div className="rounded-2xl border border-beige-warm bg-white/60 shadow-[0_2px_12px_rgba(59,47,47,0.04)] overflow-hidden backdrop-blur-sm">
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-5 py-4 transition-colors duration-150 hover:bg-gold-champagne/5 ${
                  i < RECENT_ACTIVITY.length - 1 ? "border-b border-beige-warm/60" : ""
                }`}
              >
                {/* Avatar */}
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-beige-warm to-ivory border border-gold-champagne/20">
                  <span className="font-serif text-sm font-bold text-brown-espresso">
                    {item.guest.charAt(0)}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-sm font-semibold text-brown-espresso truncate">
                    {item.guest}
                  </div>
                  <div className="font-sans text-[11px] text-bronze-soft/70 truncate">
                    {item.action} · <span className="font-medium text-bronze-soft">{item.room}</span>
                  </div>
                </div>

                {/* Status badge */}
                <span className={`shrink-0 rounded-full px-2.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[item.status]}`}>
                  {item.status === "in" ? "Check In" : item.status === "out" ? "Check Out" : item.status === "reserved" ? "Reserved" : "Service"}
                </span>

                {/* Time */}
                <span className="shrink-0 font-sans text-[11px] text-brown-espresso/40 hidden sm:block">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
