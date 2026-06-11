import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-ivory p-7 overflow-auto">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
