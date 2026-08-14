/* Meta (Facebook) Pixel — shared config + typed client helpers.
   The base snippet is injected inline in <head> from the root layout;
   MetaPixel.tsx handles PageView on client-side navigation. */

export const META_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID || "1070183862026207";

type FbqParams = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/** Meta's official base code. Runs in <head> so the pixel is queueing
    events before hydration. `fbq` is a queue stub until fbevents.js lands,
    so calls made in between are not lost. */
export const metaPixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(META_PIXEL_ID)});
fbq('track', 'PageView');`;

export const metaPixelNoscriptSrc = `https://www.facebook.com/tr?id=${encodeURIComponent(
  META_PIXEL_ID
)}&ev=PageView&noscript=1`;

/** Fire a Meta standard event (PageView, Lead, Contact, ViewContent…).
    No-ops on the server or if the pixel was blocked. Never pass PII
    (name, email, phone) in `params` — those need hashed advanced matching. */
export function fbTrack(event: string, params?: FbqParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("track", event, params);
  else window.fbq("track", event);
}

/** Fire a non-standard event, for anything outside Meta's standard list. */
export function fbTrackCustom(event: string, params?: FbqParams) {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (params) window.fbq("trackCustom", event, params);
  else window.fbq("trackCustom", event);
}
