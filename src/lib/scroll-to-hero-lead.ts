export const HERO_LEAD_EMAIL_INPUT_ID = "hero-lead-email";

export function scrollToHeroLeadEmail(): void {
  if (typeof document === "undefined") {
    return;
  }

  const el = document.getElementById(HERO_LEAD_EMAIL_INPUT_ID);
  if (!(el instanceof HTMLInputElement)) {
    return;
  }

  el.scrollIntoView({ behavior: "smooth", block: "center" });

  window.requestAnimationFrame(() => {
    el.focus({ preventScroll: true });
  });
}
