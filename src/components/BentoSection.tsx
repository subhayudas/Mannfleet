"use client";

import { useEffect, useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────
   BentoSection — animated USP bento grid
───────────────────────────────────────────────────────────────*/

/* Keyframes are defined in globals.css */

/* ── background video ─────────────────────────────────────── */
function BgVideo({ src }: { src: string }) {
  return (
    <video src={src} autoPlay muted loop playsInline style={{
      position:"absolute", inset:0, width:"100%", height:"100%",
      objectFit:"cover", pointerEvents:"none",
    }} />
  );
}

/* ── icons ────────────────────────────────────────────────── */
function IconUser() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}
function IconHeadset() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/>
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
    </svg>
  );
}
function IconMap() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  );
}
function IconStar({ filled = true }: { filled?: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor" strokeWidth={1.5}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   CARD COMPONENTS
════════════════════════════════════════════════════════════ */

/* ── Chauffeur card ───────────────────────────────────────── */
function ChauffeurCard() {
  const [eta, setEta] = useState(4);

  useEffect(() => {
    const t = setInterval(() => setEta(p => (p <= 1 ? 4 : p - 1)), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      gridArea:"chauffeur", borderRadius:24,
      border:"1px solid rgba(255,252,245,0.12)",
      boxShadow:"0 12px 40px rgba(20,14,6,0.30)",
      padding:"28px 26px",
      display:"flex", flexDirection:"column", justifyContent:"space-between",
      position:"relative", overflow:"hidden",
    }}>
      <BgVideo src="/0_Car_Expensive_1280x720.mp4" />
      <div style={{ position:"absolute", inset:0, background:"rgba(20,14,6,0.54)", pointerEvents:"none" }} />
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:56,
        background:"linear-gradient(to bottom, rgba(255,255,255,0.09), transparent)",
        borderRadius:"24px 24px 0 0", pointerEvents:"none",
      }} />

      {/* top content */}
      <div style={{ position:"relative", zIndex:2 }}>
        <span style={{
          display:"inline-block", marginBottom:14,
          padding:"0.18rem 0.78rem", borderRadius:9999,
          fontSize:"0.68rem", fontWeight:600, letterSpacing:"0.06em",
          background:"rgba(255,252,245,0.14)", border:"1px solid rgba(255,252,245,0.28)",
          color:"rgba(255,252,245,0.90)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
        }}>CHAUFFEURS</span>
        <h2 style={{
          fontSize:"clamp(1.4rem,2.2vw,1.9rem)", fontWeight:800,
          lineHeight:1.15, color:"#fff", marginBottom:12,
        }}>
          Professional<br />Chauffeurs,<br />Always.
        </h2>
        <p style={{ fontSize:"0.80rem", color:"rgba(255,252,245,0.62)", lineHeight:1.6, maxWidth:200 }}>
          Every driver is rigorously vetted, licensed, and trained for a five-star journey.
        </p>
      </div>

      {/* animated driver card */}
      <div style={{
        position:"relative", zIndex:2,
        background:"rgba(255,252,245,0.10)",
        backdropFilter:"blur(20px) saturate(150%)", WebkitBackdropFilter:"blur(20px) saturate(150%)",
        border:"1px solid rgba(255,252,245,0.20)",
        borderRadius:16, padding:"16px 18px",
        boxShadow:"inset 0 1px 0 rgba(255,255,255,0.16)",
      }}>
        {/* driver row */}
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
          <div style={{
            width:40, height:40, borderRadius:"50%", background:"var(--accent)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"#fff", flexShrink:0,
            boxShadow:"0 3px 10px rgba(30,80,160,0.35)",
          }}>
            <IconUser />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:"0.86rem", color:"#fff", marginBottom:3 }}>
              James M.
            </div>
            {/* star row */}
            <div style={{ display:"flex", alignItems:"center", gap:2, color:"#facc15" }}>
              {[1,2,3,4,5].map(s => <IconStar key={s} />)}
              <span style={{ fontSize:"0.70rem", color:"rgba(255,252,245,0.60)", marginLeft:4 }}>
                4.98 · 2,400+ rides
              </span>
            </div>
          </div>
          {/* live ETA badge */}
          <div style={{
            background:"rgba(74,222,128,0.18)", border:"1px solid rgba(74,222,128,0.40)",
            borderRadius:8, padding:"4px 8px", textAlign:"center",
            transition:"all 0.4s ease",
          }}>
            <div style={{ fontSize:"1.1rem", fontWeight:900, color:"#4ade80", lineHeight:1 }}>
              {eta}
            </div>
            <div style={{ fontSize:"0.58rem", color:"rgba(74,222,128,0.80)", fontWeight:600, letterSpacing:"0.04em" }}>
              MIN
            </div>
          </div>
        </div>

        {/* animated route bar */}
        <div style={{ position:"relative", display:"flex", alignItems:"center", gap:8 }}>
          {/* origin dot */}
          <div style={{
            width:9, height:9, borderRadius:"50%", flexShrink:0,
            background:"#fff", boxShadow:"0 0 6px rgba(255,255,255,0.8)",
          }} />
          {/* track */}
          <div style={{
            flex:1, height:3, borderRadius:9999,
            background:"rgba(255,255,255,0.15)", position:"relative", overflow:"hidden",
          }}>
            {/* fill */}
            <div style={{
              position:"absolute", top:0, left:0, height:"100%", borderRadius:9999,
              background:"linear-gradient(to right, #4ade80, rgba(74,222,128,0.4))",
              animation:"b-progress 4s cubic-bezier(0.4,0,0.2,1) infinite",
            }} />
            {/* car icon moving */}
            <div style={{
              position:"absolute", top:"50%", transform:"translateY(-50%)",
              animation:"b-car-move 4s cubic-bezier(0.4,0,0.2,1) infinite",
              fontSize:10, lineHeight:1,
            }}>🚗</div>
          </div>
          {/* destination dot */}
          <div style={{
            width:9, height:9, borderRadius:"50%", flexShrink:0,
            background:"rgba(255,255,255,0.35)",
            border:"2px solid rgba(255,255,255,0.5)",
          }} />
        </div>

        {/* status row */}
        <div style={{
          display:"flex", alignItems:"center", gap:8, marginTop:12,
          background:"rgba(255,255,255,0.06)", borderRadius:9, padding:"7px 11px",
        }}>
          <div style={{
            width:7, height:7, borderRadius:"50%", background:"#4ade80", flexShrink:0,
            animation:"b-pulse-dot 1.8s ease-in-out infinite",
          }} />
          <span style={{ fontSize:"0.73rem", color:"rgba(255,252,245,0.75)", flex:1 }}>
            En route · ETA <span style={{ color:"#4ade80", fontWeight:700, transition:"all 0.3s" }}>{eta} min</span>
          </span>
          <span style={{
            fontSize:"0.62rem", fontWeight:700, letterSpacing:"0.05em",
            color:"#4ade80", animation:"b-blink 2s ease-in-out infinite",
          }}>LIVE</span>
        </div>
      </div>
    </div>
  );
}

