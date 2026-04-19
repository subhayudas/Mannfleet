"use client";

import { useRef, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────
   Noise canvas — closely follows the reference implementation.
   1024×1024 grain refreshed every `refreshInterval` frames,
   stretched to cover the section with a cool-grey tint.
───────────────────────────────────────────────────────────── */
function NoiseOverlay({
  patternAlpha = 18,
  patternRefreshInterval = 2,
}: {
  patternAlpha?: number;
  patternRefreshInterval?: number;
}) {
  const grainRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvasSize = 1024;
    let frame = 0;
    let animationId: number;

    const resize = () => {
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      // stretch to fill the parent section, not the viewport
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };

    const drawGrain = () => {
      const imageData = ctx.createImageData(canvasSize, canvasSize);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        // cool-grey noise: slightly bias toward blue channel for grey tone
        const value = Math.random() * 255;
        data[i]     = value * 0.88;   // R — pull red down slightly
        data[i + 1] = value * 0.90;   // G
        data[i + 2] = value;           // B — full, gives cool-grey cast
        data[i + 3] = patternAlpha;
      }
      ctx.putImageData(imageData, 0, 0);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) drawGrain();
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    loop();

    return () => window.cancelAnimationFrame(animationId);
  }, [patternAlpha, patternRefreshInterval]);

  return (
    <canvas
      ref={grainRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 6,
        // soft overlay so the grain reads over logos without killing them
        mixBlendMode: "soft-light",
        opacity: 0.75,
      }}
    />
  );
}

/* ─────────────────────────────────────────────────────────────
   Clients data
───────────────────────────────────────────────────────────── */
const PARTNERS = [
  { src: "/cleints/PHOTO-2026-04-18-17-41-48.jpg",                          alt: "Client 1" },
  { src: "/cleints/PHOTO-2026-04-18-17-52-11.jpg",                          alt: "Client 2" },
  { src: "/cleints/PHOTO-2026-04-18-17-52-59.jpg",                          alt: "Client 3" },
  { src: "/cleints/PHOTO-2026-04-18-17-53-20.jpg",                          alt: "Client 4" },
  { src: "/cleints/PHOTO-2026-04-18-17-54-00.jpg",                          alt: "Client 5" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.54.39.jpeg",     alt: "Client 6" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.55.03.jpeg",     alt: "Client 7" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.56.05.jpeg",     alt: "Client 8" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.56.52.jpeg",     alt: "Client 9" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.58.06.jpeg",     alt: "Client 10" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.58.23.jpeg",     alt: "Client 11" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.59.29.jpeg",     alt: "Client 12" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2017.59.36.jpeg",     alt: "Client 13" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2018.00.09.jpeg",     alt: "Client 14" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2018.00.46.jpeg",     alt: "Client 15" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2018.01.19.jpeg",     alt: "Client 16" },
  { src: "/cleints/WhatsApp%20Image%202026-04-18%20at%2018.01.27.jpeg",     alt: "Client 17" },
];

const TRACK = [...PARTNERS, ...PARTNERS];

/* ─────────────────────────────────────────────────────────────
   Section
───────────────────────────────────────────────────────────── */
export default function PartnersMarquee() {
  return (
    <section
      className="relative overflow-hidden py-16"
      style={{
        background: "var(--bg-surface)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Animated grain — sits above background, below content */}
      <NoiseOverlay patternAlpha={20} patternRefreshInterval={2} />

      {/* ── Section heading ── */}
      <div className="relative z-20 text-center mb-12 px-6">
        <p
          className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
          style={{ color: "var(--text-muted)" }}
        >
          Trusted by the best
        </p>
        <h2
          className="text-2xl sm:text-3xl font-semibold text-emboss"
          style={{ color: "var(--text-primary)" }}
        >
          Our Clients
        </h2>
        <div
          className="mx-auto mt-4"
          style={{
            width: 40,
            height: 3,
            borderRadius: 9999,
            background: "var(--accent)",
            opacity: 0.7,
          }}
        />
      </div>

      {/* ── Edge fade masks ── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, bottom: 0,
          width: 160,
          background: "linear-gradient(to right, var(--bg-surface) 0%, transparent 100%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, right: 0, bottom: 0,
          width: 160,
          background: "linear-gradient(to left, var(--bg-surface) 0%, transparent 100%)",
          zIndex: 20,
          pointerEvents: "none",
        }}
      />

      {/* ── Marquee viewport ── */}
      <div className="relative z-10" style={{ overflow: "hidden" }}>
        <div className="partners-marquee-track">
          {TRACK.map((partner, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 1.25rem",
                padding: "1.2rem 2.4rem",
                borderRadius: "1.4rem",
                background: "var(--glass-partner-bg)",
                backdropFilter: "blur(18px) saturate(150%)",
                WebkitBackdropFilter: "blur(18px) saturate(150%)",
                border: "1px solid rgba(180,160,130,0.30)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(100,80,50,0.08), 0 4px 16px rgba(100,80,50,0.12)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-4px) scale(1.05)";
                el.style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.92), 0 12px 32px rgba(100,80,50,0.20)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0) scale(1)";
                el.style.boxShadow =
                  "inset 0 1px 0 rgba(255,255,255,0.80), inset 0 -1px 0 rgba(100,80,50,0.08), 0 4px 16px rgba(100,80,50,0.12)";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.src}
                alt={partner.alt}
                style={{
                  height: 76,
                  width: "auto",
                  maxWidth: 190,
                  objectFit: "contain",
                  display: "block",
                  filter: "grayscale(20%) opacity(0.84)",
                  transition: "filter 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = "grayscale(0%) opacity(1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = "grayscale(20%) opacity(0.84)";
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes partners-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .partners-marquee-track {
          display: flex;
          align-items: center;
          width: max-content;
          padding: 0.5rem 0 1rem;
          animation: partners-scroll 32s linear infinite;
        }
        .partners-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
