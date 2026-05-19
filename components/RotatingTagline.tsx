"use client";
import { useEffect, useState } from "react";

const taglines = [
  "Helping Hospitals Get More Patient Enquiries",
  "Helping Real Estate Businesses Generate Daily Leads",
  "Helping Startups Scale Faster Online",
  "Helping Clinics Get More Appointment Bookings",
  "Helping E-commerce Businesses Drive More Sales",
  "Helping Education Businesses Increase Admissions",
];

export default function RotatingTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % taglines.length);
        setVisible(true);
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-7 flex items-center justify-center mb-4">
      <p
        className="text-blue-300 text-sm sm:text-base font-medium tracking-wide transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {taglines[index]}
      </p>
    </div>
  );
}