/* ── Quality card ─────────────────────────────────────────── */
function QualityCard() {
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowBadge(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      gridArea:"quality", borderRadius:24,
      border:"1px solid rgba(255,252,245,0.12)",
      boxShadow:"0 8px 28px rgba(20,14,6,0.28)",
      padding:"28px 32px",
      display:"flex", flexDirection:"column", justifyContent:"flex-end",
      position:"relative", overflow:"hidden",
    }}>
      <BgVideo src="/6636153_Car_Detailing_1280x720.mp4" />
      <div style={{ position:"absolute", inset:0, background:"rgba(12,30,70,0.52)", pointerEvents:"none" }} />

      {/* scan line sweeping over video */}
      <div style={{
        position:"absolute", left:0, right:0, height:2,
        background:"linear-gradient(to right, transparent, rgba(100,160,255,0.7), transparent)",
        pointerEvents:"none", zIndex:1,
        animation:"b-scan 3.5s linear infinite",
      }} />

      {/* centred animated shield */}
      <div style={{
        position:"absolute", top:"38%", left:"50%",
        transform:"translate(-50%, -50%)", zIndex:2,
      }}>
        <svg width="90" height="90" viewBox="0 0 90 90">
          {/* spinning track ring */}
          <circle cx="45" cy="45" r="38"
            fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3"
          />
          {/* animated progress ring */}
          <circle cx="45" cy="45" r="38"
            fill="none" stroke="rgba(100,160,255,0.8)" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="220"
            style={{
              transformOrigin:"50% 50%",
              transform:"rotate(-90deg)",
              animation:"b-shield-spin 3s ease-out infinite",
            }}
          />
          {/* shield icon inside */}
          <g transform="translate(20, 18)">
            <path d="M25 46s18-8 18-21V11L25 5 7 11v14c0 13 18 21 18 21z"
              fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* checkmark that redraws */}
            <path d="M17 25l6 6 10-10"
              fill="none" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray="30"
              style={{ animation:"b-check-draw 1.2s ease forwards, b-shield-spin 3s ease-out infinite" }}
            />
          </g>
        </svg>

        {/* "VERIFIED" badge that pops in */}
        {showBadge && (
          <div style={{
            position:"absolute", top:-10, right:-14,
            background:"#4ade80", color:"#000",
            fontSize:"0.55rem", fontWeight:800, letterSpacing:"0.06em",
            padding:"3px 7px", borderRadius:9999,
            boxShadow:"0 2px 8px rgba(74,222,128,0.5)",
            animation:"b-badge-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>✓ VERIFIED</div>
        )}
      </div>

      <div style={{ position:"relative", zIndex:2 }}>
        <div style={{ fontWeight:700, fontSize:"1.05rem", color:"#fff", marginBottom:4 }}>
          Certified Quality
        </div>
        <div style={{ fontSize:"0.78rem", color:"rgba(255,255,255,0.60)", lineHeight:1.5 }}>
          ISO-audited fleet · every vehicle inspected before every ride
        </div>
      </div>
    </div>
  );
}

