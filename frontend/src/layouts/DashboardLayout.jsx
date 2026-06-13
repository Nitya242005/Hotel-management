import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#EAF4F6]">
      <div className="mx-auto flex min-h-screen max-w-[1760px] flex-col gap-6 px-4 py-4 md:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start">
          <aside className="w-full xl:w-[280px] xl:flex-shrink-0">
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
