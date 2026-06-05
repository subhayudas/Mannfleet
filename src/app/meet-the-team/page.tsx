"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════ */
interface Leader {
  id: string;
  name: string;
  title: string;
  email: string;
  photo: string | null;
  objectPosition?: string;
  teaser: string;
  bio: string;
  education: string[];
  accolades: string[];
}

const LEADERS: Leader[] = [
  {
    id: "amrit",
    name: "Amrit Pal Singh Mann",
    title: "Managing Director",
    email: "amrit@manntours.com",
    photo: "/teams/amrit%20pal.jpeg",
    objectPosition: "top",
    teaser:
      "Pioneer in shifting the Indian tourism industry to premium luxury vehicles since 1986 — driving business expansion and service excellence for four decades.",
    bio: "Amrit Pal Singh Mann is the Promoter and Managing Director of the Company. He has also passed his first year of Bachelor of Commerce in 1985 from University of Delhi. He has been pioneered in shifting the Indian tourism industry from all types of smart to premium luxury vehicles since 1986. He has been a key leader, driving business expansion and service excellence in all tourist transport segments. With extensive experience in managing high-profile events, corporate delegations and provided services to embassies, he has played a crucial role in strengthening our Company's market presence. He is known for his disciplined and client-centric approach, ensuring the highest standards of service delivery. He has been at the forefront of adopting the latest transport technology and luxury vehicles, reinforcing Mann Fleet Partners Limited position as in luxury passenger transport in India. His strategic vision continues to propel our Company's growth. He spearheads the rollout of the entire premier fleet.",
    education: ["Bachelor of Commerce (First Year) — University of Delhi, 1985"],
    accolades: [
      "Pioneer in luxury vehicle transition since 1986",
      "High-profile events and embassy delegations",
      "Spearheads the entire premier fleet rollout",
    ],
  },
  {
    id: "parmjeet",
    name: "Parmjeet Mann",
    title: "Executive Director and Head of HR",
    email: "parmjeet@manntours.com",
    photo: "/teams/parmjeet%20mann.jpeg",
    objectPosition: "top",
    teaser:
      "Executive Director and Head of Human Resources, instrumental in securing high-value contracts with embassies, MNCs, and prestigious events since 2005.",
    bio: "Parmjeet Mann is the Promoter, Executive Director and Head of Human Resources Department of our Company. She has completed diploma in Fashion Design from JD Institute of Fashion Technology in the year 2001–02 and also completed her PG Diploma in microbiology and food technology from Punjabi University in the year 1994. She has also done Bachelor of Science (Honors) in Botany from Panjab University in the year 1993. She has been associated with our Company from August 2005. She has played a crucial role in driving the Company's growth. She has been instrumental in securing high-value contracts with embassies, multinational corporations and prestigious events. She has also developed and trained a team of 15 sales professionals, ensuring consistent business growth and client retention. Additionally, as Head of Human Resources, she manages a workforce of our employees, including chauffeurs and office staffs, streamlining business functions and ensuring operational efficiency.",
    education: [
      "BSc (Hons) Botany — Panjab University, 1993",
      "PG Diploma in Microbiology and Food Technology — Punjabi University, 1994",
      "Diploma in Fashion Design — JD Institute of Fashion Technology, 2001–02",
    ],
    accolades: [
      "Associated with the Company since August 2005",
      "Secured high-value embassy and MNC contracts",
      "Developed & trained 15 sales professionals",
    ],
  },
  {
    id: "robin",
    name: "Mr. Robin Singh Mann",
    title: "Executive Director and Head of Marketing",
    email: "robin@faze.in",
    photo: "/teams/Robin%20Mann%20Sir%20photo.png",
    objectPosition: "top",
    teaser:
      "Columbia University honours graduate and former Evercore Investment Banking Analyst, now leading growth and marketing strategy at Mann Fleet.",
    bio: "Mr. Robin Singh Mann is a Promoter, Executive Director of our Company. He completed his Bachelor of Arts at Columbia University in the City of New York and graduated with honours in May 2020. Prior to joining our Company, he was associated with Evercore's PCA division in NYC, USA in the capacity of Investment Banking Senior Analyst and Citigroup in NYC. At our Company, he leads the growth and scalability of the business as Head of Marketing. As a part of this role, he creates and deploys various marketing and social media strategies that aim to improve Mann's position and market share. Robin also supports the Sales team on marquee projects, pitches, and clients. Additionally, he also leads one of our Group Company namely, Leap Green Infra Private Limited, leveraging his experience to target and generate new clientele, contract structures and revenue stacks.",
    education: [
      "BA (Honours) — Columbia University, New York, May 2020",
    ],
    accolades: [
      "Investment Banking Senior Analyst — Evercore PCA, NYC",
      "Experience at Citigroup, NYC",
      "Leads Leap Green Infra Private Limited",
    ],
  },
];