/* ── Tracking notification card ───────────────────────────── */
function TrackingCard() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSeconds(p => p + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const timeLabel = seconds < 60
    ? `${seconds}s ago`
    : `${Math.floor(seconds / 60)}m ago`;

  return (
    <div style={{
      gridArea:"tracking",
      background:"var(--glass-surface-86)",
      backdropFilter:"blur(28px) saturate(150%)", WebkitBackdropFilter:"blur(28px) saturate(150%)",
      borderRadius:24, border:"1px solid var(--border-mid)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.72), 0 6px 24px rgba(100,80,50,0.14)",
      padding:"20px 20px",
      display:"flex", alignItems:"center", gap:14,
      animation:"b-notif-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
    }}>
      {/* app icon with pulse ring */}
      <div style={{ position:"relative", flexShrink:0 }}>
        <div style={{
          position:"absolute", inset:0, borderRadius:13,
          background:"var(--accent)", opacity:0.5,
          animation:"b-ping 2.4s ease-out infinite",
        }} />
        <div style={{
          width:44, height:44, borderRadius:13, position:"relative", zIndex:1,
          background:"var(--accent)",
          display:"flex", alignItems:"center", justifyContent:"center", color:"#fff",
          boxShadow:"inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 10px rgba(30,80,160,0.30)",
        }}>
          <span style={{ fontWeight:800, fontSize:"0.88rem", letterSpacing:"0.06em" }}>M</span>
        </div>
      </div>

      <div style={{ flex:1, minWidth:0 }}>
        <div style={{
          display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3,
        }}>
          <span style={{ fontWeight:700, fontSize:"0.86rem", color:"var(--text-primary)" }}>MANN</span>
          <span style={{
            fontSize:"0.68rem", color:"var(--text-muted)",
            transition:"all 0.4s ease",
          }}>{timeLabel}</span>
        </div>
        <p style={{ fontSize:"0.78rem", color:"var(--text-secondary)", lineHeight:1.4, margin:0 }}>
          Your chauffeur is 4 minutes away. Safe travels!
        </p>
      </div>
    </div>
  );
}

