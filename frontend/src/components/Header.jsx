import { useNavigate, useLocation } from "react-router-dom";
import { getUser, logout } from "../utils/auth";

export default function Header() {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-beige-warm bg-ivory/90 backdrop-blur-md sticky top-0 z-50 shadow-[0_2px_20px_rgba(59,47,47,0.06)]">
      {/* Brand */}
      <div className="flex items-center gap-3">
        {/* Monogram */}
        <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gold-champagne/60 bg-gradient-to-tr from-beige-warm to-white shadow-[0_0_10px_rgba(212,168,79,0.12)]">
          <span className="font-serif text-sm font-bold tracking-widest text-brown-espresso">HM</span>
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-serif text-base font-semibold text-brown-espresso">Hotel Management</span>
          <span className="hidden text-[10px] font-sans font-medium uppercase tracking-widest text-bronze-soft sm:block">
            Your comfort, our priority
          </span>
        </div>
      </div>

      {/* Right: user greeting + logout */}
      <div className="flex items-center gap-4">
        {user?.name && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold-champagne/20 border border-gold-champagne/30">
              <span className="font-serif text-xs font-bold text-brown-espresso">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="font-sans text-sm font-medium text-brown-espresso/80">
              {user.name}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="rounded-xl border border-bronze-soft/30 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-bronze-soft transition-all duration-200 hover:border-gold-champagne hover:bg-gold-champagne/10 hover:text-brown-espresso"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}
