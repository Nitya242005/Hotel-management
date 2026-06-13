export default function Footer() {
  return (
    <footer className="px-8 pb-8 pt-4">
      <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col">
          <span className="font-sans text-[11px] font-bold text-[#1F7A8C] tracking-widest uppercase">
            Azure Coast Collection
          </span>
          <span className="font-serif text-[13px] font-medium text-slate-700 mt-1">
            Luxury Hospitality Platform
          </span>
        </div>
        <div className="mt-4 sm:mt-0 font-sans text-[10.5px] font-bold text-slate-500 bg-white/50 border border-white/60 rounded-full px-4.5 py-1.5 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Version 1.0
        </div>
      </div>
    </footer>
  );
}