/* ── Brand card ───────────────────────────────────────────── */
function BrandCard() {
  const particles = [
    { left:"20%", delay:"0s",   size:5 },
    { left:"50%", delay:"0.8s", size:4 },
    { left:"75%", delay:"1.5s", size:6 },
    { left:"35%", delay:"2.1s", size:3 },
  ];

  return (
    <div style={{
      gridArea:"brand", borderRadius:24,
      border:"1px solid rgba(255,252,245,0.10)",
      boxShadow:"0 12px 40px rgba(20,14,6,0.40)",
      display:"flex", flexDirection:"column",
      alignItems:"center", justifyContent:"center",
      padding:"32px 24px",
      position:"relative", overflow:"hidden",
    }}>
      <BgVideo src="/0_Car_Night_1280x720.mp4" />
      <div style={{ position:"absolute", inset:0, background:"rgba(8,6,3,0.60)", pointerEvents:"none" }} />
      <div style={{
        position:"absolute", inset:0, borderRadius:24,
        background:"radial-gradient(ellipse 70% 50% at 50% 50%, rgba(30,80,160,0.20) 0%, transparent 70%)",
        pointerEvents:"none",
      }} />

      {/* floating particles */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position:"absolute", bottom:"15%", left:p.left,
          width:p.size, height:p.size, borderRadius:"50%",
          background:"rgba(255,255,255,0.55)",
          animation:`b-float-up ${2.8 + i * 0.4}s ease-in infinite`,
          animationDelay:p.delay,
          pointerEvents:"none",
        }} />
      ))}

    </div>
  );
}

/* ── Support card ─────────────────────────────────────────── */
function SupportCard() {
  // 12 waveform bars
  const bars = [0.3,0.7,1,0.5,0.85,0.4,0.9,0.6,0.75,0.45,0.8,0.35];

  return (
    <div style={{
      gridArea:"support", background:"#2C2416",
      borderRadius:24, border:"1px solid rgba(255,252,245,0.10)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.06), 0 8px 28px rgba(44,36,22,0.36)",
      padding:"28px 28px",
      display:"flex", flexDirection:"column", justifyContent:"space-between",
      position:"relative", overflow:"hidden",
    }}>
      {/* top row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ color:"rgba(255,252,245,0.50)" }}>
          <IconHeadset />
        </div>
        {/* online indicator */}
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{
            width:7, height:7, borderRadius:"50%", background:"#4ade80",
            animation:"b-pulse-dot 2s ease-in-out infinite",
          }} />
          <span style={{
            fontSize:"0.65rem", fontWeight:700, letterSpacing:"0.06em",
            color:"rgba(74,222,128,0.90)",
          }}>ONLINE</span>
        </div>
      </div>

      {/* waveform */}
      <div style={{
        display:"flex", alignItems:"center", gap:3,
        height:40, paddingLeft:2,
      }}>
        {bars.map((h, i) => (
          <div key={i} style={{
            width:4, borderRadius:2, flexShrink:0,
            background:`rgba(255,252,245,${0.3 + h * 0.45})`,
            height:`${h * 36}px`,
            transformOrigin:"center",
            animation:`b-wave ${0.6 + (i % 4) * 0.12}s ease-in-out infinite`,
            animationDelay:`${i * 0.055}s`,
          }} />
        ))}
      </div>

      <div>
        <h3 style={{
          fontWeight:800,
          fontSize:"clamp(1.1rem,1.8vw,1.4rem)",
          color:"#fff", lineHeight:1.2, marginBottom:8,
        }}>
          Dedicated<br />Support, 24 / 7.
        </h3>
        <p style={{ fontSize:"0.76rem", color:"rgba(255,252,245,0.46)", lineHeight:1.55 }}>
          Real agents ready around the clock — call, chat, or message.
        </p>
      </div>
    </div>
  );
}

