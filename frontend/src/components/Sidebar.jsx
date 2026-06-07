const NAV = [
  { label: "Dashboard", href: "/" },
  { label: "Documents", href: "/documents" },
  { label: "CAPA", href: "/capa" },
  { label: "Risk", href: "/risk" },
  { label: "Training", href: "/training" },
  { label: "Audits", href: "/audits" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-gray-900 p-3 text-gray-300">
      <nav className="flex flex-col gap-1">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-lg px-3.5 py-2.5 text-[15px] transition hover:bg-white/10 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