interface IndependentDirector {
  id: string;
  name: string;
  title: string;
  photo: string;
  objectPosition?: string;
  bio?: string;
}

const INDEPENDENT_DIRECTORS: IndependentDirector[] = [
  {
    id: "ashok",
    name: "Mr. Ashok Jha",
    title: "Independent Director",
    photo: "/teams/Ashok jha.jpeg",
    objectPosition: "top",
    bio: "Ashok Jha is an Independent Director of our Company. He has completed his Senior Secondary Examination (Class XII) from the Central Board of Secondary Education, New Delhi in the year 1981. He also held a Certificate of Competency as Master of a Foreign-Going Ship, issued under the Merchant Shipping Act, 1958 which is required to be renewed every five years in accordance with applicable maritime regulations. He has approximately 11 years of experience in the marine and offshore industry, having served in senior roles such as, Master of FPSO/FSO facilities and currently, as Offshore Installation Manager (OIM). His expertise includes evaluation simultaneous operations on the facility, assistance in the preparation of budgets and in the planning and co-ordination of campaign maintenance, conversions or other major activities.",
  },
  {
    id: "averjit",
    name: "Mr. Avarjit Singh Birghi",
    title: "Independent Director",
    photo: "/teams/Avarjit Singh.jpeg",
    objectPosition: "top",
    bio: "Avarjit Singh Birghi is an Independent Director of our Company. He has completed his Senior Secondary Examination (Class XII) from the St. Columbas School, New Delhi in 1985 along with this he has completed his Bachelor of Commerce (Honours), University of Delhi in 1989 and he is a member of the Institute of Charted Accountants of India since 1991. He has also professional experience in Information Technology industry where he has worked with IBM India Private Limited and thereafter with Tata Consultancy Services.",
  },
  {
    id: "sami",
    name: "Dr. Mohd Sami",
    title: "Independent Director",
    photo: "/teams/Mohd Sami.jpeg",
    objectPosition: "top",
    bio: "Mohd Sami is an Independent Director of our Company. He has completed his Doctor of Philosophy (PhD) in Physics and Mathematical Sciences from Moscow State University in 1983. He qualified as Physicist at Patrice Lumumba Peoples’ Friendship University, Moscow Russia in 1978. He served as the director of the Centre for Theoretical Physics, Jamia Millia Islamia (A Central University) from January 12, 2007 to January 31, 2020. Currently he is working as director of Centre for Cosmology and Science popularisation at Shree Guru Gobind Singh Tricentenary University.",
  },
];

interface SalesMember {
  id: string;
  name: string;
  title: string;
  email: string;
  photo: string | null;
  objectPosition?: string;
  bio?: string;
}

