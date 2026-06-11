import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../api";
import { saveAuth } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@forgequantum.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Mouse-following champagne gold glow position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isGlowVisible, setIsGlowVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    
    // Only track mouse movement on desktop viewport for performance
    if (window.innerWidth >= 1024) {
      setIsGlowVisible(true);
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login({ email, password });
      saveAuth({ token: data.token, user: data.user });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative grid min-h-screen items-center bg-cover bg-center bg-fixed lg:grid-cols-12 overflow-hidden select-none bg-ivory">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] scale-[1.01]"
        style={{ backgroundImage: "url('/luxury_hotel_background.png')" }}
      />
      {/* Premium Warm Lighting & Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-ivory/98 via-ivory/92 to-beige-warm/70 lg:via-ivory/85 lg:to-beige-warm/50" />

      {/* Floating blurred ambient gold circles in background */}
      <div className="absolute top-[15%] left-[10%] h-[350px] w-[350px] rounded-full bg-gold-champagne/10 blur-[130px] pointer-events-none animate-float" />
      <div className="absolute bottom-[10%] right-[20%] h-[450px] w-[450px] rounded-full bg-bronze-soft/8 blur-[150px] pointer-events-none animate-float-delayed" />

      {/* Subtle mouse-following glow (desktop only) */}
      {isGlowVisible && (
        <div
          className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-champagne/12 blur-[120px] transition-all duration-[350ms] ease-out z-[5]"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: "380px",
            height: "380px",
          }}
        />
      )}

      {/* ---------- Left Side: Hospitality Storytelling & Trust Indicators ---------- */}
      <section className="relative z-10 px-8 py-16 text-brown-espresso sm:px-12 lg:col-span-7 lg:px-24 flex flex-col justify-center min-h-[40vh] lg:min-h-screen animate-fade-up">
        {/* Top Badge */}
        <div className="mb-6 flex items-center gap-2.5 font-sans text-xs font-semibold uppercase tracking-[0.25em] text-bronze-soft">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-champagne animate-ping" />
          The Hotel Experience
        </div>

        {/* Brand Headline */}
        <h1 className="mb-6 font-serif text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl lg:text-7xl text-brown-espresso">
          Where Hospitality <br />
          <span className="italic font-normal text-gold-champagne">Meets Excellence.</span>
        </h1>

        {/* Narrative */}
        <p className="mb-12 max-w-xl font-sans text-base lg:text-lg font-light leading-relaxed text-brown-espresso/80">
          A sanctuary of quiet luxury, where every detail is curated to perfection. 
          Welcome to the Hotel Management Portal — your gateway to flawless 
          operations, bespoke guest services, and refined administrative command.
        </p>

        {/* Trust Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          <div className="p-5 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_12px_30px_rgba(59,47,47,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-champagne/30 hover:bg-white/40">
            <div className="mb-1 text-gold-champagne text-sm font-semibold tracking-wider">★★★★★</div>
            <div className="font-serif text-lg font-bold text-brown-espresso">Luxury Experience</div>
            <div className="font-sans text-[10px] uppercase tracking-wider text-bronze-soft mt-1 font-medium">Bespoke 5-Star Standards</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_12px_30px_rgba(59,47,47,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-champagne/30 hover:bg-white/40">
            <div className="mb-1 text-gold-champagne text-lg font-bold">98%</div>
            <div className="font-serif text-lg font-bold text-brown-espresso">Guest Satisfaction</div>
            <div className="font-sans text-[10px] uppercase tracking-wider text-bronze-soft mt-1 font-medium">Uncompromising Excellence</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_12px_30px_rgba(59,47,47,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-champagne/30 hover:bg-white/40">
            <div className="mb-1 text-gold-champagne text-lg font-bold">24/7</div>
            <div className="font-serif text-lg font-bold text-brown-espresso">Dedicated Care</div>
            <div className="font-sans text-[10px] uppercase tracking-wider text-bronze-soft mt-1 font-medium">Always at Your Service</div>
          </div>

          <div className="p-5 rounded-2xl border border-white/50 bg-white/20 backdrop-blur-md shadow-[0_12px_30px_rgba(59,47,47,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold-champagne/30 hover:bg-white/40">
            <div className="mb-1 text-gold-champagne text-lg font-bold">10,000+</div>
            <div className="font-serif text-lg font-bold text-brown-espresso">Reservations Managed</div>
            <div className="font-sans text-[10px] uppercase tracking-wider text-bronze-soft mt-1 font-medium">Trusted Operation Platform</div>
          </div>
        </div>
      </section>

      {/* ---------- Right Side: Redesigned Glassmorphic Sign-in Card ---------- */}
      <section className="relative z-10 flex justify-center px-4 py-8 sm:px-12 lg:col-span-5 lg:px-8 xl:px-16 min-h-screen items-center">
        {/* Layered Glass Concept Containers for Visual Depth */}
        <div className="relative z-10 flex w-full max-w-[430px] items-center justify-center py-6">

          {/* Main Card */}
          <div className="relative z-10 w-full rounded-3xl glass-luxury-card p-8 sm:p-10 border border-white/60 animate-fade-up">
            
            {/* Header / Brand Logo Monogram */}
            <div className="mb-8 flex flex-col items-center text-center">
              {/* Modern minimalist monogram logo */}
              <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold-champagne/60 bg-gradient-to-tr from-ivory/80 to-white/95 shadow-[0_4px_15px_rgba(59,47,47,0.03),_0_0_12px_rgba(212,168,79,0.1)]">
                <div className="absolute inset-0.5 rounded-full border border-gold-champagne/20" />
                <span className="font-serif text-xl font-bold tracking-widest text-brown-espresso">HM</span>
              </div>
              <h2 className="font-serif text-2xl font-semibold text-brown-espresso tracking-tight">
                Hotel <span className="italic font-light text-gold-champagne">Management</span>
              </h2>
              <div className="mt-2 flex items-center gap-1.5 font-sans text-[10px] tracking-widest uppercase text-bronze-soft">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-champagne shadow-[0_0_6px_#d4a84f] animate-pulse" />
                Secure Portal
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-xs text-red-800 backdrop-blur-sm">
                <span className="font-semibold">Access Denied:</span> {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col">
              {/* Email */}
              <div className="mb-5 flex flex-col">
                <label className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-bronze-soft">
                  Email Address
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-beige-warm bg-ivory/60 px-4 transition-all duration-300 focus-within:border-gold-champagne focus-within:bg-white focus-within:shadow-[0_0_15px_rgba(212,168,79,0.12)]">
                  <MailIcon className="text-bronze-soft/60" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="flex-1 bg-transparent py-3.5 text-sm text-brown-espresso outline-none placeholder:text-brown-espresso/30 font-sans"
                    placeholder="you@management.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mb-5 flex flex-col">
                <label className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-bronze-soft">
                  Password
                </label>
                <div className="flex items-center gap-3 rounded-xl border border-beige-warm bg-ivory/60 px-4 transition-all duration-300 focus-within:border-gold-champagne focus-within:bg-white focus-within:shadow-[0_0_15px_rgba(212,168,79,0.12)]">
                  <LockIcon className="text-bronze-soft/60" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                    className="flex-1 bg-transparent py-3.5 text-sm text-brown-espresso outline-none placeholder:text-brown-espresso/30 font-sans"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="flex text-bronze-soft/50 transition hover:text-gold-champagne"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <EyeIcon open={showPassword} className="text-bronze-soft/60" />
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="mb-6 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`flex h-4 w-4 items-center justify-center rounded border transition-all duration-200 ${
                    rememberMe 
                      ? "border-gold-champagne bg-gold-champagne text-white" 
                      : "border-bronze-soft/30 bg-white/50 group-hover:border-gold-champagne/60"
                  }`}>
                    {rememberMe && (
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="font-sans text-xs text-brown-espresso/70 font-medium">Remember me</span>
                </label>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Please contact the front desk or your system administrator to recover access.");
                  }}
                  className="font-sans text-xs font-semibold text-bronze-soft hover:text-gold-champagne transition duration-200"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="relative overflow-hidden w-full mt-2 rounded-xl bg-gradient-to-r from-gold-champagne to-bronze-soft py-4 font-sans text-xs font-bold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:shadow-[0_8px_25px_rgba(212,168,79,0.3)] active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60 shimmer-sweep"
              >
                {loading ? "Verifying Credentials…" : "Enter Portal"}
              </button>
            </form>

            {/* Redirection */}
            <p className="mt-8 text-center font-sans text-xs text-brown-espresso/60">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-bronze-soft hover:text-gold-champagne hover:underline underline-offset-4 transition duration-200"
              >
                Create Portal Access
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Inline icons ---------- */
function MailIcon({ className }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LockIcon({ className }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

function EyeIcon({ open, className }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {open ? (
        <>
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ) : (
        <>
          <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 8 10 8a18 18 0 0 1-2.16 3.19M6.6 6.6A18 18 0 0 0 2 12s3.5 7 10 7a9.1 9.1 0 0 0 5.4-1.6" />
          <path d="m2 2 20 20" />
        </>
      )}
    </svg>
  );
}
