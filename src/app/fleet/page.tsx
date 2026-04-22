"use client";

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────── */
type Category = "ECONOMY" | "PREMIUM" | "LUXURY" | "SUPER LUXURY" | "SELF DRIVING" | "LONG TERM LEASING";
type VehicleType = "Sedans" | "SUVs" | "Vans" | "Coaches" | "Self Driving" | "Long Term Leasing";

const CATEGORY_ORDER: Category[] = ["ECONOMY", "PREMIUM", "LUXURY", "SUPER LUXURY", "SELF DRIVING", "LONG TERM LEASING"];
const VEHICLE_TYPES: VehicleType[] = ["Sedans", "SUVs", "Vans", "Coaches", "Self Driving", "Long Term Leasing"];

interface Vehicle {
  id: string;
  name: string;
  image: string;
  seating: string;
  luggage: string;
  category: Category;
  type: VehicleType;
}

/* ─────────────────────────────────────────────────────────────
   VEHICLE DATA
───────────────────────────────────────────────────────────── */
const VEHICLES: Vehicle[] = [
  /* ── SEDANS ─────────────────────────────────────────────── */
  // Economy
  {
    id: "honda-city", name: "Honda City", type: "Sedans", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "506 Litres",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700&q=80",
  },
  {
    id: "hyundai-aura", name: "Hyundai Aura", type: "Sedans", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "402 Litres",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=700&q=80",
  },
  {
    id: "maruti-dzire", name: "Maruti Suzuki Dzire", type: "Sedans", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "382 Litres",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80",
  },
  {
    id: "toyota-etios", name: "Toyota Etios", type: "Sedans", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "592 Litres",
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=700&q=80",
  },
  // Premium
  {
    id: "camry-hybrid", name: "Toyota Camry Hybrid", type: "Sedans", category: "PREMIUM",
    seating: "5 Seater Including Pilot", luggage: "524 Litres",
    image: "/Mann%20car%20pictures/Camry.png",
  },
  // Luxury
  {
    id: "mercedes-e-class", name: "Mercedes-Benz E-Class", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "540 Litres",
    image: "/Mann%20car%20pictures/E%20class2026-04-12%20at%201.40.11%20PM.png",
  },
  {
    id: "bmw-3-series", name: "BMW 3 Series (Gran Limousine)", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "480 Litres",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80",
  },
  {
    id: "audi-a6", name: "Audi A6 / A4", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "530L (A6) / 460L (A4)",
    image: "/Mann%20car%20pictures/a6.png",
  },
  {
    id: "bmw-5-series", name: "BMW 5 Series", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "500 Litres",
    image: "/Mann%20car%20pictures/5%20series2026-04-12%20at%201.41.48%20PM.png",
  },
  // Super Luxury
  {
    id: "mercedes-s-class", name: "Mercedes-Benz S-Class", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "550 Litres",
    image: "/Mann%20car%20pictures/S%20class.png",
  },
  {
    id: "bmw-7-series", name: "BMW 7 Series", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "540 Litres",
    image: "/Mann%20car%20pictures/7%20series.png",
  },
  {
    id: "rolls-phantom", name: "Rolls-Royce Phantom", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "548 Litres",
    image: "/Mann%20car%20pictures/Rolls%20royce%20ghost.jpeg",
  },
  {
    id: "rolls-ghost", name: "Rolls-Royce Ghost", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "507 Litres",
    image: "/Mann%20car%20pictures/Rolls%20royce%20ghost.jpeg",
  },
  {
    id: "maybach-s", name: "Mercedes-Maybach S-Class", type: "Sedans", category: "SUPER LUXURY",
    seating: "4 Seater Including Pilot", luggage: "495 Litres",
    image: "/Mann%20car%20pictures/S%20class.png",
  },

  /* ── SUVs ────────────────────────────────────────────────── */
  // Economy
  {
    id: "fortuner", name: "Toyota Fortuner", type: "SUVs", category: "ECONOMY",
    seating: "7 Seater Including Pilot", luggage: "296L (all rows) / 716L (3rd row folded)",
    image: "/Mann%20car%20pictures/Fortuner.png",
  },
  {
    id: "ertiga", name: "Maruti Suzuki Ertiga", type: "SUVs", category: "ECONOMY",
    seating: "7 Seater Including Pilot", luggage: "209L (all rows) / 550L (3rd row folded)",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&q=80",
  },
  {
    id: "marazzo-7", name: "Mahindra Marazzo", type: "SUVs", category: "ECONOMY",
    seating: "7 Seater Including Pilot", luggage: "190L (all rows) / 600L (3rd row folded)",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80",
  },
  {
    id: "marazzo-8", name: "Mahindra Marazzo", type: "SUVs", category: "ECONOMY",
    seating: "8 Seater Including Pilot", luggage: "190L (all rows) / 600L (3rd row folded)",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=700&q=80",
  },
  // Premium
  {
    id: "hycross-7", name: "Toyota Innova Hycross (Hybrid)", type: "SUVs", category: "PREMIUM",
    seating: "7 Seater Including Pilot", luggage: "300L (all rows) / 991L (3rd row folded)",
    image: "/Mann%20car%20pictures/HYCROSS.png",
  },
  {
    id: "hycross-8", name: "Toyota Innova Hycross (Hybrid)", type: "SUVs", category: "PREMIUM",
    seating: "8 Seater Including Pilot", luggage: "300L (all rows) / 991L (3rd row folded)",
    image: "/Mann%20car%20pictures/HYCROSS.png",
  },
  {
    id: "crysta-7", name: "Toyota Innova Crysta", type: "SUVs", category: "PREMIUM",
    seating: "7 Seater Including Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "crysta-8", name: "Toyota Innova Crysta", type: "SUVs", category: "PREMIUM",
    seating: "8 Seater Including Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "gle-gls", name: "Mercedes-Benz GLE & GLS", type: "SUVs", category: "PREMIUM",
    seating: "5–7 Seater Including Pilot", luggage: "630L (GLE) / 355–890L (GLS)",
    image: "/Mann%20car%20pictures/GLS.png",
  },
  // Luxury
  {
    id: "gle-ml", name: "Mercedes-Benz GLE / ML Class", type: "SUVs", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "630 Litres",
    image: "/Mann%20car%20pictures/GLS.png",
  },
  {
    id: "audi-q7", name: "Audi Q7", type: "SUVs", category: "LUXURY",
    seating: "7 Seater Including Pilot", luggage: "295L (all rows) / 770L (3rd row folded)",
    image: "/Mann%20car%20pictures/Q7.png",
  },
  {
    id: "bmw-x5", name: "BMW X5", type: "SUVs", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "650 Litres",
    image: "/Mann%20car%20pictures/X7.jpeg",
  },
  {
    id: "volvo-xc90", name: "Volvo XC90", type: "SUVs", category: "LUXURY",
    seating: "7 Seater Including Pilot", luggage: "302L (all rows) / 680L (3rd row folded)",
    image: "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=700&q=80",
  },
  // Super Luxury
  {
    id: "gls-450", name: "Mercedes-Benz GLS 400 / 450", type: "SUVs", category: "SUPER LUXURY",
    seating: "7 Seater Including Pilot", luggage: "355L (all rows) / 890L (3rd row folded)",
    image: "/Mann%20car%20pictures/GLS.png",
  },
  {
    id: "range-rover", name: "Range Rover (Vogue / Autobiography / LWB)", type: "SUVs", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "725–900 Litres",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=700&q=80",
  },

  /* ── VANs ────────────────────────────────────────────────── */
  // Economy
  {
    id: "baggage-van", name: "Baggage Van (Force Motors)", type: "Vans", category: "ECONOMY",
    seating: "1 Driver + 1 Passenger", luggage: "~1,500 kg payload (strictly for luggage)",
    image: "/Mann%20car%20pictures/v%20class.jpeg",
  },
  // Premium
  {
    id: "tempo-traveller", name: "Tempo Traveller", type: "Vans", category: "PREMIUM",
    seating: "9 / 12 / 16 Seater Including Pilot", luggage: "Limited rear boot + Roof Carrier for bulk",
    image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=700&q=80",
  },
  {
    id: "urbania-std", name: "Force Urbania (Standard)", type: "Vans", category: "PREMIUM",
    seating: "10 / 13 / 17 Seater Including Pilot", luggage: "Small dedicated rear boot",
    image: "/Mann%20car%20pictures/Force%20Urbania.jpeg",
  },
  // Luxury
  {
    id: "sprinter", name: "Mercedes-Benz Sprinter", type: "Vans", category: "LUXURY",
    seating: "9 / 12 Seater Including Pilot", luggage: "Generous — fits 8–10 large suitcases",
    image: "/Mann%20car%20pictures/mercedes%20sprinter.jpeg",
  },
  {
    id: "toyota-coaster", name: "Toyota Coaster (Luxury)", type: "Vans", category: "LUXURY",
    seating: "13 / 17 / 19 / 21 Seater Including Pilot", luggage: "High — dedicated rear luggage compartment",
    image: "/Mann%20car%20pictures/toyota%20commuter.jpeg",
  },
  {
    id: "urbania-lux", name: "Urbania (Luxury Van)", type: "Vans", category: "LUXURY",
    seating: "9 / 10 Seater Including Pilot", luggage: "Premium — configured for max legroom & luggage",
    image: "/Mann%20car%20pictures/Force%20Urbania.jpeg",
  },
  {
    id: "toyota-hiace", name: "Toyota Hiace", type: "Vans", category: "LUXURY",
    seating: "10 / 14 Seater Including Pilot", luggage: "Flexible — 10-seater has significant boot space",
    image: "/Mann%20car%20pictures/14%20seater%20toyota%20commuter.jpeg",
  },

  /* ── COACHES ─────────────────────────────────────────────── */
  // Economy
  {
    id: "ac-coach", name: "Standard AC Coaches", type: "Coaches", category: "ECONOMY",
    seating: "27 / 35 / 41 / 45 Seater Including Pilot", luggage: "Large under-floor boot — fits 20–30 suitcases",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=700&q=80",
  },
  // Premium
  {
    id: "isuzu", name: "Isuzu Luxury Coaches", type: "Coaches", category: "PREMIUM",
    seating: "27–35 Seater Including Pilot", luggage: "High — wide under-deck storage for team gear",
    image: "https://images.unsplash.com/photo-1581262208435-41726149a759?w=700&q=80",
  },
  {
    id: "volvo-47", name: "Volvo 47 Seater (Standard)", type: "Coaches", category: "PREMIUM",
    seating: "47 Seater Including Pilot", luggage: "Maximum — full-length belly lockers",
    image: "/Mann%20car%20pictures/volvo%2047%2C%2051%20seater.jpeg",
  },
  {
    id: "bharat-benz", name: "Bharat Benz Coach", type: "Coaches", category: "PREMIUM",
    seating: "21 Seater and above Including Pilot", luggage: "Moderate to High — 1 bag per passenger approx.",
    image: "/Mann%20car%20pictures/Bharat%20benz.jpeg",
  },
  // Luxury
  {
    id: "volvo-luxury", name: "Volvo Coach (Luxury)", type: "Coaches", category: "LUXURY",
    seating: "41–45 Seater Including Pilot", luggage: "High — under-floor lockers + overhead bins",
    image: "/Mann%20car%20pictures/volvo%2039%2C%2043%20seater.jpeg",
  },
  {
    id: "volvo-washroom", name: "Volvo Coach with Washroom", type: "Coaches", category: "LUXURY",
    seating: "41–43 Seater Including Pilot", luggage: "High — washroom onboard; belly storage unaffected",
    image: "/Mann%20car%20pictures/volvo%2039%2C%2043%20seater.jpeg",
  },
  // Super Luxury
  {
    id: "jet-on-wheels", name: '"Jet on Wheels" (Volvo 13.5m)', type: "Coaches", category: "SUPER LUXURY",
    seating: "21 Full Recliners Including Pilot", luggage: "Maximum — 13.5m wheelbase, largest under-floor storage",
    image: "/Mann%20car%20pictures/Volvo%20jet%20on%20wheels.jpeg",
  },

  /* ── SELF DRIVING ────────────────────────────────────────── */
  {
    id: "sd-dzire", name: "Maruti Suzuki Dzire (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "382 Litres",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80",
  },
  {
    id: "sd-city", name: "Honda City (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "506 Litres",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=700&q=80",
  },
  {
    id: "sd-creta", name: "Hyundai Creta (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "433 Litres",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&q=80",
  },
  {
    id: "sd-crysta-7", name: "Toyota Innova Crysta (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "7 Seater Excluding Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "sd-crysta-8", name: "Toyota Innova Crysta (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "8 Seater Excluding Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "sd-camry", name: "Toyota Camry Hybrid (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "524 Litres",
    image: "/Mann%20car%20pictures/Camry.png",
  },
  {
    id: "sd-fortuner", name: "Toyota Fortuner (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "7 Seater Excluding Pilot", luggage: "296L (all rows) / 716L (3rd row folded)",
    image: "/Mann%20car%20pictures/Fortuner.png",
  },

  /* ── LONG TERM LEASING ───────────────────────────────────── */
  {
    id: "lt-dzire", name: "Maruti Suzuki Dzire (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "5 Seater Including Pilot", luggage: "382 Litres",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=700&q=80",
  },
  {
    id: "lt-hycross-7", name: "Toyota Innova Hycross (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "300L / 991L (3rd row folded)",
    image: "/Mann%20car%20pictures/HYCROSS.png",
  },
  {
    id: "lt-hycross-8", name: "Toyota Innova Hycross (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "8 Seater Including Pilot", luggage: "300L / 991L (3rd row folded)",
    image: "/Mann%20car%20pictures/HYCROSS.png",
  },
  {
    id: "lt-crysta-7", name: "Toyota Innova Crysta (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "300L / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "lt-crysta-8", name: "Toyota Innova Crysta (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "8 Seater Including Pilot", luggage: "300L / 758L (3rd row folded)",
    image: "/Mann%20car%20pictures/CRYSTA.png",
  },
  {
    id: "lt-e-class", name: "Mercedes-Benz E-Class (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "5 Seater Including Pilot", luggage: "540 Litres",
    image: "/Mann%20car%20pictures/E%20class2026-04-12%20at%201.40.11%20PM.png",
  },
  {
    id: "lt-s-class", name: "Mercedes-Benz S-Class (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "4–5 Seater Including Pilot", luggage: "550 Litres",
    image: "/Mann%20car%20pictures/S%20class.png",
  },
  {
    id: "lt-gls", name: "Mercedes-Benz GLS 400 (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "355L / 890L (3rd row folded)",
    image: "/Mann%20car%20pictures/GLS.png",
  },
];