const SALES_TEAM: SalesMember[] = [
  {
    id: "amarjeet",
    name: "Amarjeet Mann",
    title: "President-Marketing",
    email: "amarjeet@manntours.com",
    photo: "/teams/PHOTO-2026-04-20-18-02-49.jpg",
    objectPosition: "top",
    bio: "Ms. Amarjeet Mann has more than 30 years of experiences in Sales and Marketing and is currently the President — Marketing at Mann Fleet Partners Limited since October 2022, focusing on revenue strategies and managing high-profile corporate events and international delegations. Previously, she was a Team Lead at Disney Star from January to September 2022, driving revenue for Star Maa in Delhi. Ms. Mann boasts over two decades at The Times of India Group, holding diverse roles including General Manager — Delhi Head for Consumer Durable Vertical & Telecom. A Luxury and Lifestyle Specialist, she launched India's first luxury summit and played a key role in organizing events like Femina Miss India. She holds a Post Graduate Diploma in Marketing from Apeejay School of Marketing and a Graduation from Lady Irwin College. Her continuous professional development includes certifications in Digital Marketing and Analytics from ISB. Ms. Mann's key skills encompass persuasive communication, key account management, and strategic thinking.",
  },
  {
    id: "jagdeep",
    name: "Jagdeep Singh Mann",
    title: "President-Sales",
    email: "jagdeep@manntours.com",
    photo: "/teams/PHOTO-2026-04-20-18-02-49 2.jpg",
    objectPosition: "top",
    bio: "Mr. Jagdeep Singh Mann has approximately 12 years of experience in sales, marketing, and operations, currently serves as President — Sales at Mann Fleet Partners Limited. His journey with the company began as a dedicated Management Trainee in Marketing and Sales. Demonstrating exceptional aptitude and commitment during this initial period, he was deservedly retained as a permanent employee, progressively expanding his expertise across critical business functions. Academically, Mr. Mann is a distinguished alumnus of Maharshi Dayanand University, Rohtak, where he earned a Bachelor of Business Administration (Industry Integrated).",
  },
  {
    id: "ashwani",
    name: "Ashwani Kumar",
    title: "Asst. Manager — Sales",
    email: "ashwani@manntours.com",
    photo: "/teams/Mr.%20Ashwani%20Kumar%20Picture.png",
    objectPosition: "top",
    bio: "Mr. Ashwani Kumar is a professional with over 11 years of diverse experience in sales, marketing, operations, MICE and management. He has been a key part of Mann Fleet Partners Limited since 2017, currently serving as Assistant Sales Manager. Known for his strong client handling, business development skills, and operational efficiency, he has consistently contributed to driving growth and delivering high-quality service experiences.",
  },
];

