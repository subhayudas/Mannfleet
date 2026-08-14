"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { fbTrack } from "@/lib/meta-pixel";

const DIRECT_CONTACT = /^(tel:|mailto:)/i;
const WHATSAPP_HOST = /(^|\.)(wa\.me|whatsapp\.com)$/i;

/**
 * Keeps the Meta Pixel in sync with the App Router.
 *
 * The base snippet in <head> fires PageView once per document load, but every
 * in-site link is a client-side navigation — without this, the whole site would
 * report as a single page view.
 */
export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Skip the mount pass — the inline snippet already sent that PageView.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fbTrack("PageView");
  }, [pathname, searchParams]);

  // Phone / email / WhatsApp links appear across contact, reservation, footer,
  // team and terms. One delegated listener covers them all, including any
  // added later, instead of an onClick per anchor.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target instanceof Element ? e.target : null;
      const anchor = el?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      if (DIRECT_CONTACT.test(href)) {
        fbTrack("Contact", {
          method: href.toLowerCase().startsWith("tel:") ? "phone" : "email",
        });
        return;
      }

      let hostname: string;
      try {
        hostname = new URL(anchor.href, window.location.href).hostname;
      } catch {
        return;
      }
      if (WHATSAPP_HOST.test(hostname)) {
        fbTrack("Contact", { method: "whatsapp" });
      }
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