/* ── Essentials card ──────────────────────────────────────── */
function EssentialsCard() {
  return (
    <div style={{
      gridArea:"essentials", borderRadius:24,
      border:"1px solid rgba(255,252,245,0.12)",
      boxShadow:"0 8px 28px rgba(20,14,6,0.26)",
      padding:"28px 28px",
      display:"flex", flexDirection:"column", justifyContent:"flex-end",
      position:"relative", overflow:"hidden",
    }}>
      <BgVideo src="/5264613_Vehicle_Transport_1280x720.mp4" />
      <div style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(20,14,6,0.82) 0%, rgba(20,14,6,0.22) 55%, transparent 100%)",
        pointerEvents:"none",
      }} />

      <div style={{ position:"relative", zIndex:2 }}>
        {/* animated wifi icon */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:12, marginBottom:14 }}>
          <div style={{
            width:38, height:38, borderRadius:11,
            background:"rgba(255,252,245,0.14)",
            border:"1px solid rgba(255,252,245,0.24)",
            display:"flex", alignItems:"center", justifyContent:"center",
            backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
          }}>
            {/* WiFi SVG with animated arcs */}
            <svg width="20" height="16" viewBox="0 0 24 18" fill="none">
              <path d="M12 16.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" fill="white"/>
              <path d="M6.5 11.5a7.7 7.7 0 0 1 11 0"
                stroke="white" strokeWidth="2" strokeLinecap="round"
                style={{ animation:"b-wifi-1 2.5s ease-in-out infinite" }}
              />
              <path d="M3 8a12 12 0 0 1 18 0"
                stroke="white" strokeWidth="2" strokeLinecap="round"
                style={{ animation:"b-wifi-2 2.5s ease-in-out infinite" }}
              />
              <path d="M0.5 4.5a16 16 0 0 1 23 0"
                stroke="white" strokeWidth="2" strokeLinecap="round"
                style={{ animation:"b-wifi-3 2.5s ease-in-out infinite" }}
              />
            </svg>
          </div>

          {/* essentials pills */}
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {["Wi-Fi","Water","Charging"].map((item, i) => (
              <span key={item} style={{
                padding:"3px 9px", borderRadius:9999,
                background:"rgba(255,252,245,0.12)",
                border:"1px solid rgba(255,252,245,0.20)",
                fontSize:"0.65rem", fontWeight:600,
                color:"rgba(255,252,245,0.80)",
                backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)",
                animation:"b-slide-r 0.4s ease forwards",
                animationDelay:`${0.1 + i * 0.1}s`,
                opacity:0,
              }}>{item}</span>
            ))}
          </div>
        </div>

        <div style={{ fontWeight:700, fontSize:"0.95rem", color:"#fff", marginBottom:4 }}>
          In-Car Essentials
        </div>
        <div style={{ fontSize:"0.76rem", color:"rgba(255,252,245,0.58)" }}>
          Everything you need, included in every ride
        </div>
      </div>
    </div>
  );
}

/* ── Pickup card ──────────────────────────────────────────── */

