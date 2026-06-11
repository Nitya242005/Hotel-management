export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex h-12 items-center justify-between border-t border-beige-warm bg-ivory px-6">
      <span className="font-sans text-[11px] font-medium text-bronze-soft/70">
        © {year} Hotel Management System. All rights reserved.
      </span>
      <span className="hidden sm:flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-widest text-bronze-soft/50">
        <span className="h-1 w-1 rounded-full bg-gold-champagne/60" />
        The Hotel Experience
      </span>
    </footer>
  );
}
