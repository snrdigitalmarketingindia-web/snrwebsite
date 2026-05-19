export default function Footer() {
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <span className="text-white font-semibold">SNR Digital Marketing</span>
          <span className="hidden sm:inline text-slate-600">·</span>
          <span>Hyderabad, India</span>
        </div>
        <p className="text-slate-600 text-xs text-center sm:text-right">
          Your Digital Growth Partner
          <span className="mx-2 text-gray-700">·</span>
          © {new Date().getFullYear()} SNR Digital Marketing. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
