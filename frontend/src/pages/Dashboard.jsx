import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getUser } from "../utils/auth";

const KPI_CARDS = [
  {
    icon: "🛏️",
    title: "Available Rooms",
    value: "42",
    subtitle: "of 68 total rooms",
    trend: "↑ 3 since yesterday",
  },
  {
    icon: "👋",
    title: "Check-ins Today",
    value: "18",
    subtitle: "3 pending arrivals",
    trend: "↑ 12% vs yesterday",
  },
  {
    icon: "📊",
    title: "Occupancy Rate",
    value: "76%",
    subtitle: "Optimal density",
    trend: "↑ 4% from yesterday",
  },
  {
    icon: "₹",
    title: "Revenue Today",
    value: "₹12,48,000",
    subtitle: "Target: ₹15,00,000",
    trend: "↑ 83% of target",
  },
];

const OPERATIONS = [
  { icon: "📋", title: "New Reservation", description: "Create guest bookings" },
  { icon: "👋", title: "Check-In Guest", description: "Welcome arrivals" },
  { icon: "🧹", title: "Housekeeping", description: "Manage room cleaning" },
  { icon: "📄", title: "Billing", description: "Invoices & payments" },
];

const GUEST_ACTIVITY = [
  { guest: "Arjun Sharma", room: "Suite 204", activity: "Checked in", time: "10m ago", status: "CHECK-IN" },
  { guest: "Priya Nair", room: "Deluxe 105", activity: "Room Service Completed", time: "42m ago", status: "SERVICE" },
  { guest: "Sneha Patel", room: "Premium 308", activity: "Reservation Confirmed", time: "1h ago", status: "RESERVED" },
  { guest: "Karthik Reddy", room: "Suite 202", activity: "Payment Settled", time: "2h ago", status: "SETTLED" },
];

const TODAYS_ARRIVALS = [
  { name: "Arjun Sharma", room: "Suite 204", time: "02:00 PM" },
  { name: "Priya Nair", room: "Deluxe 105", time: "03:30 PM" },
  { name: "Sneha Patel", room: "Ocean View 112", time: "04:50 PM" },
];

const UPCOMING_CHECKOUTS = [
  { name: "Rahul Verma", room: "Suite 502", time: "11:00 AM" },
  { name: "Karthik Reddy", room: "Deluxe 208", time: "12:00 PM" },
];

const HOUSEKEEPING_STATUS = [
  { room: "Suite 201", status: "Clean", staff: "Ravi", checked: true },
  { room: "Deluxe 305", status: "Cleaning", staff: "Rani", checked: false },
  { room: "Deluxe 308", status: "Inspection", staff: "Anita", checked: false },
  { room: "Ocean View 112", status: "Clean", staff: "Suresh", checked: true },
];

const GUEST_SERVICE_REQUESTS = [
  { type: "Airport Pickup", guest: "Arjun Sharma", time: "10m ago" },
  { type: "Restaurant Booking", guest: "Priya Nair", time: "35m ago" },
  { type: "Late Check-Out", guest: "Karthik Reddy", time: "1h ago" },
  { type: "Spa Booking", guest: "Sneha Patel", time: "2h ago" },
];

