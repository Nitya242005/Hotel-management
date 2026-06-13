import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getUser } from "../utils/auth";

const KPI_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v11" />
        <path d="M2 20h20" />
        <path d="M6 7V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v3" />
        <path d="M4 12h3M17 12h3" />
      </svg>
    ),
    iconBg: "bg-primary/10 text-primary",
    title: "Available Rooms",
    value: "42",
    subtitle: "of 68 total rooms",
    trend: "↑ 3 since yesterday",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    iconBg: "bg-accent/15 text-secondary",
    title: "Check-ins Today",
    value: "18",
    subtitle: "3 pending arrivals",
    trend: "↑ 12% vs yesterday",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M2 20h20" />
      </svg>
    ),
    iconBg: "bg-primary/10 text-primary",
    title: "Occupancy Rate",
    value: "76%",
    subtitle: "Optimal density",
    trend: "↑ 4% from yesterday",
  },
  {
    icon: (
      <span className="text-xl font-bold font-display">₹</span>
    ),
    iconBg: "bg-accent/25 text-secondary",
    title: "Revenue Today",
    value: "₹12,48,000",
    subtitle: "Target: ₹15,00,000",
    trend: "↑ 83% of target",
  },
];

const OPERATIONS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    iconBg: "bg-primary/10 text-primary",
    title: "New Reservation",
    description: "Create a new booking",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
      </svg>
    ),
    iconBg: "bg-accent/20 text-secondary",
    title: "Check-In Guest",
    description: "Welcome arriving guests",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    iconBg: "bg-primary/10 text-primary",
    title: "Housekeeping",
    description: "Manage room cleaning",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
      </svg>
    ),
    iconBg: "bg-accent/20 text-secondary",
    title: "Billing",
    description: "Invoices & payments",
  },
];

