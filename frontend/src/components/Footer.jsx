export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="flex h-12 items-center justify-center border-t border-gray-200 bg-white text-[13px] text-gray-500">
      <span>&copy; {year} Hotel Management System. All rights reserved.</span>
    </footer>
  );
}