export default function Dashboard() {
  const user = getUser();
  const firstName = user?.name ? user.name.split(" ")[0] : "Guest";

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
      <div className="space-y-6 pb-12">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden rounded-[24px] h-[280px]">
          <img
            src="/azure_coast.png"
            alt="Azure Coast Resort"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E6F8E]/70 via-[#1E6F8E]/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#D9B77A]">
                Welcome back
              </p>
              <h1 className="mt-3 text-5xl font-light text-white">
                {greeting}, <span className="font-semibold">{firstName}</span>
              </h1>
            </div>
            <p className="text-white/90 text-base max-w-2xl leading-relaxed">
              {formattedDate}
            </p>
          </div>
        </section>

        {/* KPI CARDS */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {KPI_CARDS.map((card) => (
            <div key={card.title} className="acg-dash-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#1E6F8E]/60">
                    {card.title}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-[#17384F]">
                    {card.value}
                  </p>
                </div>
                <div className="text-3xl">{card.icon}</div>
              </div>
              <p className="text-xs text-[#1E6F8E]/70 mb-2">{card.subtitle}</p>
              <p className="text-xs font-semibold text-[#D9B77A]">{card.trend}</p>
            </div>
          ))}
        </div>

        {/* OPERATIONS CENTER */}
        <section>
          <h2 className="text-base font-semibold uppercase tracking-[0.3em] text-[#1E6F8E]/60 mb-4">
            Operations Center
          </h2>
          <div className="grid gap-6 grid-cols-2 xl:grid-cols-4">
            {OPERATIONS.map((op) => (
              <div key={op.title} className="acg-dash-card p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl mb-3">{op.icon}</div>
                <p className="font-semibold text-[#17384F] text-sm">{op.title}</p>
                <p className="text-xs text-[#1E6F8E]/60 mt-1">{op.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <div className="grid gap-6 xl:grid-cols-4">
          {/* LEFT COLUMN - GUEST ACTIVITY */}
          <div className="xl:col-span-1">
            <div className="acg-dash-card overflow-hidden">
              <div className="bg-[#EAF4F6] px-6 py-4 border-b border-[#1E6F8E]/10">
                <h3 className="font-semibold text-[#17384F] text-sm">LIVE GUEST ACTIVITY</h3>
              </div>
              <div className="divide-y divide-[#1E6F8E]/10">
                {GUEST_ACTIVITY.map((item, idx) => (
                  <div key={idx} className="p-4">
                    <p className="text-xs font-semibold text-[#17384F]">{item.guest}</p>
                    <p className="text-xs text-[#1E6F8E]/60 mt-1">
                      {item.activity} • {item.room}
                    </p>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <span className="inline-block px-2 py-1 bg-[#EAF4F6] text-[#1E6F8E] text-xs font-semibold rounded-full">
                        {item.status}
                      </span>
                      <span className="text-xs text-[#1E6F8E]/60">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMNS - 3 COLUMN GRID */}
          <div className="xl:col-span-3 grid gap-6 grid-cols-1 sm:grid-cols-3">
            {/* TODAY'S ARRIVALS */}
            <div className="acg-dash-card overflow-hidden">
              <div className="bg-[#EAF4F6] px-6 py-4 border-b border-[#1E6F8E]/10">
                <h3 className="font-semibold text-[#17384F] text-sm">TODAY'S ARRIVALS</h3>
              </div>
              <div className="divide-y divide-[#1E6F8E]/10">
                {TODAYS_ARRIVALS.map((item, idx) => (
                  <div key={idx} className="p-4">
                    <p className="text-xs font-semibold text-[#17384F]">{item.name}</p>
                    <p className="text-xs text-[#1E6F8E]/60 mt-1">{item.room}</p>
                    <p className="text-xs text-[#D9B77A] font-semibold mt-2">{item.time}</p>
                  </div>
                ))}
                <div className="px-4 py-3 text-center">
                  <p className="text-xs text-[#1E6F8E] font-semibold cursor-pointer hover:text-[#D9B77A]">
                    + 3 more arrivals →
                  </p>
                </div>
              </div>
            </div>

            {/* UPCOMING CHECK-OUTS */}
            <div className="acg-dash-card overflow-hidden">
              <div className="bg-[#EAF4F6] px-6 py-4 border-b border-[#1E6F8E]/10">
                <h3 className="font-semibold text-[#17384F] text-sm">UPCOMING CHECK-OUTS</h3>
              </div>
              <div className="divide-y divide-[#1E6F8E]/10">
                {UPCOMING_CHECKOUTS.map((item, idx) => (
                  <div key={idx} className="p-4">
                    <p className="text-xs font-semibold text-[#17384F]">{item.name}</p>
                    <p className="text-xs text-[#1E6F8E]/60 mt-1">{item.room}</p>
                    <p className="text-xs text-[#D9B77A] font-semibold mt-2">{item.time}</p>
                  </div>
                ))}
                <div className="px-4 py-3 text-center">
                  <p className="text-xs text-[#1E6F8E] font-semibold cursor-pointer hover:text-[#D9B77A]">
                    + 2 more check-outs →
                  </p>
                </div>
              </div>
            </div>

            {/* HOUSEKEEPING STATUS */}
            <div className="acg-dash-card overflow-hidden">
              <div className="bg-[#EAF4F6] px-6 py-4 border-b border-[#1E6F8E]/10">
                <h3 className="font-semibold text-[#17384F] text-sm">HOUSEKEEPING STATUS</h3>
              </div>
              <div className="divide-y divide-[#1E6F8E]/10">
                {HOUSEKEEPING_STATUS.map((item, idx) => (
                  <div key={idx} className="p-4">
                    <p className="text-xs font-semibold text-[#17384F]">{item.room}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${item.checked ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {item.status === "Clean" ? "✓ Clean" : item.status === "Cleaning" ? "● Cleaning" : "⚠ Inspection"}
                      </span>
                    </div>
                    <p className="text-xs text-[#1E6F8E]/60 mt-1">{item.staff}</p>
                  </div>
                ))}
                <div className="px-4 py-3 text-center">
                  <p className="text-xs text-[#1E6F8E] font-semibold cursor-pointer hover:text-[#D9B77A]">
                    + 4 more rooms →
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GUEST SERVICE REQUESTS */}
        <div className="acg-dash-card overflow-hidden">
          <div className="bg-[#EAF4F6] px-6 py-4 border-b border-[#1E6F8E]/10">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-[#17384F] text-sm">GUEST SERVICE REQUESTS</h3>
              <p className="text-xs text-[#1E6F8E] font-semibold cursor-pointer hover:text-[#D9B77A]">View all →</p>
            </div>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {GUEST_SERVICE_REQUESTS.map((req, idx) => (
              <div key={idx} className={`p-4 ${idx < GUEST_SERVICE_REQUESTS.length - 1 ? "border-b sm:border-b-0 sm:border-r border-[#1E6F8E]/10" : ""}`}>
                <p className="text-xs font-semibold text-[#17384F]">{req.type}</p>
                <p className="text-xs text-[#1E6F8E]/60 mt-1">{req.guest}</p>
                <p className="text-xs text-[#1E6F8E]/60 mt-2">{req.time}</p>
              </div>
            ))}
          </div>
          <div className="px-6 py-4 text-center border-t border-[#1E6F8E]/10">
            <p className="text-xs text-[#1E6F8E] font-semibold cursor-pointer hover:text-[#D9B77A]">
              + 2 more requests →
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