/* ══════════════════════════════════════════════════════════════
   AVATAR PLACEHOLDER
══════════════════════════════════════════════════════════════ */
function AvatarPlaceholder({ name, size = 160 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .filter((w) => /^[A-Z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 20,
        background: "var(--accent)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.32,
        fontFamily: "'Instrument Serif', serif",
        color: "#fff",
        userSelect: "none",
        flexShrink: 0,
      }}
    >
      {initials || "M"}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PHOTO LIGHTBOX
══════════════════════════════════════════════════════════════ */
function PhotoLightbox({
  src,
  name,
  onClose,
}: {
  src: string | null;
  name: string;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const ct = contentRef.current;
    if (!bd || !ct) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
    gsap.fromTo(ct, { scale: 0.85, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        background: "rgba(5,3,1,0.88)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div ref={contentRef} onClick={(e) => e.stopPropagation()}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
            }}
          />
        ) : (
          <AvatarPlaceholder name={name} size={280} />
        )}
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════════ */
function TeamModal({
  leader,
  onClose,
}: {
  leader: Leader;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      card,
      { opacity: 0, scale: 0.85, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
    );

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.88, y: 30, duration: 0.25, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,8,5,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 20,
          padding: "clamp(1.25rem, 5vw, 40px) clamp(1.25rem, 6vw, 44px)",
          maxWidth: 700,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "var(--glass-light)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", gap: 24, alignItems: "center", marginBottom: 28 }}>
          {leader.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={leader.photo}
              alt={leader.name}
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                objectFit: "cover",
                objectPosition: leader.objectPosition || "top",
                flexShrink: 0,
                border: "2px solid var(--accent)",
              }}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          ) : (
            <AvatarPlaceholder name={leader.name} size={120} />
          )}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
              {leader.title}
            </p>
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                color: "var(--text-primary)",
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              {leader.name}
            </h2>
            <a href={`mailto:${leader.email}`} style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4, display: "inline-block" }}>
              {leader.email}
            </a>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 24 }} />

        <p style={{ fontSize: "0.97rem", lineHeight: 1.78, color: "var(--text-secondary)", marginBottom: 28 }}>
          {leader.bio}
        </p>

        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
            Education
          </p>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none" }}>
            {leader.education.map((e, i) => (
              <li key={i} style={{ fontSize: "0.88rem", color: "var(--text-secondary)", paddingLeft: 16, position: "relative", marginBottom: 6 }}>
                <span style={{ position: "absolute", left: 0, top: "0.45em", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", display: "block" }} />
                {e}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
            Highlights
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {leader.accolades.map((a, i) => (
              <span
                key={i}
                style={{
                  fontSize: "0.8rem",
                  padding: "5px 12px",
                  borderRadius: 20,
                  background: "var(--glass-light)",
                  border: "1px solid var(--border-subtle)",
                  color: "var(--text-secondary)",
                }}
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   SALES MODAL
══════════════════════════════════════════════════════════════ */
function SalesModal({
  member,
  onClose,
}: {
  member: SalesMember;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(card, { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.88, y: 30, duration: 0.25, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,8,5,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 20,
          padding: "clamp(1.25rem, 5vw, 40px) clamp(1.25rem, 6vw, 44px)",
          maxWidth: 620,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "var(--glass-light)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: 16,
                objectFit: "cover",
                objectPosition: member.objectPosition || "top",
                flexShrink: 0,
                border: "2px solid var(--accent)",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <AvatarPlaceholder name={member.name} size={100} />
          )}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
              {member.title}
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--text-primary)", margin: "0 0 6px", lineHeight: 1.2 }}>
              {member.name}
            </h2>
            <a href={`mailto:${member.email}`} style={{ fontSize: 12, color: "var(--text-secondary)" }}>
              {member.email}
            </a>
          </div>
        </div>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />

        <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: "var(--text-secondary)", margin: 0 }}>
          {member.bio}
        </p>
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   INDEPENDENT DIRECTOR MODAL
══════════════════════════════════════════════════════════════ */
function IndependentDirectorModal({
  director,
  onClose,
}: {
  director: IndependentDirector;
  onClose: () => void;
}) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    if (!bd || !card) return;

    gsap.fromTo(bd, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(card, { opacity: 0, scale: 0.85, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" });

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = useCallback(() => {
    const bd = backdropRef.current;
    const card = cardRef.current;
    const tl = gsap.timeline({ onComplete: onClose });
    if (card) tl.to(card, { opacity: 0, scale: 0.88, y: 30, duration: 0.25, ease: "power2.in" }, 0);
    if (bd) tl.to(bd, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0);
  }, [onClose]);

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(10,8,5,0.78)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-mid)",
          borderRadius: 20,
          padding: "clamp(1.25rem, 5vw, 40px) clamp(1.25rem, 6vw, 44px)",
          maxWidth: 620,
          width: "100%",
          maxHeight: "88vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "var(--glass-light)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "50%",
            width: 36,
            height: 36,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--text-primary)",
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          ×
        </button>

        <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 24 }}>
          {director.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={director.photo}
              alt={director.name}
              style={{
                width: 100,
                height: 100,
                borderRadius: 16,
                objectFit: "cover",
                objectPosition: director.objectPosition || "top",
                flexShrink: 0,
                border: "2px solid var(--accent)",
              }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <AvatarPlaceholder name={director.name} size={100} />
          )}
          <div>
            <p style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 4 }}>
              {director.title}
            </p>
            <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.2rem, 3vw, 1.6rem)", color: "var(--text-primary)", margin: "0 0 6px", lineHeight: 1.2 }}>
              {director.name}
            </h2>
          </div>
        </div>

        {director.bio && (
          <>
            <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />
            <p style={{ fontSize: "0.95rem", lineHeight: 1.78, color: "var(--text-secondary)", margin: 0 }}>
              {director.bio}
            </p>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}

/* ══════════════════════════════════════════════════════════════
   LEADER CARD
══════════════════════════════════════════════════════════════ */
function LeaderCard({
  leader,
  onOpen,
  cardRef,
}: {
  leader: Leader;
  onOpen: () => void;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -8;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 8;
    gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.025, duration: 0.35, ease: "power2.out", transformPerspective: 800 });
  };

  const handleMouseLeave = () => {
    const card = innerRef.current;
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.7)", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleMouseEnter = () => {
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  return (
    <div ref={cardRef} style={{ perspective: 800 }}>
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "36px 32px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div ref={glowRef} style={{ position: "absolute", inset: -1, borderRadius: 18, border: "1.5px solid var(--accent)", opacity: 0, pointerEvents: "none", boxShadow: "0 0 28px rgba(220,38,38,0.25)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)", borderRadius: "18px 18px 0 0" }} />

        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 24, cursor: "zoom-in" }}
          onClick={() => setLightboxOpen(true)}
        >
          {leader.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={leader.photo}
              alt={leader.name}
              style={{ width: 160, height: 160, borderRadius: 20, objectFit: "cover", objectPosition: leader.objectPosition || "top", border: "2px solid var(--border-mid)", filter: "grayscale(40%)", transition: "filter 0.4s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(40%)")}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          ) : (
            <AvatarPlaceholder name={leader.name} size={160} />
          )}
        </div>

        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", textAlign: "center", marginBottom: 6 }}>
          {leader.title}
        </p>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)", color: "var(--text-primary)", textAlign: "center", marginBottom: 8, lineHeight: 1.25 }}>
          {leader.name}
        </h3>
        <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center", marginBottom: 20 }}>
          {leader.email}
        </p>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />

        <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-secondary)", marginBottom: 24, display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {leader.teaser}
        </p>

        <button
          onClick={onOpen}
          style={{
            width: "100%",
            padding: "11px 0",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid var(--border-mid)",
            color: "var(--text-primary)",
            fontSize: "0.82rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
          }}
        >
          Read Full Profile
          <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7" /><path d="M7 7h10v10" />
          </svg>
        </button>
      </div>

      {lightboxOpen && (
        <PhotoLightbox src={leader.photo} name={leader.name} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   DIRECTOR CARD (Independent Directors)
══════════════════════════════════════════════════════════════ */
function DirectorCard({
  director,
  cardRef,
}: {
  director: IndependentDirector;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseLeave = () => {
    const card = innerRef.current;
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.7)", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
    gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.02, duration: 0.35, ease: "power2.out", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  return (
    <div ref={cardRef} style={{ perspective: 800 }}>
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "36px 28px 32px",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform",
          textAlign: "center",
        }}
      >
        <div ref={glowRef} style={{ position: "absolute", inset: -1, borderRadius: 18, border: "1.5px solid var(--accent)", opacity: 0, pointerEvents: "none", boxShadow: "0 0 24px rgba(220,38,38,0.2)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, transparent, var(--accent), transparent)", borderRadius: "18px 18px 0 0" }} />

        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 22, cursor: "zoom-in" }}
          onClick={() => setLightboxOpen(true)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={director.photo}
            alt={director.name}
            style={{ width: 160, height: 160, borderRadius: 20, objectFit: "cover", objectPosition: director.objectPosition || "top", border: "2px solid var(--border-mid)", filter: "grayscale(30%)", transition: "filter 0.4s ease" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(30%)")}
            onError={(e) => {
              const img = e.currentTarget as HTMLImageElement;
              img.style.display = "none";
            }}
          />
        </div>

        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
          {director.title}
        </p>
        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", color: "var(--text-primary)", lineHeight: 1.25, margin: 0 }}>
          {director.name}
        </h3>

        {director.bio && (
          <div style={{ marginTop: 20 }}>
            <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />
            <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: "0 0 12px 0", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "left" }}>
              {director.bio}
            </p>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                width: "100%",
                padding: "10px 0",
                borderRadius: 10,
                background: "transparent",
                border: "1px solid var(--border-mid)",
                color: "var(--text-primary)",
                fontSize: "0.82rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
                (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
              }}
            >
              Read Full Profile
              <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7" /><path d="M7 7h10v10" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {lightboxOpen && (
        <PhotoLightbox src={director.photo} name={director.name} onClose={() => setLightboxOpen(false)} />
      )}
      {modalOpen && (
        <IndependentDirectorModal director={director} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SALES CARD
══════════════════════════════════════════════════════════════ */
function SalesCard({
  member,
  cardRef,
}: {
  member: SalesMember;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = innerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rx = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
    gsap.to(card, { rotationX: rx, rotationY: ry, scale: 1.02, duration: 0.35, ease: "power2.out", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
  };

  const handleMouseLeave = () => {
    const card = innerRef.current;
    if (!card) return;
    gsap.to(card, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "elastic.out(1,0.7)", transformPerspective: 800 });
    if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
  };

  return (
    <div ref={cardRef} style={{ perspective: 800 }}>
      <div
        ref={innerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 18,
          padding: "36px 28px 32px",
          position: "relative",
          overflow: "hidden",
          transformStyle: "preserve-3d",
          willChange: "transform",
          textAlign: "center",
        }}
      >
        <div ref={glowRef} style={{ position: "absolute", inset: -1, borderRadius: 18, border: "1.5px solid var(--accent)", opacity: 0, pointerEvents: "none", boxShadow: "0 0 28px rgba(220,38,38,0.25)" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)", borderRadius: "18px 18px 0 0" }} />

        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 22, cursor: "zoom-in" }}
          onClick={() => setLightboxOpen(true)}
        >
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.photo}
              alt={member.name}
              style={{ width: 160, height: 160, borderRadius: 20, objectFit: "cover", objectPosition: member.objectPosition || "top", border: "2px solid var(--border-mid)", filter: "grayscale(30%)", transition: "filter 0.4s ease" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(0%)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLImageElement).style.filter = "grayscale(30%)")}
              onError={(e) => {
                const img = e.currentTarget as HTMLImageElement;
                const parent = img.parentElement;
                if (parent) {
                  img.style.display = "none";
                  const div = document.createElement("div");
                  div.style.cssText = `width:160px;height:160px;borderRadius:20px;background:var(--accent);display:flex;alignItems:center;justifyContent:center;fontSize:52px;fontFamily:"Instrument Serif",serif;color:#fff`;
                  div.textContent = member.name.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");
                  parent.appendChild(div);
                }
              }}
            />
          ) : (
            <AvatarPlaceholder name={member.name} size={160} />
          )}
        </div>

        <p style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 8 }}>
          {member.title}
        </p>

        <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "var(--text-primary)", lineHeight: 1.25, marginBottom: 20 }}>
          {member.name}
        </h3>

        <div style={{ height: 1, background: "var(--border-subtle)", marginBottom: 20 }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href={`mailto:${member.email}`}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.88rem", transition: "color 0.2s", wordBreak: "break-all" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)")}
          >
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            {member.email}
          </a>

          {member.bio && (
            <>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.65, color: "var(--text-secondary)", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden", textAlign: "left" }}>
                {member.bio}
              </p>
              <button
                onClick={() => setModalOpen(true)}
                style={{
                  width: "100%",
                  padding: "10px 0",
                  borderRadius: 10,
                  background: "transparent",
                  border: "1px solid var(--border-mid)",
                  color: "var(--text-primary)",
                  fontSize: "0.82rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--accent)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                  (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-mid)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-primary)";
                }}
              >
                Read Full Profile
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {lightboxOpen && (
        <PhotoLightbox src={member.photo} name={member.name} onClose={() => setLightboxOpen(false)} />
      )}
      {modalOpen && (
        <SalesModal member={member} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SECTION HEADER
══════════════════════════════════════════════════════════════ */
function SectionHeader({
  labelRef,
  divRef,
  label,
  heading,
  sub,
}: {
  labelRef: React.RefObject<HTMLDivElement | null>;
  divRef: React.RefObject<HTMLDivElement | null>;
  label: string;
  heading: string;
  sub?: string;
}) {
  return (
    <div ref={labelRef} style={{ marginBottom: 14 }}>
      <p style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 10 }}>
        {label}
      </p>
      <div ref={divRef} style={{ height: 1, background: "var(--border-subtle)", marginBottom: 48 }} />
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 12, lineHeight: 1.15 }}>
        {heading}
      </h2>
      {sub && (
        <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", maxWidth: 520, lineHeight: 1.6 }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function MeetTheTeamPage() {
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);

  /* ── Refs ── */
  const heroRef = useRef<HTMLElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const heroWordsRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);
  const heroScrollRef = useRef<HTMLDivElement>(null);

  const leadSecRef = useRef<HTMLElement>(null);
  const leadLabelRef = useRef<HTMLDivElement>(null);
  const leadDivRef = useRef<HTMLDivElement>(null);
  const card0Ref = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  const dirSecRef = useRef<HTMLElement>(null);
  const dirLabelRef = useRef<HTMLDivElement>(null);
  const dirDivRef = useRef<HTMLDivElement>(null);
  const dir0Ref = useRef<HTMLDivElement>(null);
  const dir1Ref = useRef<HTMLDivElement>(null);
  const dir2Ref = useRef<HTMLDivElement>(null);

  const salesSecRef = useRef<HTMLElement>(null);
  const salesLabelRef = useRef<HTMLDivElement>(null);
  const salesDivRef = useRef<HTMLDivElement>(null);
  const sales0Ref = useRef<HTMLDivElement>(null);
  const sales1Ref = useRef<HTMLDivElement>(null);
  const sales2Ref = useRef<HTMLDivElement>(null);

  const ctaSecRef = useRef<HTMLElement>(null);
  const ctaTextRef = useRef<HTMLDivElement>(null);

  const cardRefs = [card0Ref, card1Ref, card2Ref];
  const dirRefs = [dir0Ref, dir1Ref, dir2Ref];
  const salesRefs = [sales0Ref, sales1Ref, sales2Ref];

  useEffect(() => {
    const ease = "power3.out";
    const ctx = gsap.context(() => {

      /* ── HERO ── */
      if (heroBadgeRef.current)
        gsap.from(heroBadgeRef.current, { y: -20, opacity: 0, duration: 0.7, ease, delay: 0.1 });

      if (heroWordsRef.current) {
        const words = heroWordsRef.current.querySelectorAll<HTMLSpanElement>(".hero-word");
        gsap.from(words, { y: 70, opacity: 0, duration: 0.85, ease, stagger: 0.1, delay: 0.2 });
      }

      if (heroSubRef.current)
        gsap.from(heroSubRef.current, { y: 20, opacity: 0, duration: 0.7, ease, delay: 0.6 });

      if (heroLineRef.current)
        gsap.from(heroLineRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease, delay: 0.5 });

      if (heroScrollRef.current)
        gsap.from(heroScrollRef.current, { opacity: 0, y: 10, duration: 0.6, ease, delay: 1 });

      /* ── LEADERSHIP ── */
      if (leadLabelRef.current)
        gsap.from(leadLabelRef.current, { y: 30, opacity: 0, duration: 0.7, ease, scrollTrigger: { trigger: leadLabelRef.current, start: "top 85%" } });
      if (leadDivRef.current)
        gsap.from(leadDivRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease, scrollTrigger: { trigger: leadDivRef.current, start: "top 85%" } });

      const cardEls = [card0Ref.current, card1Ref.current, card2Ref.current].filter(Boolean);
      if (cardEls.length)
        gsap.from(cardEls, { y: 80, opacity: 0, duration: 0.85, ease, stagger: 0.15, scrollTrigger: { trigger: leadSecRef.current, start: "top 70%" } });

      /* ── INDEPENDENT DIRECTORS ── */
      if (dirLabelRef.current)
        gsap.from(dirLabelRef.current, { y: 30, opacity: 0, duration: 0.7, ease, scrollTrigger: { trigger: dirLabelRef.current, start: "top 85%" } });
      if (dirDivRef.current)
        gsap.from(dirDivRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease, scrollTrigger: { trigger: dirDivRef.current, start: "top 85%" } });

      const dirEls = [dir0Ref.current, dir1Ref.current, dir2Ref.current].filter(Boolean);
      if (dirEls.length)
        gsap.from(dirEls, { y: 60, opacity: 0, duration: 0.8, ease, stagger: 0.15, scrollTrigger: { trigger: dirSecRef.current, start: "top 72%" } });

      /* ── SALES ── */
      if (salesLabelRef.current)
        gsap.from(salesLabelRef.current, { y: 30, opacity: 0, duration: 0.7, ease, scrollTrigger: { trigger: salesLabelRef.current, start: "top 85%" } });
      if (salesDivRef.current)
        gsap.from(salesDivRef.current, { scaleX: 0, transformOrigin: "left center", duration: 0.9, ease, scrollTrigger: { trigger: salesDivRef.current, start: "top 85%" } });

      const salesEls = [sales0Ref.current, sales1Ref.current, sales2Ref.current].filter(Boolean);
      if (salesEls.length)
        gsap.from(salesEls, { y: 60, opacity: 0, duration: 0.8, ease, stagger: 0.15, scrollTrigger: { trigger: salesSecRef.current, start: "top 72%" } });

      /* ── CTA ── */
      if (ctaTextRef.current)
        gsap.from(ctaTextRef.current, { y: 40, opacity: 0, duration: 0.8, ease, scrollTrigger: { trigger: ctaSecRef.current, start: "top 75%" } });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section
        ref={heroRef}
        style={{ minHeight: "72vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(220,38,38,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div
          ref={heroBadgeRef}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 40, border: "1px solid var(--border-mid)", background: "var(--glass-light)", backdropFilter: "blur(8px)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 32 }}
        >
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", display: "inline-block" }} />
          Mann Fleet Partners Limited
        </div>

        <div ref={heroWordsRef} style={{ overflow: "hidden", lineHeight: 1.1, marginBottom: 8 }}>
          {["Meet", "Our", "Team"].map((word) => (
            <span
              key={word}
              className="hero-word"
              style={{ display: "inline-block", fontFamily: "'Instrument Serif', serif", fontSize: "clamp(3rem, 10vw, 8rem)", fontWeight: 400, color: "var(--text-primary)", marginRight: "0.25em", lineHeight: 1.05 }}
            >
              {word}
            </span>
          ))}
        </div>

        <div
          ref={heroLineRef}
          style={{ width: "min(320px, 60vw)", height: 2, background: "linear-gradient(90deg, var(--accent) 0%, transparent 100%)", borderRadius: 2, margin: "20px auto 28px" }}
        />

        <p
          ref={heroSubRef}
          style={{ maxWidth: 560, fontSize: "clamp(0.95rem, 2vw, 1.1rem)", lineHeight: 1.7, color: "var(--text-secondary)" }}
        >
          The people behind India&apos;s premier luxury transport company — four decades of expertise, vision, and excellence.
        </p>

        <div
          ref={heroScrollRef}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}
        >
          <p style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</p>
          <div style={{ width: 1, height: 32, background: "var(--text-muted)", animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ═══ FOUNDING DIRECTORS ═══ */}
      <section ref={leadSecRef} style={{ padding: "80px 24px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader
          labelRef={leadLabelRef}
          divRef={leadDivRef}
          label="Leadership"
          heading="The Leadership"
          sub="Decades of combined experience shaping the future of luxury passenger transport in India."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28, marginTop: 52 }}>
          {LEADERS.map((leader, i) => (
            <LeaderCard key={leader.id} leader={leader} onOpen={() => setActiveLeader(leader)} cardRef={cardRefs[i]} />
          ))}
        </div>
      </section>

      {/* ═══ INDEPENDENT DIRECTORS ═══ */}
      <section
        ref={dirSecRef}
        style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <SectionHeader
          labelRef={dirLabelRef}
          divRef={dirDivRef}
          label="Board of Directors"
          heading="Independent Directors"
          sub="Distinguished professionals bringing independent oversight and governance expertise to Mann Fleet Partners Limited."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28, marginTop: 52 }}>
          {INDEPENDENT_DIRECTORS.map((dir, i) => (
            <DirectorCard key={dir.id} director={dir} cardRef={dirRefs[i]} />
          ))}
        </div>
      </section>

      {/* ═══ SALES and MARKETING TEAM ═══ */}
      <section
        ref={salesSecRef}
        style={{ padding: "0 24px 100px", maxWidth: 1200, margin: "0 auto" }}
      >
        <SectionHeader
          labelRef={salesLabelRef}
          divRef={salesDivRef}
          label="Our Team"
          heading="Sales and Marketing"
          sub="The driving force behind our client relationships, partnerships, and revenue growth."
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, marginTop: 52 }}>
          {SALES_TEAM.map((member, i) => (
            <SalesCard key={member.id} member={member} cardRef={salesRefs[i]} />
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section
        ref={ctaSecRef}
        style={{ padding: "80px 24px 120px", textAlign: "center", background: "var(--bg-deep)", borderTop: "1px solid var(--border-subtle)" }}
      >
        <div ref={ctaTextRef}>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 20 }}>
            Get in touch
          </p>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(2rem, 6vw, 4.5rem)", fontWeight: 400, color: "var(--text-primary)", marginBottom: 40, lineHeight: 1.1 }}>
            Work with us.
          </h2>
          <a
            href="mailto:info@mannfleetpartners.com"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 50, background: "var(--accent)", color: "#fff", fontSize: "0.88rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", transition: "background 0.2s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent-dark)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "var(--accent)")}
          >
            Job Enquiry
            <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { transform: scaleY(1); opacity: 0.5; }
          50% { transform: scaleY(0.5); opacity: 0.2; }
        }
      `}</style>

      {activeLeader && (
        <TeamModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
      )}
    </div>
  );
}
