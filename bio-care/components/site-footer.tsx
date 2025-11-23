export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#1717a6] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-white">
        <h3 className="text-lg font-semibold">Bio Care Coaching Center</h3>

        <p className="text-sm opacity-80 mt-1">
          Excellence in Biology Education for Classes 9–12 & NEET
        </p>

        <p className="text-xs opacity-60 mt-3">
          © {new Date().getFullYear()} Bio Care. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
