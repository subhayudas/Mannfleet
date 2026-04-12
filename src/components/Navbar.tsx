"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/lib/theme";

function SunIcon({ size = 16 }: { size?: number }) {
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

function MoonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "About", href: "#" },
  { label: "Fleet", href: "/fleet" },
  { label: "Pricing", href: "#" },
  { label: "Contact", href: "#" },
];

interface NavbarProps {
  /** Wrap in a positioned container (use for hero overlay). Default: renders standalone with px/pt padding. */
  overlay?: boolean;
  /** ref forwarded to the outer wrapper div */
  wrapperRef?: React.RefObject<HTMLDivElement | null>;
  /** Initial opacity — useful when parent controls entrance animation */
  initialOpacity?: number;
}

export default function Navbar({ overlay = false, wrapperRef, initialOpacity = 1 }: NavbarProps) {
  const { theme, toggle } = useTheme();

  const linkColor = theme === "dark" ? "rgba(255,255,255,0.60)" : "rgba(44,36,22,0.65)";
  const linkHover  = theme === "dark" ? "#ffffff" : "#2C2416";

  return (
    <div
      ref={wrapperRef}
      className={overlay ? "relative shrink-0 px-5 lg:px-10 pt-4 pb-4" : "sticky top-0 z-50 px-5 lg:px-10 pt-4 pb-4"}
      style={{ zIndex: 20, opacity: initialOpacity }}
    >
      <nav
        className="glass-nav flex items-center justify-between px-5 lg:px-8 py-3.5"
        style={{ borderRadius: "9999px" }}
      >
        {/* Logo */}
        <Link href="/">
          <Image
            src="/mannlogo.webp"
            alt="MANN"
            width={100}
            height={36}
            className="select-none"
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className="font-sans uppercase text-xs font-semibold tracking-widest transition-colors duration-200"
                style={{ color: linkColor, letterSpacing: "0.10em" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = linkHover; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#"
            className="font-sans uppercase text-xs font-semibold tracking-widest px-4 py-2 rounded-full transition-colors duration-200"
            style={{ color: linkColor, letterSpacing: "0.10em" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = linkHover; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = linkColor; }}
          >
            Log in
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.25rem",
              height: "2.25rem",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "rgba(255,255,255,0.75)",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.20)";
              (e.currentTarget as HTMLButtonElement).style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.10)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.75)";
            }}
          >
            {theme === "dark" ? <SunIcon size={16} /> : <MoonIcon size={16} />}
          </button>

          <button className="btn-primary text-sm">
            Book Now
          </button>
        </div>
      </nav>
    </div>
  );
}
