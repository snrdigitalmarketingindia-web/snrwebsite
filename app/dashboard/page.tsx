import type { Metadata } from "next";
import ClientDashboard from "@/components/ClientDashboard";

export const metadata: Metadata = {
  title: "Client Dashboard — SNR Digital Marketing",
  description: "View your campaign performance, SEO rankings, lead metrics, and monthly reports.",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return <ClientDashboard />;
}
