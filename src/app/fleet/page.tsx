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
type Category = "ECONOMY" | "ECONOMY PLUS" | "PREMIUM" | "PREMIUM PLUS" | "LUXURY" | "SUPER LUXURY" | "ROLLS ROYCE" | "RANGE ROVER" | "SELF DRIVING" | "LONG TERM LEASING";
type VehicleType = "Sedans" | "SUVs" | "Vanity van" | "Coaches" | "Self Driving" | "Long Term Leasing";

const CATEGORY_ORDER: Category[] = ["ECONOMY", "ECONOMY PLUS", "PREMIUM", "PREMIUM PLUS", "LUXURY", "SUPER LUXURY", "ROLLS ROYCE", "RANGE ROVER", "SELF DRIVING", "LONG TERM LEASING"];
const VEHICLE_TYPES: VehicleType[] = ["Sedans", "SUVs", "Vanity van", "Coaches", "Self Driving", "Long Term Leasing"];

interface Vehicle {
  id: string;
  name: string;
  image: string | string[];
  seating: string;
  luggage: string;
  category: Category;
  type: VehicleType;
  imageObjectFit?: "cover" | "contain";
  imageObjectPosition?: string;
  imageIndexObjectPositions?: (string | undefined)[];
}

/* ─────────────────────────────────────────────────────────────
   VEHICLE DATA
───────────────────────────────────────────────────────────── */
const VEHICLES: Vehicle[] = [
  /* ── SEDANS ─────────────────────────────────────────────── */
  // Economy

  {
    id: "hyundai-aura", name: "Hyundai Aura", type: "Sedans", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "402 Litres",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Aura%20white/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_37_33%20PM.png", "/Mann car pictures/Aura%20white/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_37_57%20PM.png", "/Mann car pictures/Aura%20white/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_37_39%20PM.png", "/Mann car pictures/Aura%20white/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_37_50%20PM.png", "/Mann%20car%20pictures/Hyundai%20Aura/ChatGPT%20Image%20May%208%2C%202026%2C%2011_31_16%20AM.png", "/Mann%20car%20pictures/Hyundai%20Aura/ChatGPT%20Image%20May%208%2C%202026%2C%2011_31_20%20AM.png", "/Mann%20car%20pictures/Hyundai%20Aura/ChatGPT%20Image%20May%208%2C%202026%2C%2011_31_11%20AM.png"],
  },

  // Economy Plus
  {
    id: "honda-city", name: "Honda City", type: "Sedans", category: "ECONOMY PLUS",
    seating: "5 Seater Including Pilot", luggage: "506 Litres",
    image: ["/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_24_20%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_26_03%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_27_55%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_28_55%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_29_57%20PM.png"],
  },

  // Premium
  {
    id: "camry-hybrid", name: "Toyota Camry Hybrid", type: "Sedans", category: "PREMIUM",
    seating: "5 Seater Including Pilot", luggage: "524 Litres",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Toyota%20camry%20hybrid/toyota%20camry%20hybrid%20front.jpeg", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_50_45%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_54_11%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_57_29%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2008_02_08%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2008_03_19%20PM.png", "/Mann car pictures/Toyota camry hybrid/WhatsApp Image 2026-05-10 at 13.55.06.jpeg"],
  },
  // Premium Plus
  {
    id: "invicto-sedan", name: "Maruti Suzuki Invicto", type: "Sedans", category: "PREMIUM PLUS",
    seating: "7–8 Seater Including Pilot", luggage: "690 Litres",
    image: ["/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_33_03%20PM%20(2).png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_28_37%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_25_56%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_43_30%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_35%20AM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_38%20AM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_41%20AM.png"],
  },
  {
    id: "hycross-sedan", name: "Toyota Innova Hycross", type: "Sedans", category: "PREMIUM PLUS",
    seating: "7–8 Seater Including Pilot", luggage: "690–991 Litres",
    imageObjectPosition: "center 80%",
    image: ["/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_51_24%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_09_48%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_05_09%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_53_47%20AM.png"],
  },
  // Luxury
  {
    id: "mercedes-e-class", name: "Mercedes-Benz E-Class", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "540 Litres",
    imageObjectPosition: "center 80%",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_32_23%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_32_56%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_31_52%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_36_12%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_39_28%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_41_21%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_41_47%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_42_37%20PM.png"],
  },

  {
    id: "bmw-5-series", name: "BMW 5 Series", type: "Sedans", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "500 Litres",
    imageObjectFit: "cover",
    image: ["/Mann%20car%20pictures/BMW%205%20Series/BMW%205%20series%20front.jpeg", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_52_22%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_49_04%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_46_45%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_48_21%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2002_48_20%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2002_56_01%20PM.png", "/Mann%20car%20pictures/BMW%205%20Series/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_39_45%20AM.png"],
  },
  // Super Luxury
  {
    id: "mercedes-s-class", name: "Mercedes-Benz S-Class", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "550 Litres",
    imageObjectFit: "cover",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_07_15%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_10_31%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_09_09%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_10_15%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_11_02%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_11_23%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_12_17%20PM.png"],
  },
  {
    id: "bmw-7-series", name: "BMW 7 Series", type: "Sedans", category: "SUPER LUXURY",
    seating: "4–5 Seater Including Pilot", luggage: "540 Litres",
    image: ["/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_35_37%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_38_59%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_41_11%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_33_02%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_43_29%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_44_07%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_46_17%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_48_57%20PM.png", "/Mann%20car%20pictures/BMW%207%20Series/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2007_26_12%20PM.png"],
  },

  // Rolls Royce
  {
    id: "rolls-ghost", name: "Rolls-Royce Ghost", type: "Sedans", category: "ROLLS ROYCE",
    seating: "5 Seater Including Pilot", luggage: "507 Litres",
    image: ["/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_10_24%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2012_55_48%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2012_53_40%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_01_06%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_03_33%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_14_32%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_16_21%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_19_33%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_20_48%20PM.png", "/Mann%20car%20pictures/Rolls%20royce/ChatGPT%20Image%20May%201%2C%202026%2C%2001_22_23%20PM.png"],
  },

  /* ── SUVs ────────────────────────────────────────────────── */
  // Economy
  {
    id: "ertiga", name: "Maruti Suzuki Ertiga", type: "SUVs", category: "ECONOMY",
    seating: "7 Seater Including Pilot", luggage: "209L (all rows) / 550L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%204%2C%202026%2C%2009_51_52%20AM.png", "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_33_07%20PM.png", "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_37_10%20PM.png", "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_51_20%20PM.png", "/Mann%20car%20pictures/Ertiga/ChatGPT%20Image%20May%205%2C%202026%2C%2001_56_20%20PM.png"],
  },
  {
    id: "kia-carens", name: "Kia Carens", type: "SUVs", category: "ECONOMY",
    seating: "7 Seater Including Pilot", luggage: "216L (all rows) / 645L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_23%20PM.png", "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_23_09%20PM.png", "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_33%20PM.png", "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_28_55%20PM.png", "/Mann%20car%20pictures/Kia%20Carens/ChatGPT%20Image%20May%205%2C%202026%2C%2009_30_43%20PM.png"],
  },
  {
    id: "toyota-hyryder", name: "Toyota Urban Cruiser Hyryder", type: "SUVs", category: "ECONOMY",
    seating: "5 Seater Including Pilot", luggage: "378 Litres",
    image: ["/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_56_17%20PM.png", "/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_56_07%20PM.png", "/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_56_01%20PM.png", "/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_55_31%20PM.png", "/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_55_44%20PM.png", "/Mann car pictures/Toyota%20hyryder/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_55_54%20PM.png"],
  },
  // Economy Plus
  {
    id: "crysta", name: "Toyota Innova Crysta", type: "SUVs", category: "ECONOMY PLUS",
    seating: "7–8 Seater Including Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_58_07%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_19%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_23%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_36%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_28%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_41%20AM.png"],
  },
  // Premium
  {
    id: "invicto-suv", name: "Maruti Suzuki Invicto", type: "SUVs", category: "PREMIUM",
    seating: "7–8 Seater Including Pilot", luggage: "239 Litres (all rows up)",
    image: ["/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_33_03%20PM%20(2).png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_25_56%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_28_37%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2006_43_30%20PM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_35%20AM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_38%20AM.png", "/Mann car pictures/Invicto/ChatGPT%20Image%20May%208%2C%202026%2C%2011_42_41%20AM.png"],
  },
  {
    id: "hycross-suv", name: "Toyota Innova Hycross (Hybrid)", type: "SUVs", category: "PREMIUM",
    seating: "7–8 Seater Including Pilot", luggage: "300L (all rows) / 991L (3rd row folded)",
    imageObjectPosition: "center 80%",
    image: ["/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_51_24%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_05_09%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_09_48%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_53_47%20AM.png"],
  },
  // Premium Plus
  {
    id: "fortuner", name: "Toyota Fortuner", type: "SUVs", category: "PREMIUM PLUS",
    seating: "7 Seater Including Pilot", luggage: "296 Litres (all rows up)",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Toyota fortuner/Toyota fortuner front.jpeg", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2001_03_01%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_47%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_20%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_51%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_29%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_35_18%20PM.png"],
  },
  {
    id: "ford-endeavour", name: "Ford Endeavour", type: "SUVs", category: "PREMIUM PLUS",
    seating: "7 Seater Including Pilot", luggage: "259–296 Litres (all rows up)",
    image: ["/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_28%20PM.png", "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_33%20PM.png", "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_50%20PM.png", "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_47_55%20PM.png", "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_48_01%20PM.png", "/Mann%20car%20pictures/Ford%20endeavor/ChatGPT%20Image%20May%206%2C%202026%2C%2002_53_49%20PM.png"],
  },
  // Luxury
  {
    id: "audi-q7", name: "Audi Q7", type: "SUVs", category: "LUXURY",
    seating: "7 Seater Including Pilot", luggage: "295L (all rows) / 770L (3rd row folded)",
    imageObjectPosition: "center 80%",
    image: ["/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_40_26%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_42_43%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_38_55%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_41_50%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_45_24%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_45_30%20AM.png", "/Mann car pictures/Audi%20Q7%20copy/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2007_31_08%20PM.png"],
  },
  {
    id: "bmw-x5", name: "BMW X5", type: "SUVs", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "650 Litres",
    image: ["/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_10%20PM.png", "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_14%20PM.png", "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_17%20PM.png", "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_21%20PM.png", "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_26%20PM.png", "/Mann%20car%20pictures/BMW%20X5/ChatGPT%20Image%20May%206%2C%202026%2C%2003_03_32%20PM.png"],
  },
  {
    id: "volvo-xc90", name: "Volvo XC90", type: "SUVs", category: "LUXURY",
    seating: "7 Seater Including Pilot", luggage: "302L (all rows) / 680L (3rd row folded)",
    image: ["/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_06%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_02%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_10%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_18%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_22%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_26%20PM.png", "/Mann%20car%20pictures/volvo%20xc90/ChatGPT%20Image%20May%206%2C%202026%2C%2003_34_31%20PM.png"],
  },
  {
    id: "mercedes-gle", name: "Mercedes-Benz GLE", type: "SUVs", category: "LUXURY",
    seating: "5 Seater Including Pilot", luggage: "570 Litres",
    image: ["/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_27%20PM.png", "/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_31%20PM.png", "/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_34%20PM.png", "/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_39%20PM.png", "/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_42%20PM.png", "/Mann%20car%20pictures/GLE/ChatGPT%20Image%20May%2013%2C%202026%2C%2005_46_45%20PM.png"],
  },
  {
    id: "kia-carnival-limousine", name: "Kia Carnival Limousine", type: "SUVs", category: "LUXURY",
    seating: "7 Seater Including Pilot", luggage: "627 Litres",
    imageObjectFit: "cover",
    image: [
      "/Mann car pictures/Kia Carnival Limousine/Kia carnival front.jpeg",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_08_59 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_03 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_10 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_23 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_32 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_36 AM.png",
      "/Mann car pictures/Kia Carnival Limousine/ChatGPT Image May 8, 2026, 11_09_40 AM.png",
    ],
  },
  // Super Luxury
  {
    id: "gls-450", name: "Mercedes-Benz GLS 400 / 450", type: "SUVs", category: "SUPER LUXURY",
    seating: "7 Seater Including Pilot", luggage: "355L (all rows) / 890L (3rd row folded)",
    image: ["/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_52%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_43%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_47%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_38%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_31%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_21%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_57_18%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_17%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_27%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_35%20AM.png"],
  },
  {
    id: "bmw-x7", name: "BMW X7", type: "SUVs", category: "SUPER LUXURY",
    seating: "7 Seater Including Pilot", luggage: "326 Litres (all rows up)",
    image: ["/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_57_55%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_59_28%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2007_01_42%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_23_47%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_24_44%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_26_21%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_29_34%20PM.png", "/Mann car pictures/BMW%20X7/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2008_34_27%20PM.png"],
  },
  // Range Rover
  {
    id: "range-rover", name: "Range Rover (Vogue / Autobiography / LWB)", type: "SUVs", category: "RANGE ROVER",
    seating: "5 Seater Including Pilot", luggage: "725–900 Litres",
    image: ["/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_59%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_23%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_44%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_48%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_52%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_56%20PM.png"],
  },
  {
    id: "range-rover-sport", name: "Range Rover Sport", type: "SUVs", category: "RANGE ROVER",
    seating: "5 Seater Including Pilot", luggage: "647 Litres",
    image: ["/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_59%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_23%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_44%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_48%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_52%20PM.png", "/Mann%20car%20pictures/range%20rover%20sport/ChatGPT%20Image%20May%206%2C%202026%2C%2003_38_56%20PM.png"],
  },

  /* ── Vanity van ────────────────────────────────────────── */
  // Economy
  {
    id: "tempo-traveller", name: "Tempo Traveller", type: "Vanity van", category: "ECONOMY",
    seating: "9 / 12 / 16 Seater Including Pilot", luggage: "Limited rear boot + Roof Carrier for bulk",
    imageObjectFit: "cover",
    image: ["/Mann%20car%20pictures/Tempo%20traveller/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_13%20PM.png", "/Mann%20car%20pictures/Tempo%20traveller/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_08%20PM.png", "/Mann%20car%20pictures/Tempo%20traveller/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_17_48%20PM.png", "/Mann%20car%20pictures/Tempo%20traveller/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_17_56%20PM.png", "/Mann%20car%20pictures/Tempo%20traveller/ChatGPT%20Image%20May%2015%2C%202026%2C%2011_18_00%20PM.png"],
  },
  // Premium
  {
    id: "urbania-mod", name: "Force Urbania (Modified)", type: "Vanity van", category: "PREMIUM",
    seating: "9 / 12 Seater Including Pilot", luggage: "Very limited boot; last row removable for bags",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_24_25%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_18_13%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_22_35%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_28_40%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_29_12%20AM.png"],
  },
  {
    id: "urbania-std", name: "Force Urbania", type: "Vanity van", category: "PREMIUM",
    seating: "13 / 17 Seater Including Pilot", luggage: "Dedicated compartment — fits 8–12 medium suitcases",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_24_25%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_18_13%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_22_35%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_28_40%20AM.png", "/Mann car pictures/Force%20Urbania/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_29_12%20AM.png"],
  },
  // Premium Plus
  {
    id: "toyota-coaster", name: "Toyota Coaster", type: "Vanity van", category: "PREMIUM PLUS",
    seating: "18 Seater Including Pilot", luggage: "410 Litres",
    image: ["/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_38_53%20PM.png", "/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_38_46%20PM.png", "/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_38_05%20PM.png", "/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_38_40%20PM.png", "/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_38_26%20PM.png", "/Mann%20car%20pictures/Toyota%20Coaster%20New%20Generation/ChatGPT%20Image%20May%204%2C%202026%2C%2012_41_07%20PM.png"],
  },
  {
    id: "toyota-hiace", name: "Toyota Hiace", type: "Vanity van", category: "PREMIUM PLUS",
    seating: "9 Seater Including Pilot", luggage: "Fits 10–12 large check-in suitcases",
    imageObjectFit: "cover",
    image: ["/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_27_07%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_28_04%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_27_03%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_33_44%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_28_09%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_27_57%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_28_13%20PM.png", "/Mann%20car%20pictures/Toyota%20Hiace%20Luxury%20edition%207%20seater/ChatGPT%20Image%20May%204%2C%202026%2C%2001_27_12%20PM.png"],
  },
  // Luxury
  {
    id: "sprinter", name: "Mercedes-Benz Sprinter", type: "Vanity van", category: "LUXURY",
    seating: "11 / 14 Seater Including Pilot", luggage: "Fits 8–10 large suitcases comfortably",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20Sprinter%2012%20seater/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_30_46%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter%2012%20seater/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_55_17%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter%2012%20seater/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_03_01%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter%2012%20seater/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_03_31%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter%2012%20seater/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_10_11%20AM.png"],
  },
  {
    id: "sprinter-exec", name: "Mercedes-Benz Sprinter Executive Lounge", type: "Vanity van", category: "LUXURY",
    seating: "7–9 Seater Including Pilot", luggage: "Fits 10–15 large suitcases",
    imageObjectPosition: "center 80%",
    image: ["/Mann car pictures/merecedes%20benz%20sprinter%209%20seater%202/ChatGPT%20Image%20May%2017%2C%202026%2C%2005_56_57%20PM.png", "/Mann car pictures/merecedes%20benz%20sprinter%209%20seater%202/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_03_37%20PM.png", "/Mann car pictures/merecedes%20benz%20sprinter%209%20seater%202/ChatGPT%20Image%20May%2017%2C%202026%2C%2005_56_43%20PM.png", "/Mann car pictures/merecedes%20benz%20sprinter%209%20seater%202/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_03_15%20PM.png", "/Mann car pictures/merecedes%20benz%20sprinter%209%20seater%202/ChatGPT%20Image%20May%2017%2C%202026%2C%2006_03_25%20PM.png"],
  },
  {
    id: "v-class", name: "Mercedes-Benz V-Class", type: "Vanity van", category: "LUXURY",
    seating: "6 / 7 Seater Including Pilot", luggage: "610 Litres",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_50_34%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_59_46%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_00_35%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_04_00%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2001_04_27%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_53_49%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20V-Class/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_54_56%20AM.png"],
  },
  // Super Luxury
  {
    id: "sprinter-washroom", name: "Mercedes Sprinter with Washroom", type: "Vanity van", category: "SUPER LUXURY",
    seating: "8 Seater Including Pilot", luggage: "Dedicated luggage partition + overhead cabinets",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20Sprinter/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_24_42%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter/WhatsApp%20Image%202026-04-25%20at%2015.59.01.jpeg", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_27_41%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter/ChatGPT%20Image%20Apr%2026%2C%202026%2C%2012_31_19%20AM.png", "/Mann%20car%20pictures/Mercedes-Benz%20Sprinter/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_47_18%20PM.png"],
  },


  {
    id: "vellfire", name: "Toyota Vellfire", type: "Vanity van", category: "LUXURY",
    seating: "4-6 Seater Including Pilot", luggage: "Premium Luggage Space",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_41_13%20PM.png", "/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_39_48%20PM.png", "/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_43_16%20PM%20(1).png", "/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_44_53%20PM.png", "/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_46_22%20PM.png", "/Mann car pictures/Vellfire/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_48_16%20PM.png"],
  },

  /* ── COACHES ─────────────────────────────────────────────── */
  // Luxury
  {
    id: "volvo-luxury", name: "Volvo Coach (Luxury)", type: "Coaches", category: "LUXURY",
    seating: "41/45 Seater (12m) and 49/53 Seater (13.5m) Including Pilot", luggage: "Fits 35–40 and 50–55 large suitcases resp.",
    imageObjectFit: "contain",
    image: ["/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_29_00%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_50_51%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_35_35%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_38_30%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_55_20%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2004_16_06%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2004_45_09%20PM.png", "/Mann car pictures/Volvo%2039%20seater/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2004_59_59%20PM.png"],
  },
  {
    id: "volvo-washroom", name: "Volvo Coach with Washroom", type: "Coaches", category: "LUXURY",
    seating: "41 / 45 Seater Including Pilot", luggage: "Fits 40–50 large suitcases",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_27_10%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_24_50%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_29_22%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_31_42%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_33_26%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_34_19%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_37_47%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_37_58%20PM.png", "/Mann car pictures/Volvo/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2010_43_10%20PM.png"],
  },
  // Super Luxury
  {
    id: "jet-on-wheels", name: '"Jet on Wheels" (Volvo 13.5m)', type: "Coaches", category: "SUPER LUXURY",
    seating: "23 Full Recliners Including Pilot", luggage: "Fits 40–50 large suitcases",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Jet on wheels/jet on wheels front.jpeg", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_00_26%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_13_32%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_16_03%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_17_48%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_19_14%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_21_13%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_23_04%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_24_34%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_25_33%20PM.png", "/Mann%20car%20pictures/Jet%20on%20wheels/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2003_26_51%20PM.png"],
  },

  /* ── SELF DRIVING ────────────────────────────────────────── */

  {
    id: "sd-city", name: "Honda City (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "506 Litres",
    image: ["/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_24_20%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_26_03%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_27_55%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_28_55%20PM.png", "/Mann car pictures/Honda%20City/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_29_57%20PM.png"],
  },
  {
    id: "sd-crysta-7", name: "Toyota Innova Crysta (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "7 Seater Excluding Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_58_07%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_19%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_23%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_36%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_28%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_41%20AM.png"],
  },
  {
    id: "sd-crysta-8", name: "Toyota Innova Crysta (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "8 Seater Excluding Pilot", luggage: "300L (all rows) / 758L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_58_07%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_19%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_23%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_36%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_28%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_41%20AM.png"],
  },
  {
    id: "sd-camry", name: "Toyota Camry Hybrid (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "5 Seater Excluding Pilot", luggage: "524 Litres",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Toyota%20camry%20hybrid/toyota%20camry%20hybrid%20front.jpeg", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_50_45%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_54_11%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2007_57_29%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2008_02_08%20PM.png", "/Mann car pictures/Toyota%20camry%20hybrid/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2008_03_19%20PM.png"],
  },
  {
    id: "sd-fortuner", name: "Toyota Fortuner (Self Drive)", type: "Self Driving", category: "SELF DRIVING",
    seating: "7 Seater Excluding Pilot", luggage: "296L (all rows) / 716L (3rd row folded)",
    imageObjectFit: "cover",
    image: ["/Mann car pictures/Toyota fortuner/Toyota fortuner front.jpeg", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2001_03_01%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_47%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_20%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_51%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_30_29%20PM.png", "/Mann%20car%20pictures/Toyota%20fortuner/ChatGPT%20Image%20May%204%2C%202026%2C%2012_35_18%20PM.png"],
  },

  /* ── LONG TERM LEASING ───────────────────────────────────── */

  {
    id: "lt-hycross-7", name: "Toyota Innova Hycross (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "300L / 991L (3rd row folded)",
    imageObjectPosition: "center 80%",
    image: ["/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_51_24%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_09_48%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_05_09%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_53_47%20AM.png"],
  },
  {
    id: "lt-hycross-8", name: "Toyota Innova Hycross (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "8 Seater Including Pilot", luggage: "300L / 991L (3rd row folded)",
    imageObjectPosition: "center 80%",
    image: ["/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_51_24%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_09_48%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2001_05_09%20AM.png", "/Mann%20car%20pictures/Toyota%20Innova%20Hycross/ChatGPT%20Image%20Apr%2030%2C%202026%2C%2012_53_47%20AM.png"],
  },
  {
    id: "lt-crysta-7", name: "Toyota Innova Crysta (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "300L / 758L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_58_07%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_19%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_23%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_36%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_28%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_41%20AM.png"],
  },
  {
    id: "lt-crysta-8", name: "Toyota Innova Crysta (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "8 Seater Including Pilot", luggage: "300L / 758L (3rd row folded)",
    image: ["/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_58_07%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_19%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_23%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_36%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_28%20AM.png", "/Mann%20car%20pictures/Innova%20Crysta/ChatGPT%20Image%20May%204%2C%202026%2C%2011_50_41%20AM.png"],
  },
  {
    id: "lt-e-class", name: "Mercedes-Benz E-Class (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "5 Seater Including Pilot", luggage: "540 Litres",
    imageObjectPosition: "center bottom",
    imageIndexObjectPositions: ["center 70%", undefined, "center 70%"],
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_32_23%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_32_56%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_31_52%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_36_12%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_39_28%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_41_21%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_41_47%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20E-Class/ChatGPT%20Image%20Apr%2028%2C%202026%2C%2006_42_37%20PM.png"],
  },
  {
    id: "lt-s-class", name: "Mercedes-Benz S-Class (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "4–5 Seater Including Pilot", luggage: "550 Litres",
    imageObjectFit: "cover",
    image: ["/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_07_15%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_09_09%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_10_15%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_10_31%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_11_02%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_11_23%20PM.png", "/Mann%20car%20pictures/Mercedes-Benz%20S-Class/ChatGPT%20Image%20Apr%2029%2C%202026%2C%2011_12_17%20PM.png"],
  },
  {
    id: "lt-gls", name: "Mercedes-Benz GLS 400 (Monthly Lease)", type: "Long Term Leasing", category: "LONG TERM LEASING",
    seating: "7 Seater Including Pilot", luggage: "355L / 890L (3rd row folded)",
    image: ["/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_52%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_43%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_47%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_38%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_31%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_21%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_57_18%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_17%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_27%20AM.png", "/Mann%20car%20pictures/GLS%20400/ChatGPT%20Image%20May%204%2C%202026%2C%2011_53_35%20AM.png"],
  },
];