const GUEST_ACTIVITY = [
  { guest: "Arjun Sharma", room: "Suite 204", activity: "Checked In", time: "10m ago", status: "CHECK-IN", statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200/40" },
  { guest: "Priya Nair", room: "Deluxe 105", activity: "Room Service Completed", time: "42m ago", status: "SERVICE", statusColor: "bg-amber-50 text-amber-700 border-amber-200/40" },
  { guest: "Karthik Reddy", room: "Ocean View 112", activity: "Reservation Confirmed", time: "1h ago", status: "RESERVED", statusColor: "bg-blue-50 text-blue-750 border-blue-200/40" },
  { guest: "Sneha Patel", room: "Suite 308", activity: "Payment Settled", time: "2h ago", status: "SETTLED", statusColor: "bg-seaglass text-primary border-primary/20" },
];

const TODAYS_ARRIVALS = [
  { name: "Arjun Sharma", room: "Suite 204", time: "02:00 PM" },
  { name: "Priya Nair", room: "Deluxe 105", time: "03:30 PM" },
  { name: "Sneha Patel", room: "Ocean View 112", time: "04:00 PM" },
];

const UPCOMING_CHECKOUTS = [
  { name: "Rahul Verma", room: "Suite 302", time: "11:00 AM" },
  { name: "Karthik Reddy", room: "Deluxe 208", time: "12:00 PM" },
  { name: "Neha Joshi", room: "Ocean View 114", time: "01:00 PM" },
];

const HOUSEKEEPING_STATUS = [
  { room: "Suite 201", status: "Clean", color: "bg-emerald-500", staff: "Meena" },
  { room: "Deluxe 305", status: "Cleaning", color: "bg-amber-500", staff: "Ravi" },
  { room: "Deluxe 308", status: "Inspection", color: "bg-blue-500", staff: "Anita" },
  { room: "Ocean View 112", status: "Clean", color: "bg-emerald-500", staff: "Suresh" },
];

const GUEST_SERVICE_REQUESTS = [
  { type: "Extra Towels", guest: "Arjun Sharma", time: "10m ago" },
  { type: "Airport Pickup", guest: "Priya Nair", time: "35m ago" },
  { type: "Restaurant Booking", guest: "Karthik Reddy", time: "1h ago" },
  { type: "Late Check-Out", guest: "Sneha Patel", time: "2h ago" },
];

export default function Dashboard() {
  const user = getUser();
  const displayName = user?.name ? user.name.split(" ")[0] : "Akanksha";

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";
  const formattedDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-16 min-w-0">
        {/* HERO BANNER */}
        <section className="relative overflow-hidden rounded-[24px] min-h-[220px] md:h-[240px] flex items-center shadow-[0_4px_25px_rgba(23,56,79,0.03)]">
          <img
            src="/azure_coast.png"
            alt="Azure Coast Resort"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/75 to-secondary/35" />
          <div className="relative z-10 w-full flex flex-col justify-between h-full p-8 md:p-10 text-white">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-accent">
                Welcome Back
              </p>
              <h1 className="text-3xl md:text-4xl font-light font-display leading-tight">
                {greeting}, <span className="font-semibold">{displayName}</span>
              </h1>
              <p className="text-white/80 text-sm mt-1">
                {formattedDate}
              </p>
            </div>
            
            <div className="mt-6 flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 w-fit border border-white/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-white">All Systems Operational</span>
            </div>
          </div>
        </section>

        {/* KPI CARDS GRID */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 min-w-0">
          {KPI_CARDS.map((card, idx) => (
            <div key={idx} className="bg-white rounded-[20px] border border-primary/10 p-6 md:p-7 shadow-[0_8px_30px_rgba(30,111,142,0.02)] hover:shadow-[0_8px_30px_rgba(30,111,142,0.06)] transition-all duration-300 flex flex-col justify-between min-w-0">
              <div className="flex items-start justify-between gap-4 min-w-0">
                <div className="space-y-2 min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/60 truncate">
                    {card.title}
                  </p>
                  <p className="text-3xl font-extrabold text-secondary truncate">
                    {card.value}
                  </p>
                </div>
                <div className={`h-11 w-11 rounded-[12px] flex items-center justify-center shrink-0 ${card.iconBg}`}>
                  {card.icon}
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-1 min-w-0">
                <p className="text-xs text-secondary/50 truncate">{card.subtitle}</p>
                <p className="text-xs font-bold text-emerald-600 truncate mt-1">
                  {card.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* OPERATIONS CENTER & LIVE GUEST ACTIVITY */}
        <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 min-w-0">
          {/* Operations Center Column (8/12 width) */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col min-w-0">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-secondary/60 mb-4 px-1">
              Operations Center
            </h2>
            <div className="grid gap-6 grid-cols-2 xl:grid-cols-4 flex-1 min-w-0">
              {OPERATIONS.map((op, idx) => (
                <button
                  key={idx}
                  className="group bg-white border border-primary/10 rounded-[20px] p-6 py-8 md:py-10 text-center shadow-[0_8px_30px_rgba(30,111,142,0.02)] hover:border-primary/30 hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-between min-h-[180px] min-w-0 cursor-pointer"
                >
                  <div className={`h-12 w-12 rounded-[14px] flex items-center justify-center transition-transform group-hover:scale-105 shrink-0 ${op.iconBg}`}>
                    {op.icon}
                  </div>
                  <div className="mt-4 min-w-0 w-full">
                    <p className="font-semibold text-secondary text-sm truncate">{op.title}</p>
                    <p className="text-xs text-secondary/50 mt-1.5 max-w-[130px] mx-auto break-words leading-relaxed">{op.description}</p>
                  </div>
                  <span className="text-secondary/25 group-hover:text-primary transition-colors text-base font-bold mt-4">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Live Guest Activity Column (4/12 width) */}
          <div className="lg:col-span-5 xl:col-span-4 min-w-0">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-secondary/60">
                Live Guest Activity
              </h2>
              <button className="text-xs font-bold text-primary hover:text-accent transition-colors">
                View all
              </button>
            </div>
            <div className="bg-white border border-primary/10 rounded-[24px] shadow-[0_8px_30px_rgba(30,111,142,0.02)] overflow-hidden min-w-0">
              <div className="divide-y divide-primary/5">
                {GUEST_ACTIVITY.map((item, idx) => (
                  <div key={idx} className="p-5 hover:bg-seaglass/10 transition-colors flex items-center justify-between gap-4 min-w-0">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0"></div>
                        <p className="text-sm font-bold text-secondary truncate">{item.guest}</p>
                      </div>
                      <p className="text-xs text-secondary/50 mt-1 truncate">
                        {item.activity} • <span className="font-semibold text-primary">{item.room}</span>
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 shrink-0 min-w-0">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border shrink-0 ${item.statusColor}`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-secondary/40 font-medium shrink-0">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATUS TABLES */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 min-w-0">
          
          {/* TODAY'S ARRIVALS */}
          <div className="bg-white border border-primary/10 rounded-[24px] shadow-[0_8px_30px_rgba(30,111,142,0.02)] overflow-hidden flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between bg-seaglass/35 px-5 py-4 border-b border-primary/5 min-w-0">
                <h3 className="font-bold text-secondary text-xs uppercase tracking-wider truncate">Today's Arrivals</h3>
                <button className="text-xs font-bold text-primary hover:underline shrink-0">View all</button>
              </div>
              <div className="p-4 min-w-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-0 table-fixed">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-secondary/40 border-b border-primary/5">
                      <th className="py-2.5 px-2 font-semibold w-2/5 truncate">Guest</th>
                      <th className="py-2.5 px-2 font-semibold w-1/3 truncate">Room</th>
                      <th className="py-2.5 px-2 font-semibold text-right w-1/4 truncate">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {TODAYS_ARRIVALS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-seaglass/10 transition-colors">
                        <td className="py-3.5 px-2 text-sm font-bold text-secondary truncate" title={item.name}>{item.name}</td>
                        <td className="py-3.5 px-2 text-sm text-primary font-semibold truncate">{item.room}</td>
                        <td className="py-3.5 px-2 text-sm text-accent font-semibold text-right truncate">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-primary/5 bg-seaglass/10 shrink-0">
              <button className="w-full text-center py-2.5 bg-white hover:bg-seaglass/45 border border-primary/10 rounded-[12px] text-xs font-bold text-primary transition-all">
                + 3 more arrivals →
              </button>
            </div>
          </div>

          {/* UPCOMING CHECK-OUTS */}
          <div className="bg-white border border-primary/10 rounded-[24px] shadow-[0_8px_30px_rgba(30,111,142,0.02)] overflow-hidden flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between bg-seaglass/35 px-5 py-4 border-b border-primary/5 min-w-0">
                <h3 className="font-bold text-secondary text-xs uppercase tracking-wider truncate">Upcoming Check-Outs</h3>
                <button className="text-xs font-bold text-primary hover:underline shrink-0">View all</button>
              </div>
              <div className="p-4 min-w-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-0 table-fixed">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-secondary/40 border-b border-primary/5">
                      <th className="py-2.5 px-2 font-semibold w-2/5 truncate">Guest</th>
                      <th className="py-2.5 px-2 font-semibold w-1/3 truncate">Room</th>
                      <th className="py-2.5 px-2 font-semibold text-right w-1/4 truncate">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {UPCOMING_CHECKOUTS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-seaglass/10 transition-colors">
                        <td className="py-3.5 px-2 text-sm font-bold text-secondary truncate" title={item.name}>{item.name}</td>
                        <td className="py-3.5 px-2 text-sm text-primary font-semibold truncate">{item.room}</td>
                        <td className="py-3.5 px-2 text-sm text-accent font-semibold text-right truncate">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-primary/5 bg-seaglass/10 shrink-0">
              <button className="w-full text-center py-2.5 bg-white hover:bg-seaglass/45 border border-primary/10 rounded-[12px] text-xs font-bold text-primary transition-all">
                + 2 more check-outs →
              </button>
            </div>
          </div>

          {/* HOUSEKEEPING STATUS */}
          <div className="bg-white border border-primary/10 rounded-[24px] shadow-[0_8px_30px_rgba(30,111,142,0.02)] overflow-hidden flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between bg-seaglass/35 px-5 py-4 border-b border-primary/5 min-w-0">
                <h3 className="font-bold text-secondary text-xs uppercase tracking-wider truncate">Housekeeping Status</h3>
                <button className="text-xs font-bold text-primary hover:underline shrink-0">View all</button>
              </div>
              <div className="p-4 min-w-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-0 table-fixed">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-secondary/40 border-b border-primary/5">
                      <th className="py-2.5 px-2 font-semibold w-1/3 truncate">Room</th>
                      <th className="py-2.5 px-2 font-semibold w-2/5 truncate">Status</th>
                      <th className="py-2.5 px-2 font-semibold text-right w-1/4 truncate">Staff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {HOUSEKEEPING_STATUS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-seaglass/10 transition-colors">
                        <td className="py-3.5 px-2 text-sm font-bold text-secondary truncate">{item.room}</td>
                        <td className="py-3.5 px-2 text-sm font-medium truncate">
                          <span className="inline-flex items-center gap-1.5 truncate">
                            <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${item.color}`} />
                            <span className="truncate">{item.status}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-2 text-sm text-primary font-semibold text-right truncate">{item.staff}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-primary/5 bg-seaglass/10 shrink-0">
              <button className="w-full text-center py-2.5 bg-white hover:bg-seaglass/45 border border-primary/10 rounded-[12px] text-xs font-bold text-primary transition-all">
                + 4 more rooms →
              </button>
            </div>
          </div>

          {/* GUEST SERVICE REQUESTS */}
          <div className="bg-white border border-primary/10 rounded-[24px] shadow-[0_8px_30px_rgba(30,111,142,0.02)] overflow-hidden flex flex-col justify-between min-w-0">
            <div className="min-w-0">
              <div className="flex items-center justify-between bg-seaglass/35 px-5 py-4 border-b border-primary/5 min-w-0">
                <h3 className="font-bold text-secondary text-xs uppercase tracking-wider truncate">Guest Services</h3>
                <button className="text-xs font-bold text-primary hover:underline shrink-0">View all</button>
              </div>
              <div className="p-4 min-w-0 overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-0 table-fixed">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-secondary/40 border-b border-primary/5">
                      <th className="py-2.5 px-2 font-semibold w-2/5 truncate">Request</th>
                      <th className="py-2.5 px-2 font-semibold w-1/3 truncate">Guest</th>
                      <th className="py-2.5 px-2 font-semibold text-right w-1/4 truncate">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-primary/5">
                    {GUEST_SERVICE_REQUESTS.map((item, idx) => (
                      <tr key={idx} className="hover:bg-seaglass/10 transition-colors">
                        <td className="py-3.5 px-2 text-sm font-bold text-secondary truncate" title={item.type}>{item.type}</td>
                        <td className="py-3.5 px-2 text-sm text-primary font-semibold truncate">{item.guest}</td>
                        <td className="py-3.5 px-2 text-xs text-secondary/50 font-medium text-right truncate">{item.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4 border-t border-primary/5 bg-seaglass/10 shrink-0">
              <button className="w-full text-center py-2.5 bg-white hover:bg-seaglass/45 border border-primary/10 rounded-[12px] text-xs font-bold text-primary transition-all">
                + 2 more requests →
              </button>
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
