export default function FloatingEmail() {
  return (
    <a
      href="mailto:snrdigitalmarketingindia@gmail.com?subject=Business%20Enquiry%20-%20Free%20Growth%20Audit&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20would%20like%20to%20know%20more%20about%20your%20services.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A"
      aria-label="Email us"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      {/* Label — visible on hover */}
      <span className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#111C35] text-white text-sm font-medium px-4 py-2 rounded-xl border border-white/10 shadow-lg whitespace-nowrap">
        Email us
      </span>

      {/* Button with pulse ring */}
      <div className="relative w-14 h-14">
        <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-20" />
        <div
          className="relative w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
          style={{ boxShadow: "0 4px 24px rgba(59, 130, 246, 0.45)" }}
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
      </div>
    </a>
  );
}