/* ─────────────────────────────────────────────────────────────
   CATEGORY STYLING
───────────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<Category, { color: string; bg: string; border: string }> = {
  "ECONOMY":           { color: "#4ade80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.30)" },
  "PREMIUM":           { color: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.30)" },
  "LUXURY":            { color: "#f59e0b", bg: "rgba(245,158,11,0.12)",  border: "rgba(245,158,11,0.30)"  },
  "SUPER LUXURY":      { color: "#e879f9", bg: "rgba(232,121,249,0.12)", border: "rgba(232,121,249,0.30)" },
  "SELF DRIVING":      { color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.30)" },
  "LONG TERM LEASING": { color: "#fb923c", bg: "rgba(251,146,60,0.12)",  border: "rgba(251,146,60,0.30)" },
};

/* ─────────────────────────────────────────────────────────────
   ICONS
───────────────────────────────────────────────────────────── */
function IconUsers({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function IconBriefcase({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function IconX({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconArrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" /><path d="M7 7h10v10" />
    </svg>
  );
}

function IconCheck({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────
   VEHICLE MODAL
───────────────────────────────────────────────────────────── */
function VehicleModal({ vehicle, onClose }: { vehicle: Vehicle; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Animate in
  useEffect(() => {
    if (!mounted) return;
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;
    gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(panel,
      { opacity: 0, scale: 0.92, y: 28 },
      { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.4)" }
    );
  }, [mounted]);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  });

  function handleClose() {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }
    gsap.to(panel, { opacity: 0, scale: 0.93, y: 16, duration: 0.22, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.28, ease: "power2.in", onComplete: onClose });
  }

  const cfg = CATEGORY_CONFIG[vehicle.category];

  if (!mounted) return null;
  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.62)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        ref={panelRef}
        className="glass-panel"
        style={{
          width: "100%", maxWidth: 520,
          borderRadius: "1.5rem",
          overflow: "hidden",
          position: "relative",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="btn-disc"
          style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 10, width: 36, height: 36 }}
          aria-label="Close"
        >
          <IconX size={16} />
        </button>

        {/* Car image */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            style={{ objectFit: "cover" }}
            sizes="520px"
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }} />
          {/* Category badge overlaid on image */}
          <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem" }}>
            <span style={{
              display: "inline-block",
              padding: "0.22rem 0.85rem",
              borderRadius: 9999,
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: cfg.color,
              background: cfg.bg,
              border: `1px solid ${cfg.border}`,
              backdropFilter: "blur(8px)",
            }}>
              {vehicle.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "1.5rem 1.5rem 1.75rem" }}>
          {/* Vehicle type pill */}
          <span className="glass-badge font-sans" style={{ marginBottom: "0.75rem", display: "inline-block" }}>
            {vehicle.type}
          </span>

          {/* Name */}
          <h2 className="font-serif text-emboss" style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.1,
            letterSpacing: "0.01em",
            margin: "0 0 1.25rem",
          }}>
            {vehicle.name}
          </h2>

          {/* Stats */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}>
            {[
              { icon: <IconUsers size={16} />, label: "Seating", value: vehicle.seating },
              { icon: <IconBriefcase size={16} />, label: "Luggage", value: vehicle.luggage },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{
                padding: "0.9rem 1rem",
                borderRadius: "0.85rem",
                background: "var(--glass-ultra)",
                border: "1px solid var(--border-subtle)",
                backdropFilter: "blur(12px)",
              }}>
                <div style={{ color: "var(--text-50)", marginBottom: "0.4rem", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                  {icon}
                  <span className="font-sans" style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {label}
                  </span>
                </div>
                <p className="font-sans" style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-primary)", margin: 0 }}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Features row */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.5rem" }}>
            {["Chauffeur-driven", "Professionally maintained", "24/7 Support"].map((f) => (
              <span key={f} className="font-sans" style={{
                display: "flex", alignItems: "center", gap: "0.3rem",
                padding: "0.25rem 0.7rem",
                borderRadius: 9999,
                fontSize: "0.65rem", fontWeight: 600,
                color: "#4ade80",
                background: "rgba(74,222,128,0.10)",
                border: "1px solid rgba(74,222,128,0.25)",
              }}>
                <IconCheck size={11} /> {f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button className="btn-primary font-sans" style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem" }}>
            Book This Vehicle
            <IconArrow size={13} />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ─────────────────────────────────────────────────────────────
   VEHICLE CARD
───────────────────────────────────────────────────────────── */
function VehicleCard({ vehicle, onSelect }: { vehicle: Vehicle; onSelect: (v: Vehicle) => void }) {
  const cfg = CATEGORY_CONFIG[vehicle.category];

  return (
    <div
      className="glass-card vehicle-card"
      style={{ borderRadius: "1.2rem", overflow: "hidden", cursor: "pointer" }}
      onClick={() => onSelect(vehicle)}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          fill
          style={{ objectFit: "cover", transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="card-image"
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.42) 100%)",
          pointerEvents: "none",
        }} />
        {/* Category badge */}
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
          <span style={{
            display: "inline-block",
            padding: "0.18rem 0.65rem",
            borderRadius: 9999,
            fontSize: "0.58rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
            backdropFilter: "blur(8px)",
          }}>
            {vehicle.category}
          </span>
        </div>
      </div>

      {/* Body */}
      <div style={{
        padding: "0.9rem 1rem 1rem",
        background: "var(--glass-surface-86)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
      }}>
        <p className="font-sans" style={{
          fontSize: "0.875rem", fontWeight: 600,
          color: "var(--text-primary)",
          margin: "0 0 0.5rem",
          letterSpacing: "-0.01em",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {vehicle.name}
        </p>

        {/* Quick specs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "0.8rem" }}>
          {[
            { icon: <IconUsers size={11} />, val: vehicle.seating },
            { icon: <IconBriefcase size={11} />, val: vehicle.luggage.split(" / ")[0] },
          ].map(({ icon, val }) => (
            <span key={val} className="font-sans" style={{
              display: "flex", alignItems: "center", gap: "0.28rem",
              fontSize: "0.68rem", color: "var(--text-50)",
            }}>
              {icon} {val}
            </span>
          ))}
        </div>

        <button
          className="btn-ghost font-sans"
          style={{ fontSize: "0.68rem", padding: "0.42rem 0.9rem", width: "100%", justifyContent: "center" }}
          onClick={(e) => { e.stopPropagation(); onSelect(vehicle); }}
        >
          View Details
          <IconArrow size={11} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   CATEGORY SECTION
───────────────────────────────────────────────────────────── */
function CategorySection({ category, vehicles }: { category: Category; vehicles: Vehicle[] }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const cfg = CATEGORY_CONFIG[category];

  useEffect(() => {
    const header = headerRef.current;
    const grid = gridRef.current;
    if (!header || !grid) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: "top 88%",
        once: true,
      },
    });

    tl.fromTo(header, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(
        grid.querySelectorAll(".vehicle-card"),
        { opacity: 0, y: 32, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" },
        "-=0.3"
      );

    return () => { tl.kill(); };
  }, []);

  return (
    <>
      {selected && <VehicleModal vehicle={selected} onClose={() => setSelected(null)} />}

      <div ref={headerRef} style={{ marginBottom: "1.5rem", opacity: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.6rem" }}>
          <div style={{ height: 1, width: 32, background: cfg.color, opacity: 0.5 }} />
          <span style={{
            display: "inline-block",
            padding: "0.18rem 0.78rem",
            borderRadius: 9999,
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
          }}>
            {category}
          </span>
          <span className="font-sans" style={{ fontSize: "0.68rem", color: "var(--text-40)", fontWeight: 500 }}>
            {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}
          </span>
        </div>
      </div>

      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: "1.1rem",
          marginBottom: "3rem",
        }}
      >
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} onSelect={setSelected} />
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   TYPE SECTION (all categories for one vehicle type)
───────────────────────────────────────────────────────────── */
function TypeSection({ vehicleType }: { vehicleType: VehicleType }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" });
  }, [vehicleType]);

  const byCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    vehicles: VEHICLES.filter((v) => v.type === vehicleType && v.category === cat),
  })).filter(({ vehicles }) => vehicles.length > 0);

  const total = VEHICLES.filter((v) => v.type === vehicleType).length;

  return (
    <div
      ref={sectionRef}
      style={{
        padding: "3rem clamp(1.25rem, 5vw, 4rem) 2rem",
        minHeight: "60vh",
        opacity: 0,
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
          <div className="rule-glass" style={{ width: 40 }} />
          <span className="glass-badge font-sans">{total} vehicles</span>
        </div>
        <h2
          className="font-serif uppercase text-emboss"
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
            fontWeight: 400,
            color: "var(--text-primary)",
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          {vehicleType}
        </h2>
      </div>

      <div style={{ height: 1, background: "var(--border-mid)", marginBottom: "2.5rem" }} />

      {byCategory.map(({ cat, vehicles }) => (
        <CategorySection key={cat} category={cat} vehicles={vehicles} />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   TAB BAR
───────────────────────────────────────────────────────────── */
function TabBar({
  active,
  onChange,
}: {
  active: VehicleType;
  onChange: (t: VehicleType) => void;
}) {
  const counts = VEHICLE_TYPES.map((t) => ({
    type: t,
    count: VEHICLES.filter((v) => v.type === t).length,
  }));

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 80,
        background: "var(--glass-nav-bg)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid var(--border-mid)",
        boxShadow: "0 2px 16px rgba(60,40,20,0.10)",
      }}
    >
      <div style={{
        padding: "0.65rem clamp(1.25rem, 5vw, 4rem)",
        display: "flex",
        gap: "0.45rem",
        overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {counts.map(({ type, count }) => {
          const isActive = type === active;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              className={isActive ? "btn-primary font-sans" : "btn-ghost font-sans"}
              style={{
                fontSize: "0.72rem",
                padding: "0.48rem 1.1rem",
                flexShrink: 0,
                gap: "0.5rem",
              }}
            >
              {type}
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 18, height: 18,
                borderRadius: "50%",
                fontSize: "0.6rem",
                fontWeight: 700,
                background: isActive ? "rgba(255,255,255,0.25)" : "var(--glass-mid)",
                color: isActive ? "#fff" : "var(--text-50)",
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLEET HERO
───────────────────────────────────────────────────────────── */
function FleetHero() {
  const badgesRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Fade the video in smoothly once it can play
    const video = videoRef.current;
    if (video) {
      video.style.opacity = "0";
      const onReady = () => gsap.to(video, { opacity: 1, duration: 1.2, ease: "power2.out" });
      video.addEventListener("canplaythrough", onReady, { once: true });
      // Fallback: if already ready
      if (video.readyState >= 3) onReady();
    }

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(badgesRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" })
      .fromTo(titleRef.current, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" }, "-=0.25")
      .fromTo(subtitleRef.current, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "-=0.35")
      .fromTo(trustRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, "-=0.25");
    return () => { tl.kill(); };
  }, []);

  return (
    <div style={{
      position: "relative",
      overflow: "hidden",
      minHeight: "80vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderBottom: "1px solid var(--border-mid)",
    }}>
      {/* Background video */}
      <video
        ref={videoRef}
        src="/5264613_Vehicle_Transport_1280x720.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0,
        }}
      />

      {/* Dark scrim + warm tint overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(10,6,2,0.68) 60%, rgba(0,0,0,0.80) 100%)",
        pointerEvents: "none",
      }} />

      {/* Content — sits above video */}
      <div style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        padding: "7rem clamp(1.25rem, 5vw, 4rem) 5.5rem",
        textAlign: "center",
      }}>
        {/* Badges */}
        <div ref={badgesRef} style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "0.75rem", marginBottom: "1.75rem", flexWrap: "wrap", opacity: 0,
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            padding: "0.3rem 0.9rem 0.3rem 0.5rem",
            borderRadius: 9999,
            background: "rgba(255,252,245,0.14)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
          }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <Image src="/IATA.jpg" alt="IATA" width={28} height={28} style={{ objectFit: "cover" }} />
            </div>
            <span className="font-sans uppercase" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff" }}>
              IATA Approved
            </span>
          </div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.45rem",
            padding: "0.3rem 0.9rem",
            borderRadius: 9999,
            background: "rgba(255,252,245,0.14)",
            backdropFilter: "blur(20px) saturate(140%)",
            WebkitBackdropFilter: "blur(20px) saturate(140%)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 0 3px rgba(74,222,128,0.30)", flexShrink: 0 }} />
            <span className="font-sans uppercase" style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.12em", color: "#fff" }}>
              200+ Vehicles Available
            </span>
          </div>
        </div>

        {/* Headline */}
        <h1
          ref={titleRef}
          className="font-serif uppercase"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 400,
            lineHeight: 1.0,
            letterSpacing: "0.02em",
            color: "#ffffff",
            textShadow: "0 2px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08)",
            margin: "0 auto 1.25rem",
            opacity: 0,
          }}
        >
          Our Fleet
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-sans"
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "rgba(255,255,255,0.70)",
            maxWidth: 560,
            lineHeight: 1.75,
            margin: "0 auto 2.5rem",
            opacity: 0,
          }}
        >
          From IATA-certified luxury transfers to 21-seater Jet-on-Wheels coaches —
          every vehicle is professionally maintained and chauffeur-ready.
        </p>

        {/* Trust row */}
        <div
          ref={trustRef}
          style={{
            display: "flex", flexWrap: "wrap", gap: "0.6rem 2rem",
            justifyContent: "center",
            opacity: 0,
          }}
        >
          {["IATA Accredited", "Chauffeur-driven", "24/7 Support", "Corporate & VIP Ready"].map((item) => (
            <span key={item} className="font-sans" style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontSize: "0.72rem", fontWeight: 600,
              color: "rgba(255,255,255,0.65)", letterSpacing: "0.06em", textTransform: "uppercase",
            }}>
              <span style={{ color: "#4ade80" }}><IconCheck size={12} /></span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────── */
export default function FleetPage() {
  const [activeType, setActiveType] = useState<VehicleType>("Sedans");

  return (
    <>
      <style>{`
        .vehicle-card:hover .card-image {
          transform: scale(1.06);
        }
        .vehicle-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1),
                      box-shadow 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .vehicle-card:hover {
          transform: translateY(-4px) scale(1.01);
        }
      `}</style>

      <main style={{ background: "var(--bg-base)", minHeight: "100vh" }}>
        <Navbar />
        <FleetHero />
        <TabBar active={activeType} onChange={setActiveType} />
        <TypeSection key={activeType} vehicleType={activeType} />
        <div style={{ height: 1, background: "var(--border-mid)", margin: "1rem 0 0" }} />
        <Footer />
      </main>
    </>
  );
}
