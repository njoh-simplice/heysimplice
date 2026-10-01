/**
 * GA4 loader. `loadAnalytics()` is only ever called after explicit user
 * consent (see useCookieConsent / CookieConsent) — nothing here runs on its
 * own, and there is intentionally NO gtag snippet in index.html.
 */

export const GA_MEASUREMENT_ID = "G-6ZMV40EXS4";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

let loaded = false;

export function loadAnalytics(): void {
  if (loaded || typeof document === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer ?? [];
  // Must push the `arguments` object, exactly like Google's snippet. gtag.js
  // silently ignores plain arrays, so the previous `(...args) => push(args)`
  // version loaded gtag.js but never sent a single hit (verified in Chrome:
  // 0 requests to /g/collect, 1 as soon as `arguments` is pushed instead).
  function gtag(..._args: unknown[]): void {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}
