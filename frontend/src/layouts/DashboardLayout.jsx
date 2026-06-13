import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-seaglass text-secondary antialiased">
      <div className="mx-auto max-w-[1760px] p-4 md:p-6 lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          <aside className="w-full lg:w-[280px] lg:flex-shrink-0 lg:sticky lg:top-8">
            <Sidebar />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <Header />
            <main className="min-w-0">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
