export type DashboardSession = {
  clientId: string;
  clientName: string;
  email: string;
  loginTime: string;
};

const KEY = "snr_dashboard_session";

export function getSession(): DashboardSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as DashboardSession) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: DashboardSession) {
  localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(KEY);
}
