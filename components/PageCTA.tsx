const EMAIL = "snrdigitalmarketingindia@gmail.com";

type Props = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  subject?: string;
};

export default function PageCTA({
  heading = "Ready to Grow Your Business Online?",
  subheading = "Book a free 30-minute strategy call with our team. No commitment, no hard sell — just a clear plan for your growth.",
  ctaLabel = "Get Free Growth Audit",
  subject = "Free%20Growth%20Audit%20Request",
}: Props) {
  const href = `mailto:${EMAIL}?subject=${subject}&body=Hi%20SNR%20Digital%20Marketing%2C%0A%0AI%20would%20like%20a%20free%20growth%20audit%20for%20my%20business.%0A%0AName%3A%0ABusiness%3A%0AGoal%3A%0AWebsite%3A`;

  return (
    <section className="py-24 px-6 bg-[#111C35]">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">Free Consultation</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5">{heading}</h2>
        <p className="text-slate-400 text-lg mb-8 max-w-xl mx-auto">{subheading}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={href}
            className="btn-green px-10 py-4 rounded-xl font-bold text-base inline-flex items-center gap-2 shadow-xl"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            {ctaLabel}
          </a>
          <a
            href={`mailto:${EMAIL}?subject=Quick%20Enquiry`}
            className="btn-blue-outline px-8 py-4 rounded-xl font-semibold text-base inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Send Email
          </a>
        </div>
        <p className="text-slate-600 text-sm mt-6">
          ✓ Free · No commitment · Response within 2 hours
        </p>
      </div>
    </section>
  );
}