/* ─────────────────────────────────────────────────────────────
   CATEGORY STYLING
───────────────────────────────────────────────────────────── */
const CATEGORY_CONFIG: Record<Category, { color: string; bg: string; border: string }> = {
  "ECONOMY": { color: "#4ade80", bg: "rgba(74,222,128,0.12)", border: "rgba(74,222,128,0.30)" },
  "ECONOMY PLUS": { color: "#2dd4bf", bg: "rgba(45,212,191,0.12)", border: "rgba(45,212,191,0.30)" },
  "PREMIUM": { color: "#60a5fa", bg: "rgba(96,165,250,0.12)", border: "rgba(96,165,250,0.30)" },
  "PREMIUM PLUS": { color: "#818cf8", bg: "rgba(129,140,248,0.12)", border: "rgba(129,140,248,0.30)" },
  "LUXURY": { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.30)" },
  "SUPER LUXURY": { color: "#e879f9", bg: "rgba(232,121,249,0.12)", border: "rgba(232,121,249,0.30)" },
  "ROLLS ROYCE": { color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.30)" },
  "RANGE ROVER": { color: "#a3e635", bg: "rgba(163,230,53,0.12)", border: "rgba(163,230,53,0.30)" },
  "SELF DRIVING": { color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.30)" },
  "LONG TERM LEASING": { color: "#fb923c", bg: "rgba(251,146,60,0.12)", border: "rgba(251,146,60,0.30)" },
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
   CAROUSEL
───────────────────────────────────────────────────────────── */
function ImageCarousel({ images, alt, externalHover, objectFit = "cover", objectPosition, indexObjectPositions }: { images: string[]; alt: string; externalHover?: boolean; objectFit?: "cover" | "contain"; objectPosition?: string; indexObjectPositions?: (string | undefined)[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalHover, setInternalHover] = useState(false);
  const isHovered = externalHover ?? internalHover;

  useEffect(() => {
    if (images.length <= 1 || !isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length, isHovered]);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
    >
      <Image
        src={images[currentIndex]}
        alt={`${alt} - Image ${currentIndex + 1}`}
        fill
        style={{ objectFit: objectFit, objectPosition: indexObjectPositions?.[currentIndex] ?? objectPosition, transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)" }}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
        className="card-image"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            style={{
              position: "absolute", left: "0.5rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%",
              width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10
            }}
          >
            &#10094;
          </button>
          <button
            onClick={nextSlide}
            style={{
              position: "absolute", right: "0.5rem", top: "50%", transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)", color: "white", border: "none", borderRadius: "50%",
              width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", zIndex: 10
            }}
          >
            &#10095;
          </button>
          <div style={{
            position: "absolute", bottom: "0.5rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: "4px", zIndex: 10
          }}>
            {images.map((_, i) => (
              <div key={i} style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: i === currentIndex ? "white" : "rgba(255,255,255,0.5)"
              }} />
            ))}
          </div>
        </>
      )}
    </div>
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
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/9", background: vehicle.imageObjectFit === "contain" ? "var(--bg-base)" : undefined }}>
          {Array.isArray(vehicle.image) ? (
            <ImageCarousel images={vehicle.image} alt={vehicle.name} objectFit={vehicle.imageObjectFit} objectPosition={vehicle.imageObjectPosition} indexObjectPositions={vehicle.imageIndexObjectPositions} />
          ) : (
            <Image
              src={vehicle.image}
              alt={vehicle.name}
              fill
              style={{ objectFit: "cover", objectPosition: vehicle.imageObjectPosition }}
              sizes="(max-width: 640px) 100vw, 520px"
            />
          )}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.42) 100%)",
            pointerEvents: "none",
          }} />
          <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
            <span style={{
              display: "inline-block",
              padding: "0.25rem 0.85rem",
              borderRadius: 9999,
              fontSize: "0.70rem",
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
            fontSize: "1rem", fontWeight: 600,
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
              { icon: <IconUsers size={12} />, val: vehicle.seating },
              { icon: <IconBriefcase size={12} />, val: vehicle.luggage.split(" / ")[0] },
            ].map(({ icon, val }) => (
              <span key={val} className="font-sans" style={{
                display: "flex", alignItems: "center", gap: "0.35rem",
                fontSize: "0.75rem", color: "var(--text-50)",
              }}>
                {icon} {val}
              </span>
            ))}
          </div>

          <a
            href="/reservation"
            className="btn-ghost font-sans"
            style={{ fontSize: "0.68rem", padding: "0.42rem 0.9rem", width: "100%", justifyContent: "center", display: "flex", alignItems: "center", gap: "0.4rem", textDecoration: "none" }}
          >
            Book Now
            <IconArrow size={11} />
          </a>
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
  const [isHovered, setIsHovered] = useState(false);
  const cfg = CATEGORY_CONFIG[vehicle.category];
  const images = Array.isArray(vehicle.image) ? vehicle.image : [vehicle.image];

  return (
    <div
      className="vehicle-card glass-panel"
      onClick={() => onSelect(vehicle)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ borderRadius: "1rem", overflow: "hidden", cursor: "pointer", position: "relative" }}
    >
      <div style={{ position: "relative", width: "100%", aspectRatio: "4/3", background: vehicle.imageObjectFit === "contain" ? "var(--bg-base)" : undefined }}>
        <ImageCarousel images={images} alt={vehicle.name} externalHover={isHovered} objectFit={vehicle.imageObjectFit} objectPosition={vehicle.imageObjectPosition} indexObjectPositions={vehicle.imageIndexObjectPositions} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.42) 100%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem" }}>
          <span style={{
            padding: "0.25rem 0.85rem", borderRadius: 9999, fontSize: "0.70rem",
            fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}`,
            backdropFilter: "blur(8px)",
          }}>{vehicle.category}</span>
        </div>
      </div>
      <div style={{
        padding: "0.9rem 1rem 1rem",
        background: "var(--glass-surface-86)",
        backdropFilter: "blur(20px) saturate(140%)",
        WebkitBackdropFilter: "blur(20px) saturate(140%)",
      }}>
        <p className="font-sans" style={{
          fontSize: "1rem", fontWeight: 600, color: "var(--text-primary)",
          margin: "0 0 0.6rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{vehicle.name}</p>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <span className="font-sans" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-50)" }}>
            <IconUsers size={12} /> {vehicle.seating}
          </span>
          <span className="font-sans" style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--text-50)" }}>
            <IconBriefcase size={12} /> {vehicle.luggage.split(" / ")[0]}
          </span>
        </div>
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
            padding: "0.32rem 1.1rem",
            borderRadius: 9999,
            fontSize: "0.84rem",
            fontWeight: 700,
            letterSpacing: "0.08em",
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
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
          marginBottom: "3.5rem",
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
              335+ Vehicles Owned by Us
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
          {["IATA Accredited", "Chauffeur-driven", "24/7 Support", "Corporate and VIP Ready"].map((item) => (
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

        {/* ── Our Amenities ── */}
        <section style={{
          background: "var(--bg-surface)",
          padding: "clamp(3rem, 7vw, 5rem) clamp(1.5rem, 6vw, 6rem)",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ marginBottom: "2.5rem" }}>
              <span style={{
                fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase",
                color: "var(--accent)", display: "block", marginBottom: 12, fontWeight: 700,
              }}>Every Ride, Every Time</span>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                margin: "0 0 0.5rem",
              }}>Our Amenities</h2>
              <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.65, maxWidth: 520 }}>
                Every Mann Fleet Partners vehicle is stocked and prepared to ensure a comfortable, premium experience from door to door.
              </p>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
            }}>
              {[
                "First aid kit",
                "Fire extinguisher",
                "Napkin",
                "Organic fragrance",
                "Cleaned and bacteria free interior",
                "Mineral water in cars",
                "Wifi Facility",
                "Hand sanitizers",
                "Basket on demand: Cookies, Cashew nuts, almonds, wafer chips, soft beverages, fruit juices, cold towels",
              ].map((item) => (
                <div key={item} style={{
                  background: "var(--bg-base)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: 14,
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.75rem",
                }}>
                  <span style={{
                    width: 8, height: 8, borderRadius: "50%",
                    background: "var(--accent)", flexShrink: 0, marginTop: "0.35rem",
                  }} />
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
