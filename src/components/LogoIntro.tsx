"use client";

import { useEffect, useRef, useState } from "react";



export default function LogoIntro() {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const handledRef = useRef(false);
  const safetyIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = () => {
    if (handledRef.current) return;
    handledRef.current = true;
    if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
    setFading(true);
    // Signal content to reveal only after overlay has fully faded out
    setTimeout(() => {
      setShow(false);
      window.dispatchEvent(new CustomEvent("intro:done"));
    }, 500);
  };

  // Called as a React prop so it fires even if metadata was already loaded
  const handleLoadedMetadata = () => {
    const vid = videoRef.current;
    if (!vid || handledRef.current) return;
    const duration = isFinite(vid.duration) && vid.duration > 0 ? vid.duration : 15;
    // Safety fallback: only fires if onEnded never fires
    if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
    safetyIdRef.current = setTimeout(dismiss, duration * 1000 + 2000);
  };

  useEffect(() => {
    const skip = () => {
      window.dispatchEvent(new CustomEvent("intro:done"));
      setShow(false);
    };

    // Skip if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      skip();
      return;
    }

    const vid = videoRef.current;
    if (!vid) return;

    // Attempt play (muted autoplay should succeed in all browsers)
    vid.play().catch(() => {
      // Autoplay blocked — skip intro immediately
      skip();
    });

    // If metadata was already loaded before this effect ran (preload="auto"
    // can do this), handleLoadedMetadata won't fire again — set safety now.
    if (vid.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      if (safetyIdRef.current) clearTimeout(safetyIdRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.5s ease",
        willChange: "opacity",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <video
        ref={videoRef}
        src="/Maan Logo Animation_01.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={dismiss}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
}
