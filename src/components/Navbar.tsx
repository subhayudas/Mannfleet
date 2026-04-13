"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/lib/theme";
import "./PillNav.css";

function SunIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "About",   href: "/about" },
  { label: "Fleet",   href: "/fleet" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#" },
];

interface NavbarProps {
  overlay?: boolean;
  wrapperRef?: React.RefObject<HTMLDivElement | null>;
  initialOpacity?: number;
}

export default function Navbar({ overlay = false, wrapperRef, initialOpacity = 1 }: NavbarProps) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const circleRefs   = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs       = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweens = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef   = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef  = useRef<HTMLDivElement | null>(null);
  const logoRef      = useRef<HTMLAnchorElement | null>(null);

  const ease = "power3.out";

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle, index) => {
        if (!circle?.parentElement) return;
        const pill = circle.parentElement as HTMLElement;
        const { width: w, height: h } = pill.getBoundingClientRect();
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width  = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, { xPercent: -50, scale: 0, transformOrigin: `50% ${originY}px` });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const hover = pill.querySelector<HTMLElement>(".pill-label-hover");
        if (label) gsap.set(label, { y: 0 });
        if (hover) gsap.set(hover, { y: h + 12, opacity: 0 });

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (hover) {
          gsap.set(hover, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(hover, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }
        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener("resize", layout);
    document.fonts?.ready?.then(layout).catch(() => {});

    // Init mobile menu hidden
    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0 });

    // Entrance animations
    if (logoRef.current) {
      gsap.set(logoRef.current, { scale: 0 });
      gsap.to(logoRef.current, { scale: 1, duration: 0.6, ease });
    }
    if (navItemsRef.current) {
      gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
      gsap.to(navItemsRef.current, { width: "auto", duration: 0.6, ease });
    }

    return () => window.removeEventListener("resize", layout);
  }, []);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweens.current[i]?.kill();
    activeTweens.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(img, { opacity: 0.7, duration: 0.15, ease, overwrite: "auto",
      onComplete: () => { gsap.to(img, { opacity: 1, duration: 0.15, ease }); } });
  };

  const toggleMobile = () => {
    const next = !mobileOpen;
    setMobileOpen(next);

    const btn  = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (btn) {
      const lines = btn.querySelectorAll<HTMLElement>(".hamburger-line");
      if (next) {
        gsap.to(lines[0], { rotation: 45,  y:  3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (next) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.25, ease, transformOrigin: "top center" }
        );
      } else {
        gsap.to(menu, {
          opacity: 0, y: 8, duration: 0.2, ease, transformOrigin: "top center",
          onComplete: () => { gsap.set(menu, { visibility: "hidden" }); }
        });
      }
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={overlay ? "relative shrink-0 px-5 lg:px-10 pt-4 pb-4" : "sticky top-0 z-50 px-5 lg:px-10 pt-4 pb-4"}
      style={{ zIndex: 20, opacity: initialOpacity }}
    >
      {/* relative so mobile menu is positioned against this */}
      <div className="pill-nav-wrapper" style={{ position: "relative" }}>

        {/* Logo */}
        <Link
          href="/"
          className="pill-logo"
          onMouseEnter={handleLogoEnter}
          ref={logoRef}
        >
          <span className="pill-logo-shine">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/mannlogo.webp"
              alt="MANN"
              width={140}
              height={50}
              className="select-none"
              style={{ objectFit: "contain", height: "50px", width: "auto" }}
              ref={logoImgRef}
            />
          </span>
        </Link>

        {/* Center nav pills */}
        <div className="pill-nav-items" ref={navItemsRef}>
          <ul className="pill-list" role="menubar">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label} role="none">
                <Link
                  href={href}
                  role="menuitem"
                  className="pill-item"
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle"
                    aria-hidden="true"
                    ref={el => { circleRefs.current[i] = el; }}
                  />
                  <span className="label-stack">
                    <span className="pill-label">{label}</span>
                    <span className="pill-label-hover" aria-hidden="true">{label}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Right actions */}
        <div className="pill-nav-actions">
          <button
            className="pill-theme-btn"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </button>
          <button className="pill-book-btn">Book Now</button>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="pill-hamburger"
          onClick={toggleMobile}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>

        {/* Mobile menu */}
        <div className="pill-mobile-menu" ref={mobileMenuRef}>
          <ul className="pill-mobile-list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="pill-mobile-link"
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
