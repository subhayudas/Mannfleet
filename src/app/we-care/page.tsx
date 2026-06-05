"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   ICONS
══════════════════════════════════════════════════════════════ */
function IconHeart() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconLeaf() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 19.34 2.3 22 2.68 22 3 22h1c5.31 0 9-3.11 9-8 0-2.5-1-4.5-3-6" />
      <path d="M3 8c0-1 .5-5 5-5 3 0 6 1 8 3" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconClipboard() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
function IconChevron({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconClose() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function IconFile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
function IconExternalLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   ANIMATED COUNTER
══════════════════════════════════════════════════════════════ */
function AnimatedCounter({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: "power2.out",
          onUpdate: () => setCount(Math.round(obj.val)),
        });
      },
    });
  }, [target]);

  const formatted = count.toLocaleString("en-IN");
  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

/* ══════════════════════════════════════════════════════════════
   ACCORDION ITEM
══════════════════════════════════════════════════════════════ */
interface AccordionItemProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
function AccordionItem({ title, icon, children }: AccordionItemProps) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    if (open) {
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(body, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div style={{
      background: "var(--glass-light)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: "1rem",
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.25rem 1.5rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ color: "var(--accent)", flexShrink: 0 }}>{icon}</span>
        <span style={{
          flex: 1,
          fontSize: "1.05rem",
          fontWeight: 600,
          color: "var(--text-primary)",
          fontFamily: "'Poppins', sans-serif",
        }}>{title}</span>
        <span style={{ color: "var(--text-secondary)", flexShrink: 0 }}>
          <IconChevron open={open} />
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <div style={{ padding: "0 1.5rem 1.5rem" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PDF MODAL
   (Consistent with Investors page)
══════════════════════════════════════════════════════════════ */
const PDF_BASE = "/Mann%20Investors%20/";

function PdfModal({ file, label, onClose }: { file: string; label: string; onClose: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    if (isMobile) {
      window.open(PDF_BASE + file, "_blank");
      onClose();
      return;
    }

    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(card,
      { opacity: 0, scale: 0.92, y: 30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" }
    );

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isMobile, file, onClose]);

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.92, y: 20, duration: 0.22, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.22, ease: "power2.in" }, 0);
  }, [onClose]);

  if (isMobile) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.78)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 16,
          overflow: "hidden",
          width: "min(900px, calc(100vw - 48px))",
          height: "min(85vh, 700px)",
          display: "flex", flexDirection: "column",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "14px 18px",
          borderBottom: "1px solid var(--border-subtle)",
          background: "var(--bg-deep)",
          flexShrink: 0,
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: 8 }}>
            <IconFile /> {label}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <a
              href={PDF_BASE + file}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 5,
                fontSize: 12, color: "var(--accent)",
                textDecoration: "none", padding: "6px 12px",
                border: "1px solid var(--accent)",
                borderRadius: 8, fontWeight: 600,
              }}
            >
              Open <IconExternalLink />
            </a>
            <button
              onClick={handleClose}
              style={{
                background: "var(--glass-mid)", border: "1px solid var(--border-subtle)",
                borderRadius: 8, width: 34, height: 34, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--text-primary)",
              }}
              aria-label="Close"
            >
              <IconClose />
            </button>
          </div>
        </div>
        <iframe
          src={PDF_BASE + file + "#toolbar=0"}
          style={{ flex: 1, border: "none", width: "100%", background: "#fff" }}
          title={label}
        />
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function WeCarePage() {
  const [showPdf, setShowPdf] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const govRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      if (heroRef.current) {
        const els = heroRef.current.querySelectorAll<HTMLElement>(".anim-hero");
        gsap.fromTo(els, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power3.out",
        });
      }

      // Stats cards
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll<HTMLElement>(".stat-card");
        gsap.fromTo(cards, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        });
      }

      // Focus section
      if (focusRef.current) {
        const items = focusRef.current.querySelectorAll<HTMLElement>(".anim-item");
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: focusRef.current, start: "top 82%" },
        });
      }

      // Governance steps
      if (govRef.current) {
        const steps = govRef.current.querySelectorAll<HTMLElement>(".gov-step");
        gsap.fromTo(steps, { x: -30, opacity: 0 }, {
          x: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: govRef.current, start: "top 82%" },
        });
      }

      // Vision cards
      if (visionRef.current) {
        const cards = visionRef.current.querySelectorAll<HTMLElement>(".vision-card");
        gsap.fromTo(cards, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, stagger: 0.12, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: visionRef.current, start: "top 82%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  /* shared card style */
  const glassCard: React.CSSProperties = {
    background: "var(--glass-light)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 16,
    padding: "1.75rem",
  };

  const sectionWrap: React.CSSProperties = {
    padding: "clamp(3rem, 8vw, 5rem) clamp(1.25rem, 5vw, 4rem)",
    maxWidth: 1240,
    margin: "0 auto",
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", minHeight: "100vh", background: "var(--bg-base)" }}>
      <Navbar />

      <main>
        {/* ── Hero ── */}
        <section style={sectionWrap} ref={heroRef}>
          <span className="glass-badge anim-hero" style={{ marginBottom: "1rem", display: "inline-block" }}>
            Corporate Social Responsibility
          </span>
          <h1 className="font-serif anim-hero" style={{
            fontSize: "clamp(3rem, 8vw, 5.5rem)",
            fontWeight: 400,
            lineHeight: 1.05,
            color: "var(--text-primary)",
            margin: "0 0 0.5rem",
            letterSpacing: "0.01em",
          }}>
            We Care
          </h1>
          <p className="font-serif italic anim-hero" style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            color: "var(--text-secondary)",
            margin: "0 0 1.5rem",
          }}>
            People. Progress. Performance.
          </p>
          <p className="anim-hero" style={{
            fontSize: "1rem",
            color: "var(--text-secondary)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: 0,
          }}>
            At Mann Fleet Partners Limited, we believe that business growth must go hand in hand with
            social responsibility. Our CSR initiatives are guided by the Companies Act, 2013, and are
            focused on creating meaningful, long-term impact in the communities we serve.
          </p>

        </section>

        {/* ── Commitment Stats ── */}
        <section style={{ ...sectionWrap, paddingTop: 0 }} ref={statsRef}>
          <div className="anim-item" style={{ marginBottom: "2rem" }}>
            <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              Our Commitment
            </span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: 0,
            }}>
              2% of Average Net Profits
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 540, marginTop: "0.5rem" }}>
              Allocated towards CSR activities in line with statutory requirements under the Companies Act, 2013.
            </p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}>
            {/* FY 2024-25 */}
            <div className="stat-card" style={{ ...glassCard, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "var(--accent)",
                borderRadius: "16px 16px 0 0",
              }} />
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.75rem" }}>
                FY 2024–25
              </p>
              <p style={{
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--accent)",
                margin: "0 0 0.25rem",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}>
                ₹<AnimatedCounter target={4244746} />
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "0.5rem 0 0", lineHeight: 1.5 }}>
                Allocated towards CSR initiatives
              </p>
              <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                <span style={{ color: "var(--accent)" }}><IconCheck /></span>
                Global Social Welfare Organization
              </div>
            </div>

            {/* FY 2025-26 */}
            <div className="stat-card" style={{ ...glassCard, position: "relative", overflow: "hidden" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: "var(--accent)",
                borderRadius: "16px 16px 0 0",
              }} />
              <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", margin: "0 0 0.75rem" }}>
                FY 2025–26
              </p>
              <p style={{
                fontSize: "clamp(2rem, 5vw, 2.8rem)",
                fontWeight: 700,
                color: "var(--accent)",
                margin: "0 0 0.25rem",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}>
                ₹<AnimatedCounter target={5760000} />
              </p>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", margin: "0.5rem 0 0", lineHeight: 1.5 }}>
                Approved for CSR expenditure
              </p>
              <div style={{ marginTop: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                <span style={{ color: "var(--accent)" }}><IconCheck /></span>
                Maharaja Agrasen Hospital Charitable Trust
              </div>
            </div>

            {/* Impact Image Card */}
            <div className="stat-card" style={{ ...glassCard, padding: 0, overflow: "hidden", position: "relative", minHeight: 240 }}>
              <Image src="/We care/WhatsApp Image 2026-05-04 at 10.07.14.jpeg" alt="Community Support" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </section>

        {/* ── Focus Areas ── */}
        <section style={{ background: "var(--bg-surface)", padding: "1px 0" }}>
          <div style={sectionWrap} ref={focusRef}>
            <span className="glass-badge anim-item" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              Focus Areas
            </span>
            <h2 className="font-serif anim-item" style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: "0 0 0.5rem",
            }}>
              Aligned with Schedule VII
            </h2>
            <p className="anim-item" style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 580, marginBottom: "2.5rem" }}>
              Our CSR efforts are aligned with Schedule VII of the Companies Act, 2013, ensuring
              our contributions address key social and developmental priorities.
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}>
              {[
                { icon: <IconHeart />, title: "Healthcare", desc: "Improving access to medical care and supporting community health institutions.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.13.jpeg", imagePosition: "left center" },
                { icon: <IconUsers />, title: "Community Well-being", desc: "Strengthening the social fabric and uplifting underserved populations.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.14 (1).jpeg", imagePosition: "center center" },
                { icon: <IconLeaf />, title: "Sustainable Development", desc: "Investing in initiatives that create lasting, positive environmental and social outcomes.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.15.jpeg", imagePosition: "center center" },
              ].map((item) => (
                <div key={item.title} className="anim-item" style={{
                  ...glassCard,
                  padding: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <div style={{ position: "relative", height: 180, width: "100%" }}>
                    <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", objectPosition: (item as { imagePosition?: string }).imagePosition ?? "center center" }} />
                  </div>
                  <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <span style={{
                      width: 52, height: 52,
                      borderRadius: 12,
                      background: "var(--bg-deep)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--accent)",
                      flexShrink: 0,
                    }}>{item.icon}</span>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.4rem" }}>
                        {item.title}
                      </h3>
                      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Key Initiatives — Accordion ── */}
        <section style={sectionWrap}>
          <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
            Key Initiatives and Partnerships
          </span>
          <h2 className="font-serif" style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: "0 0 2rem",
          }}>
            Where We Invest
          </h2>

          <AccordionItem title="Healthcare Support" icon={<IconHeart />}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.25rem", fontSize: "0.95rem" }}>
              Healthcare is at the heart of our CSR strategy. We have partnered with leading
              institutions to improve access to quality medical care for those who need it most.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { org: "Global Social Welfare Organization", fy: "FY 2024–25", desc: "Supporting broad-based social welfare and healthcare outreach programmes." },
                { org: "Maharaja Agrasen Hospital Charitable Trust", fy: "FY 2025–26", desc: "Enabling access to charitable medical services and community healthcare." },
              ].map((p) => (
                <div key={p.org} style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 12,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                }}>
                  <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}><IconCheck /></span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)" }}>{p.org}</span>
                      <span style={{
                        fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", padding: "2px 8px",
                        background: "var(--accent)", color: "#fff", borderRadius: 20,
                      }}>{p.fy}</span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", position: "relative", height: "clamp(200px, 25vw, 300px)", borderRadius: 12, overflow: "hidden" }}>
              <Image src="/We care/WhatsApp Image 2026-05-04 at 10.07.14 (1).jpeg" alt="Healthcare CSR" fill style={{ objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: "1.25rem", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-subtle)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/We care/WhatsApp Image 2026-05-13 at 17.01.27.jpeg" alt="Hospital Donation Receipt" style={{ width: "100%", display: "block", objectFit: "contain" }} />
            </div>
          </AccordionItem>

          <AccordionItem title="Community Development" icon={<IconUsers />}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1rem", fontSize: "0.95rem" }}>
              Beyond healthcare, we engage with programmes that uplift communities, create
              livelihood opportunities, and support education and skill development initiatives
              aligned with Schedule VII of the Companies Act, 2013.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Livelihood enhancement projects",
                "Education and skill development",
                "Women's empowerment initiatives",
                "Rural development programmes",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "center", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)" }}><IconCheck /></span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "1.5rem", position: "relative", height: "clamp(200px, 25vw, 300px)", borderRadius: 12, overflow: "hidden" }}>
              <Image src="/We care/WhatsApp Image 2026-05-04 at 10.07.14 (2).jpeg" alt="Community Development" fill style={{ objectFit: "cover" }} />
            </div>
          </AccordionItem>

          <AccordionItem title="Sustainable Impact" icon={<IconLeaf />}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: 0, fontSize: "0.95rem" }}>
              We are committed to CSR activities that go beyond one-time donations. Our approach
              focuses on systemic, sustainable change — building institutions, supporting
              long-term programmes, and measuring impact to ensure our contributions create
              lasting value for the communities we serve.
            </p>
            <div style={{ marginTop: "1.5rem", position: "relative", height: "clamp(200px, 25vw, 300px)", borderRadius: 12, overflow: "hidden" }}>
              <Image src="/We care/WhatsApp Image 2026-05-04 at 10.07.15.jpeg" alt="Sustainable Impact" fill style={{ objectFit: "cover" }} />
            </div>
          </AccordionItem>

          <AccordionItem title="COVID-19 Community Response" icon={<IconShield />}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.25rem", fontSize: "0.95rem" }}>
              During the COVID-19 pandemic, Mann Fleet Partners stepped forward to support communities
              and essential workers at a time of unprecedented need. Our response was swift, coordinated,
              and deeply human — reflecting our belief that a company's character is revealed in a crisis.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {[
                "Provided free transportation for healthcare workers and essential service staff",
                "Supplied PPE kits and sanitisation materials to frontline responders",
                "Supported food distribution drives for daily-wage workers and vulnerable families",
                "Maintained sanitised fleet operations to ensure safe mobility throughout lockdown phases",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}><IconCheck /></span>
                  {item}
                </div>
              ))}
            </div>
          </AccordionItem>

          <AccordionItem title="Sustainable Mobility & EV Initiative" icon={<IconLeaf />}>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: "0 0 1.25rem", fontSize: "0.95rem" }}>
              Mann Fleet Partners is committed to a greener future for mobility. We are actively
              expanding our electric vehicle fleet as part of a wider sustainability mission —
              reducing emissions, lowering our carbon footprint, and offering clients a cleaner,
              quieter, and more responsible way to travel.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {[
                "Progressive introduction of EV models across corporate and chauffeur fleets",
                "Charging infrastructure partnerships to support long-range EV operations",
                "Driver training programmes for responsible and efficient EV operation",
                "Commitment to carbon-neutral fleet milestones aligned with India's net-zero goals",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--accent)", marginTop: 2, flexShrink: 0 }}><IconCheck /></span>
                  {item}
                </div>
              ))}
            </div>
            <div style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              borderRadius: 12,
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.25rem" }}>
                  Faze.in — Our Sustainable Mobility Subsidiary
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0, lineHeight: 1.6 }}>
                  Dedicated platform for sustainable, electric, and eco-friendly vehicle solutions.
                </p>
              </div>
              <a
                href="https://faze.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  color: "var(--accent)",
                  textDecoration: "none",
                  padding: "0.5rem 1.25rem",
                  border: "1px solid var(--accent)",
                  borderRadius: 8,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                Visit Faze.in <IconExternalLink />
              </a>
            </div>
          </AccordionItem>
        </section>

        {/* ── Governance & Oversight ── */}
        <section style={{ background: "var(--bg-surface)", padding: "1px 0" }}>
          <div style={sectionWrap} ref={govRef}>
            <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
              Governance and Oversight
            </span>
            <h2 className="font-serif" style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              color: "var(--text-primary)",
              margin: "0 0 0.5rem",
            }}>
              Transparent by Design
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 540, marginBottom: "2.5rem" }}>
              All CSR activities are governed through a clear, accountable structure, ensuring
              every rupee is deployed with integrity and measurable purpose.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {[
                {
                  icon: <IconClipboard />,
                  step: "01",
                  title: "CSR Committee",
                  action: "Review and Recommend",
                  desc: "Dedicated CSR Committee reviews proposed activities, evaluates alignment with statutory requirements, and recommends initiatives to the Board.",
                },
                {
                  icon: <IconShield />,
                  step: "02",
                  title: "Board of Directors",
                  action: "Approve",
                  desc: "The Board of Directors reviews committee recommendations and formally approves all CSR expenditure, ensuring full accountability at the highest level.",
                },
                {
                  icon: <IconTarget />,
                  step: "03",
                  title: "Senior Leadership",
                  action: "Execute",
                  desc: "Senior leadership oversees execution under board-mandated authorization, ensuring transparency, timely delivery, and measurable impact on the ground.",
                },
              ].map((item) => (
                <div key={item.step} className="gov-step" style={{
                  ...glassCard,
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "flex-start",
                }}>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.5rem",
                    flexShrink: 0,
                  }}>
                    <span style={{
                      width: 52, height: 52,
                      borderRadius: 12,
                      background: "var(--bg-deep)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--accent)",
                    }}>{item.icon}</span>
                    <span style={{
                      fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em",
                      color: "var(--text-muted)",
                    }}>{item.step}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
                      <h3 style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                        {item.title}
                      </h3>
                      <span style={{
                        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em",
                        textTransform: "uppercase", padding: "2px 10px",
                        border: "1px solid var(--accent)", color: "var(--accent)", borderRadius: 20,
                      }}>{item.action}</span>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.65, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Policy Documentation ── */}
        <section style={{ ...sectionWrap, paddingTop: 0 }}>
          <div style={{
            ...glassCard,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            padding: "2.5rem",
            background: "var(--glass-mid)",
            border: "1px solid var(--accent)",
          }}>
            <div style={{ flex: 1, minWidth: 300 }}>
              <span className="glass-badge" style={{ marginBottom: "0.75rem", display: "inline-block", background: "var(--accent)", color: "#fff" }}>
                Official Documentation
              </span>
              <h2 className="font-serif" style={{
                fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                margin: "0 0 0.5rem",
              }}>
                Corporate Social Responsibility Policy
              </h2>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
                This document outlines our commitment to social responsibility, the framework for our initiatives,
                and the governance structure that ensures transparent and impactful delivery of our CSR goals.
              </p>
            </div>
            <button
              onClick={() => setShowPdf(true)}
              className="glass-badge"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                padding: "1.2rem 2.2rem",
                background: "var(--accent)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "14px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <IconFile />
              View Policy PDF
            </button>
          </div>
        </section>

        {/* ── Our Vision ── */}
        <section style={sectionWrap} ref={visionRef}>
          <span className="glass-badge vision-card" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
            Our Vision
          </span>
          <h2 className="font-serif vision-card" style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            margin: "0 0 0.5rem",
          }}>
            Beyond Compliance
          </h2>
          <p className="vision-card" style={{ color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: 540, marginBottom: "2.5rem" }}>
            We aim to go beyond statutory requirements and build a CSR framework that creates
            lasting social impact and reflects our core values.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
            marginBottom: "3rem",
          }}>
            {[
              { icon: <IconTarget />, title: "Sustainable Social Impact", desc: "Programmes designed for lasting, measurable change rather than short-term relief.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.14 (2).jpeg", imagePosition: "center center" },
              { icon: <IconUsers />, title: "Stronger Communities", desc: "Building resilient communities through healthcare, education, and skill development.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.14.jpeg", imagePosition: "center center" },
              { icon: <IconStar />, title: "Responsibility · Integrity · Excellence", desc: "Our three core values guide every CSR decision and partnership we make.", image: "/We care/WhatsApp Image 2026-05-04 at 10.07.13.jpeg", imagePosition: "left center" },
            ].map((item) => (
              <div key={item.title} className="vision-card" style={{
                ...glassCard,
                padding: 0,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ position: "relative", height: 180, width: "100%" }}>
                  <Image src={item.image} alt={item.title} fill style={{ objectFit: "cover", objectPosition: (item as { imagePosition?: string }).imagePosition ?? "center center" }} />
                </div>
                <div style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <span style={{
                    width: 52, height: 52,
                    borderRadius: 12,
                    background: "var(--bg-deep)",
                    border: "1px solid var(--border-subtle)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "var(--accent)",
                  }}>{item.icon}</span>
                  <div>
                    <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)", margin: "0 0 0.4rem" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote strip */}
          <blockquote style={{
            ...glassCard,
            borderLeft: "4px solid var(--accent)",
            borderRadius: "0 16px 16px 0",
            margin: 0,
            padding: "2rem 2.5rem",
          }}>
            <p className="font-serif" style={{
              fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
              color: "var(--text-primary)",
              lineHeight: 1.6,
              margin: "0 0 1rem",
              fontStyle: "italic",
            }}>
              &ldquo;We measure our success not only by the returns we generate for our shareholders, but also by the lives we improve and the communities we strengthen.&rdquo;
            </p>
            <cite style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--text-secondary)",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              fontStyle: "normal",
            }}>
              Mann Fleet Partners Limited — CSR Vision Statement
            </cite>
          </blockquote>
        </section>
      </main>

      <Footer />

      {showPdf && (
        <PdfModal
          file="CSR-Policy_Mann.pdf"
          label="CSR Policy — Mann Fleet Partners Limited"
          onClose={() => setShowPdf(false)}
        />
      )}
    </div>
  );
}