// Simplified UK outline path + pin locations
const UK_PATH =
  "M72 8 C74 6 78 5 80 7 L84 5 C86 4 88 6 87 9 L89 12 C91 14 90 17 88 18 L90 22 C92 26 91 30 88 32 L86 38 C88 42 87 48 84 51 L82 57 C80 63 77 68 73 70 L70 76 C67 82 62 86 57 85 L54 89 C50 93 44 93 40 90 L36 92 C32 94 27 92 25 88 L22 84 C18 82 17 77 19 73 L17 68 C15 64 16 58 19 55 L18 50 C16 46 17 41 20 38 L22 32 C20 28 21 23 24 20 L26 15 C28 10 32 7 37 7 L42 4 C46 2 51 3 54 6 L58 5 C62 3 67 4 70 7 Z";

const MAP_PINS = [
  { cx: 48, cy: 28, delay: "0s" },    // Edinburgh area
  { cx: 42, cy: 44, delay: "0.4s" },  // Manchester area
  { cx: 55, cy: 52, delay: "0.8s" },  // Birmingham area
  { cx: 50, cy: 68, delay: "1.2s" },  // London area
  { cx: 34, cy: 56, delay: "1.6s" },  // Wales area
  { cx: 62, cy: 38, delay: "2.0s" },  // Leeds area
];

function PickupCard() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 28;
    const duration = 1400;
    const step = target / (duration / 16);
    let current = 0;
    const t = setInterval(() => {
      current += step;
      if (current >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(current));
    }, 16);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      gridArea:"pickup", background:"var(--bg-surface)",
      borderRadius:24, border:"1px solid var(--border-subtle)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.65), 0 6px 24px rgba(100,80,50,0.12)",
      padding:"20px 22px",
      display:"flex", flexDirection:"column", justifyContent:"space-between",
      position:"relative", overflow:"hidden",
    }}>

      {/* top: count + label */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", position:"relative", zIndex:1 }}>
        <div>
          <div style={{
            fontSize:"clamp(1.8rem,3vw,2.5rem)", fontWeight:900,
            color:"var(--text-primary)", lineHeight:1,
            letterSpacing:"-0.02em",
            animation:"b-count-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards",
          }}>
            {count}+
          </div>
          <div style={{ fontWeight:600, fontSize:"0.82rem", color:"var(--text-secondary)", marginTop:3 }}>
            Pickup Points
          </div>
        </div>
        <span style={{
          padding:"3px 10px", borderRadius:9999,
          background:"var(--map-badge-bg)", border:"1px solid var(--border-subtle)",
          fontSize:"0.66rem", fontWeight:600, color:"var(--text-muted)",
          letterSpacing:"0.04em",
        }}>UK-WIDE</span>
      </div>

      {/* SVG map */}
      <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
        <svg viewBox="15 0 80 96" style={{ width:"100%", maxHeight:130 }}>
          {/* UK outline */}
          <path
            d={UK_PATH}
            fill="var(--map-fill)"
            stroke="var(--map-stroke)"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* connecting lines between pins (subtle) */}
          {MAP_PINS.map((pin, i) => {
            if (i === MAP_PINS.length - 1) return null;
            const next = MAP_PINS[i + 1];
            return (
              <line key={i}
                x1={pin.cx} y1={pin.cy} x2={next.cx} y2={next.cy}
                stroke="var(--map-line)" strokeWidth="0.8" strokeDasharray="2 3"
              />
            );
          })}

          {/* pins with ripple */}
          {MAP_PINS.map((pin, i) => (
            <g key={i}>
              {/* ripple ring */}
              <circle
                cx={pin.cx} cy={pin.cy} r="5"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="1.2"
                opacity="0.5"
                style={{
                  animation: "b-ripple 2.4s ease-out infinite",
                  animationDelay: pin.delay,
                  transformOrigin: `${pin.cx}px ${pin.cy}px`,
                }}
              />
              {/* pin dot */}
              <circle
                cx={pin.cx} cy={pin.cy} r="3"
                fill="var(--accent)"
                style={{
                  animation: "b-pulse-dot 2s ease-in-out infinite",
                  animationDelay: pin.delay,
                }}
              />
              <circle cx={pin.cx} cy={pin.cy} r="1.2" fill="white" />
            </g>
          ))}
        </svg>
      </div>

      <p style={{ fontSize:"0.72rem", color:"var(--text-muted)", lineHeight:1.4, position:"relative", zIndex:1 }}>
        Airports · hotels · city centres
      </p>
    </div>
  );
}

