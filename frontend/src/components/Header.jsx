import { useNavigate } from "react-router-dom";

import { getUser, logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between bg-gold px-6 text-[#1a160c] shadow-sm">
      <div className="flex items-center gap-2.5">
        <span className="font-serif text-lg font-bold">Hotel Management</span>
        <span className="hidden text-sm text-[#1a160c]/70 sm:inline">
          Your comfort, our priority
        </span>
      </div>

      <div className="flex items-center gap-4">
        {user?.name && (
          <span className="text-sm font-medium">Hi, {user.name}</span>
        )}
        <button
          onClick={handleLogout}
          className="rounded-lg border border-[#1a160c]/30 px-3.5 py-1.5 text-sm font-semibold transition hover:bg-[#1a160c]/10"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
