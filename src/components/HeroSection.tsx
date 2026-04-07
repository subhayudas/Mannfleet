"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Hls from "hls.js";

const HLS_STREAMS = [
  "https://pikaso.cdnpk.net/private/production/3833482841/358ed799-396d-45b3-b7b9-263484f13e53-0.mp4?token=exp=1775520000~hmac=fd31be526d2bf0c0d9e575aa853c8169bc4aba5af56f18bd146707430eb2d440",
  "https://stream.mux.com/t1TbTB8M1VYHkhxBuap4A8Vm1x015HTHyuQxqchDBago.m3u8",
  "https://stream.mux.com/6yvj9SR5bjmXq9N3ak7gy427RwUs8R2ZoH4ndA7Q1018.m3u8",
];

/* ── HLS Video ───────────────────────────────────────────── */
function HlsVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay muted loop playsInline preload="auto"
      className={className}
    />
  );
}

/* ── Icons ───────────────────────────────────────────────── */
function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function PlayIcon({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

/* ── Main Component ──────────────────────────────────────── */
export default function HeroSection() {
  return (
    <section
      className="scene-bg relative flex flex-col min-h-screen lg:h-screen lg:overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* ── Navigation ── */}
      <div className="relative z-20 shrink-0 px-5 lg:px-10 pt-4 pb-4">
      <nav className="glass-nav flex items-center justify-between px-5 lg:px-8 py-3.5" style={{ borderRadius: "9999px" }}>
        {/* Logo */}
        <Image
          src="/mannlogo.webp"
          alt="MANN"
          width={100}
          height={36}
          className="select-none"
          style={{ objectFit: "contain" }}
          priority
        />

        {/* Center nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {["About", "Fleet", "Pricing", "Contact"].map((link) => (
            <li key={link}>
              <a
                href="#"
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: "rgba(44, 36, 22, 0.55)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#2C2416"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(44, 36, 22, 0.55)"; }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium px-4 py-2 rounded-full transition-colors duration-200"
            style={{ color: "rgba(44, 36, 22, 0.55)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#2C2416"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(44, 36, 22, 0.55)"; }}
          >
            Log in
          </a>
          <button className="btn-primary text-sm">
            Book Now
          </button>
        </div>
      </nav>
      </div>

      {/* ── Content area ── */}
      <div className="relative z-10 flex-1 px-5 lg:px-16 pb-8 lg:pb-16 flex flex-col">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch flex-1">

          {/* ═══════════════════════════════════
              LEFT COLUMN
          ═══════════════════════════════════ */}
          <div className="flex flex-col justify-between animate-fade-up">
            <div className="pt-6 lg:pt-10">

              {/* H1 headline */}
              <h1
                className="text-[2.1rem] sm:text-5xl lg:text-[3.4rem] xl:text-[4.2rem] font-semibold tracking-tight leading-[1.07]"
                style={{ color: "#2C2416" }}
              >
                {/* Line 1: avatar pill + "Premium" */}
                <span className="flex items-center gap-3 flex-wrap">
                  <span
                    className="glass-card inline-block shrink-0"
                    style={{
                      width: "5rem",
                      height: "2.6rem",
                      borderRadius: "9999px",
                      backgroundImage:
                        "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&q=80')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                    aria-hidden="true"
                  />
                  <span className="text-emboss">Premium</span>
                </span>

                {/* Line 2 */}
                <span className="block text-emboss" style={{ color: "rgba(44,36,22,0.75)" }}>
                  vehicles for
                </span>

                {/* Line 3: "every journey" + play pill */}
                <span className="flex items-center gap-3 flex-wrap">
                  <span style={{ color: "#2C2416" }} className="text-emboss">
                    every journey
                  </span>
                  <button className="btn-outline-skeu">
                    <PlayIcon size={12} />
                    <span>How it works</span>
                  </button>
                </span>

                {/* Line 4 */}
                <span className="block text-emboss" style={{ color: "rgba(44,36,22,0.75)" }}>
                  with MANN
                </span>
              </h1>

              {/* CTAs */}
              <div className="flex items-center gap-4 pt-8 flex-wrap">
                <button className="btn-primary">
                  Browse Fleet
                  <ArrowUpRight size={15} />
                </button>
                <a
                  href="#"
                  className="text-sm font-semibold transition-colors duration-200"
                  style={{
                    color: "rgba(44,36,22,0.55)",
                    textDecoration: "underline",
                    textUnderlineOffset: "3px",
                    textDecorationColor: "rgba(44,36,22,0.28)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#2C2416";
                    e.currentTarget.style.textDecorationColor = "rgba(44,36,22,0.55)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(44,36,22,0.55)";
                    e.currentTarget.style.textDecorationColor = "rgba(44,36,22,0.28)";
                  }}
                >
                  Book a ride
                </a>
              </div>
            </div>

            {/* Bottom group — desktop only */}
            <div className="hidden lg:block mt-8 animate-fade-up-delay-2">
              <hr className="rule-glass mb-6" />
              <p className="text-sm max-w-[380px] leading-relaxed" style={{ color: "rgba(44,36,22,0.52)" }}>
                From city commutes to cross-country road trips, MANN delivers
                an exceptional fleet of vehicles with seamless booking and
                world-class customer service.
              </p>
              <div className="flex flex-wrap items-center gap-6 mt-6">
                {["Audi", "BMW", "Mercedes", "Tesla"].map((brand) => (
                  <span
                    key={brand}
                    className="font-bold text-xl tracking-tight"
                    style={{ color: "rgba(44,36,22,0.22)", cursor: "default", transition: "color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(44,36,22,0.50)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(44,36,22,0.22)"; }}
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════
              RIGHT COLUMN — Glass Cards
          ═══════════════════════════════════ */}
          <div className="flex flex-col gap-4 animate-fade-up-delay">

            {/* ── Card 1 — large ── */}
            <div className="glass-card relative rounded-[2rem] overflow-hidden flex-1 min-h-[220px]">
              <HlsVideo
                src={HLS_STREAMS[0]}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.42)" }} />

              <div className="relative z-10 h-full flex flex-col justify-between p-7 lg:p-8">
                <div />
                <div>
                  <h2
                    className="text-white text-xl lg:text-2xl font-semibold leading-snug mb-3"
                    style={{ textShadow: "0 1px 3px rgba(0,0,0,0.55)" }}
                  >
                    Ready to hit the road?
                    Let&apos;s find your perfect car.
                  </h2>
                  <div className="flex items-end justify-between gap-4">
                    <p className="text-sm leading-relaxed max-w-[260px]" style={{ color: "rgba(255,255,255,0.72)" }}>
                      Book online in minutes. Pick up at your location or one
                      of our conveniently placed depots.
                    </p>
                    <button className="btn-disc" aria-label="Get in touch">
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Cards 2 & 3 — bottom row ── */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4 flex-1">

              {/* Card 2 */}
              <div className="glass-card relative rounded-[1.75rem] overflow-hidden min-h-[190px]">
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    src="/6886022_Famous_Place_Tourism_1280x720.mp4"
                    autoPlay muted loop playsInline preload="auto"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[150%] min-h-[150%] object-cover"
                  />
                </div>
                <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.46)" }} />

                <div className="relative z-10 h-full flex flex-col justify-between p-5 lg:p-6">
                  <div className="flex items-start justify-between">
                    <span className="glass-badge">fleet</span>
                    <button className="btn-disc" style={{ width: "2rem", height: "2rem" }} aria-label="View locations">
                      <ArrowUpRight size={13} />
                    </button>
                  </div>
                  <div>
                    <h3
                      className="text-white text-base lg:text-xl font-semibold leading-tight mb-1"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.60)" }}
                    >
                      200+ premium vehicles
                    </h3>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.62)" }}>
                      SUVs, sedans, sports & luxury.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 — IATA Approved */}
              <style>{`
                @keyframes iata-shimmer { 0%{transform:translateX(-160%) skewX(-16deg);opacity:0} 20%{opacity:1} 80%{opacity:1} 100%{transform:translateX(260%) skewX(-16deg);opacity:0} }
                @keyframes iata-glow    { 0%,100%{opacity:0} 50%{opacity:1} }
                @keyframes iata-stamp   { 0%{transform:scale(0.88);opacity:0} 70%{transform:scale(1.02)} 100%{transform:scale(1);opacity:1} }
                @keyframes iata-ring    { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.06);opacity:0.9} }
              `}</style>

              <div className="relative rounded-[1.75rem] overflow-hidden min-h-[190px]" style={{
                background: "#ffffff",
                boxShadow: "0 0 0 1px rgba(180,160,130,0.30), 0 10px 32px rgba(100,80,50,0.14), inset 0 1px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(100,80,50,0.08)",
              }}>

                {/* skeuomorphic top gloss */}
                <div style={{
                  position:"absolute", top:0, left:0, right:0, height:"55%",
                  background:"linear-gradient(to bottom, rgba(255,255,255,0.80) 0%, transparent 100%)",
                  borderRadius:"1.75rem 1.75rem 0 0", pointerEvents:"none", zIndex:1,
                }} />

                {/* IATA logo — full bleed, almost fills the entire card */}
                <div style={{
                  position:"absolute", inset:"10px 10px 44px 10px",
                  borderRadius:16, overflow:"hidden",
                  animation:"iata-stamp 0.55s cubic-bezier(0.34,1.56,0.64,1) 0.1s both",
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/IATA.jpg"
                    alt="IATA"
                    style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", display:"block" }}
                  />
                  {/* shimmer sweep */}
                  <div style={{
                    position:"absolute", inset:0, width:"45%",
                    background:"linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)",
                    animation:"iata-shimmer 4s ease-in-out infinite",
                    animationDelay:"1s", pointerEvents:"none",
                  }} />
                  {/* subtle vignette on edges */}
                  <div style={{
                    position:"absolute", inset:0, borderRadius:16,
                    boxShadow:"inset 0 0 20px rgba(244,239,230,0.35)",
                    pointerEvents:"none",
                  }} />
                </div>

                {/* floating top-left badge */}
                <div style={{
                  position:"absolute", top:16, left:16, zIndex:3,
                  background:"rgba(255,255,255,0.82)",
                  backdropFilter:"blur(12px)", WebkitBackdropFilter:"blur(12px)",
                  border:"1px solid rgba(180,160,130,0.30)",
                  borderRadius:9999,
                  padding:"3px 10px",
                  fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.08em",
                  color:"rgba(44,36,22,0.55)",
                  boxShadow:"inset 0 1px 0 rgba(255,255,255,0.90), 0 2px 8px rgba(100,80,50,0.12)",
                }}>ACCREDITATION</div>

                {/* floating top-right certified tick */}
                <div style={{
                  position:"absolute", top:14, right:14, zIndex:3,
                  width:26, height:26, borderRadius:"50%",
                  background:"var(--accent)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  boxShadow:"inset 0 1px 0 rgba(255,255,255,0.30), 0 2px 8px rgba(30,80,160,0.40)",
                  animation:"iata-ring 2.5s ease-in-out infinite",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="white" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>

                {/* bottom frosted strip */}
                <div style={{
                  position:"absolute", bottom:0, left:0, right:0, height:44, zIndex:3,
                  background:"rgba(255,255,255,0.82)",
                  backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)",
                  borderTop:"1px solid rgba(180,160,130,0.20)",
                  display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"0 14px",
                  boxShadow:"inset 0 1px 0 rgba(255,255,255,0.90)",
                }}>
                  <div>
                    <p style={{ fontWeight:700, fontSize:"0.78rem", color:"var(--text-primary)", lineHeight:1, marginBottom:2 }}>
                      IATA Approved
                    </p>
                    <p style={{ fontSize:"0.62rem", color:"var(--text-muted)", lineHeight:1 }}>
                      Globally recognised
                    </p>
                  </div>
                  {/* pulsing glow dot */}
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <div style={{
                      width:6, height:6, borderRadius:"50%", background:"#4ade80",
                      boxShadow:"0 0 0 3px rgba(74,222,128,0.25)",
                      animation:"iata-ring 2s ease-in-out infinite",
                    }} />
                    <span style={{ fontSize:"0.60rem", fontWeight:700, color:"rgba(44,36,22,0.40)", letterSpacing:"0.05em" }}>LIVE</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
