"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentTenant, seedDemoTenants, type Tenant } from "@/lib/tenant-engine";

type TenantContextType = {
  tenant:      Tenant | null;
  brandColor:  string;
  agencyName:  string;
  isLoaded:    boolean;
  refresh:     () => void;
};

const TenantContext = createContext<TenantContextType>({
  tenant: null, brandColor: "#3B82F6", agencyName: "SNR Digital Marketing",
  isLoaded: false, refresh: () => {},
});

export const useTenant = () => useContext(TenantContext);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant,   setTenant]   = useState<Tenant | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  function load() {
    seedDemoTenants();
    const t = getCurrentTenant();
    setTenant(t);
    setIsLoaded(true);
  }

  useEffect(() => { load(); }, []);

  const brandColor = tenant?.brandColor ?? "#3B82F6";
  const agencyName = tenant?.agencyName ?? "SNR Digital Marketing";

  return (
    <TenantContext.Provider value={{ tenant, brandColor, agencyName, isLoaded, refresh: load }}>
      {/* Inject CSS custom properties for dynamic theming */}
      <style>{`
        :root {
          --tenant-primary: ${brandColor};
          --tenant-primary-10: ${brandColor}1a;
          --tenant-primary-20: ${brandColor}33;
          --tenant-primary-30: ${brandColor}4d;
        }
      `}</style>
      {children}
    </TenantContext.Provider>
  );
}