/* ── Pills card ───────────────────────────────────────────── */
function PillsCard() {
  const pills = ["Luxury Fleet","Certified Drivers","On-Time Guarantee","In-Car Wi-Fi","24/7 Availability"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % pills.length), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      gridArea:"pills",
      background:"var(--glass-surface-70)",
      backdropFilter:"blur(20px) saturate(140%)", WebkitBackdropFilter:"blur(20px) saturate(140%)",
      borderRadius:24, border:"1px solid var(--border-subtle)",
      boxShadow:"inset 0 1px 0 rgba(255,255,255,0.68), 0 6px 20px rgba(100,80,50,0.12)",
      padding:"26px 22px",
      display:"flex", flexDirection:"column", justifyContent:"center", gap:9,
    }}>
      {pills.map((pill, i) => (
        <div key={pill} style={{
          display:"inline-flex", alignItems:"center",
          alignSelf: i % 2 === 0 ? "flex-start" : "flex-end",
          padding:"0.38rem 1rem",
          borderRadius:9999,
          background: active === i ? "var(--accent)" : (i === 2 ? "#fff" : "var(--map-badge-bg)"),
          border:`1px solid ${active === i ? "var(--accent-dark)" : (i === 2 ? "var(--border-mid)" : "var(--border-subtle)")}`,
          fontSize:"0.78rem", fontWeight:600,
          color: active === i ? "#fff" : "var(--text-primary)",
          boxShadow: active === i
            ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 4px 14px rgba(30,80,160,0.28)"
            : "inset 0 1px 0 rgba(255,255,255,0.65), 0 1px 4px rgba(100,80,50,0.08)",
          transition:"all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          whiteSpace:"nowrap",
          transform: active === i ? "scale(1.05)" : "scale(1)",
          animation:`${i % 2 === 0 ? "b-slide-r" : "b-slide-l"} 0.5s ease forwards`,
          animationDelay:`${0.05 + i * 0.08}s`,
          opacity:0,
        }}>
          {active === i && (
            <span style={{ marginRight:5, fontSize:"0.65rem" }}>●</span>
          )}
          {pill}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN SECTION
════════════════════════════════════════════════════════════ */
export default function BentoSection() {
  return (
    <>
      <section
        className="scene-bg px-8 lg:px-16 pb-20 pt-16"
        style={{ fontFamily:"'Poppins', sans-serif" }}
      >
        {/* ── Section header ── */}
        <div style={{ marginBottom: 32 }}>
          <span style={{
            display: "inline-block",
            padding: "0.22rem 0.9rem",
            borderRadius: 9999,
            fontSize: "0.95rem",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            background: "var(--map-badge-bg)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.60)",
            marginBottom: 12,
          }}>
            Why MANN
          </span>
          <h2 style={{
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 800,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}>
            Our USPs
          </h2>
        </div>

        <div style={{
          display:"grid",
          gap:12,
          gridTemplateColumns:"1.3fr 1fr 1.8fr 1fr",
          gridTemplateRows:"270px 210px 240px",
          gridTemplateAreas:`
            "chauffeur  quality   quality   tracking"
            "chauffeur  brand     support   support"
            "essentials essentials pickup   pills"
          `,
        }}>
          <ChauffeurCard />
          <QualityCard />
          <TrackingCard />
          <BrandCard />
          <SupportCard />
          <EssentialsCard />
          <PickupCard />
          <PillsCard />
        </div>
      </section>
    </>
  );
}
