/* Analytics utility — wraps window.gtag for event tracking.
   Works with GA4 (G-XXXXXXXX). No-op when gtag is not loaded. */

type GtagFn = (cmd: string, action: string, params: Record<string, string>) => void;

function gtag(): GtagFn | undefined {
  if (typeof window !== "undefined" && "gtag" in window) {
    return (window as unknown as { gtag: GtagFn }).gtag;
  }
  return undefined;
}

export function trackClick(label: string, category = "CTA") {
  gtag()?.("event", "click", { event_category: category, event_label: label });
}

export function trackWhatsApp(source: string) {
  gtag()?.("event", "whatsapp_click", { event_category: "Lead", event_label: source });
}

export function trackCall(source: string) {
  gtag()?.("event", "call_click", { event_category: "Lead", event_label: source });
}

export function trackFormStep(step: number, label: string) {
  gtag()?.("event", "form_step", {
    event_category: "LeadForm",
    event_label: `Step ${step}: ${label}`,
  });
}

export function trackFormSubmit(businessType: string, goal: string) {
  gtag()?.("event", "form_submit", {
    event_category: "LeadForm",
    event_label: `${businessType} — ${goal}`,
  });
}

export function trackChatOpen() {
  gtag()?.("event", "chat_open", { event_category: "AIChatWidget", event_label: "open" });
}

export function trackChatOption(label: string) {
  gtag()?.("event", "chat_option", { event_category: "AIChatWidget", event_label: label });
}
