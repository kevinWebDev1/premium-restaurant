"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BrandEmblem from "./BrandEmblem";
import { FaBars, FaXmark, FaArrowRight, FaCalendarCheck, FaQrcode, FaPhone } from "react-icons/fa6";
import { gsap } from "gsap";
import { MOTION, isReducedMotion } from "@/utils/motion";

export default function HeroSection({ config, onOpenReservation, onOpenMenu }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const bgImageRef = useRef(null);
  const headerRef = useRef(null);
  const kickerRef = useRef(null);
  const dividerRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const metaRef = useRef(null);
  const footerBarRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: MOTION.ease.luxury } });

      // 1. Background image subtle settling scale
      if (bgImageRef.current) {
        tl.fromTo(
          bgImageRef.current,
          { scale: 1.05 },
          { scale: 1.0, duration: 1.4, ease: "power2.out" },
          0
        );
      }

      // 2. Floating Header entrance
      if (headerRef.current) {
        tl.fromTo(
          headerRef.current,
          { opacity: 0, y: -16 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.05
        );
      }

      // 3. Kicker Badge
      if (kickerRef.current) {
        tl.fromTo(
          kickerRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.15
        );
      }

      // 4. Headline Line-by-Line Masked Reveal (Snappy 0.8s, minimal 0.08s stagger)
      tl.fromTo(
        ".hero-line-reveal",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: MOTION.ease.luxury,
        },
        0.22
      );

      // 5. Signature Gold Divider Line Expansion
      if (dividerRef.current) {
        tl.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center" },
          { scaleX: 1, duration: 0.6, ease: MOTION.ease.cinematic },
          0.5
        );
      }

      // 6. Narrative Subtext
      if (descRef.current) {
        tl.fromTo(
          descRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.6
        );
      }

      // 7. Dual Action Row
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current.children,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.08 },
          0.7
        );
      }

      // 8. Micro Trust & Operational Info
      if (metaRef.current) {
        tl.fromTo(
          metaRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.8
        );
      }

      // 9. Footer Accent Bar
      if (footerBarRef.current) {
        tl.fromTo(
          footerBarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          0.9
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] w-full bg-[#111110] text-[#EAE3D7] overflow-hidden flex flex-col justify-between"
    >
      {/* ─────────────────────────────────────────────────────────────
          CANVAS FOUNDATION: Full-Bleed Culinary Photograph
         ───────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <div ref={bgImageRef} className="relative w-full h-full">
          <Image
            src={config.hero.image}
            alt={config.hero.alt}
            fill
            priority
            className="object-cover object-right md:object-right lg:object-right"
            sizes="100vw"
          />
        </div>

        {/* Directional Vignettes & Contrast Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111110] via-[#111110]/85 to-transparent sm:via-[#111110]/75 lg:from-[#111110] lg:via-[#111110]/60 lg:to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111110]/80 via-transparent to-transparent h-32 pointer-events-none" />

        {/* Ambient warm gold atmospheric glow */}
        <div
          className="pointer-events-none absolute -top-24 left-10 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] opacity-20"
          style={{
            background: "radial-gradient(circle, #B99A65 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          1. FLOATING HEADER (Layered over canvas)
         ───────────────────────────────────────────────────────────── */}
      <header
        ref={headerRef}
        className="relative z-20 w-full px-6 sm:px-10 lg:px-20 py-6 sm:py-8 flex items-center justify-between"
      >
        {/* Brand Emblem & Name */}
        <a href="#" className="flex items-center gap-3.5 group">
          <BrandEmblem size={42} className="transition-transform duration-700 group-hover:rotate-45" />
          <div className="flex flex-col">
            <span className="font-heading text-xl sm:text-2xl tracking-[0.28em] text-[#EAE3D7] font-medium leading-none">
              {config.name}
            </span>
            <span className="text-[9px] tracking-[0.32em] text-[#B99A65] uppercase mt-1">
              RESTAURANT
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {config.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs tracking-[0.25em] font-medium text-[#EAE3D7]/80 hover:text-[#B99A65] transition-colors uppercase py-1 relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#B99A65] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}

          {/* Desktop Primary Action: Gold Pill Button */}
          <button
            onClick={onOpenReservation}
            className="bg-[#B99A65] text-[#111110] px-6 py-2.5 rounded-sm text-xs tracking-[0.25em] font-semibold uppercase hover:bg-[#c9aa73] transition-all duration-300 cursor-pointer shadow-md hover:shadow-[#B99A65]/20 active:scale-95"
          >
            CONTACT
          </button>
        </nav>

        {/* Mobile Header Right: Quick Call & Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <a
            href={`tel:${config.contact.phone}`}
            className="w-10 h-10 rounded-full border border-[#B99A65]/40 bg-[#111110]/60 backdrop-blur-xs flex items-center justify-center text-[#B99A65] active:bg-[#B99A65]/10"
            aria-label="Call Restaurant"
          >
            <FaPhone className="text-xs" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-full border border-[#B99A65]/50 bg-[#111110]/60 backdrop-blur-xs flex items-center justify-center text-[#B99A65] active:scale-95 transition-transform"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FaXmark className="text-base" /> : <FaBars className="text-sm" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#111110]/98 backdrop-blur-md pt-28 px-8 flex flex-col justify-between pb-12 animate-fadeIn md:hidden">
          <div className="space-y-6">
            <p className="text-[10px] tracking-[0.3em] text-[#B99A65] uppercase">Navigation</p>
            <div className="flex flex-col space-y-4">
              {config.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl tracking-[0.15em] text-[#EAE3D7] hover:text-[#B99A65] py-2 border-b border-[#24221F]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-[#24221F]">
            <p className="text-xs text-[#776B5D] leading-relaxed">
              {config.contact.address}
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReservation) onOpenReservation();
              }}
              className="w-full bg-[#B99A65] text-[#111110] py-3.5 rounded-sm text-xs tracking-[0.25em] font-semibold uppercase flex items-center justify-center gap-2"
            >
              <FaCalendarCheck />
              RESERVE A TABLE
            </button>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          2. MAIN HERO CONTENT (Layered Directly Over Full Canvas)
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20 py-8 sm:py-16 flex flex-col justify-center">
        <div className="max-w-2xl lg:max-w-3xl">
          
          {/* Kicker Tagline */}
          <div ref={kickerRef} className="inline-flex items-center gap-2.5 mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#B99A65]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B99A65] font-medium uppercase">
              {config.hero.badge}
            </span>
          </div>

          {/* Primary Editorial Headline: Cormorant Garamond with Line-by-Line Masked Reveal */}
          <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl xl:text-[4.75rem] font-normal tracking-[0.03em] text-[#EAE3D7] leading-[1.05] uppercase">
            <span className="block overflow-hidden py-1">
              <span className="block hero-line-reveal">NAMI, CONTEMPORARY</span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="block hero-line-reveal">GASTRONOMY</span>
            </span>
          </h1>

          {/* Characteristic Nemi Gold Divider Rule */}
          <div
            ref={dividerRef}
            className="w-24 sm:w-36 h-[1.5px] bg-[#B99A65] my-6 sm:my-8 opacity-85"
          />

          {/* Atmospheric Brand Story Subtext */}
          <p
            ref={descRef}
            className="text-sm sm:text-base lg:text-lg text-[#EAE3D7]/90 font-body leading-relaxed max-w-xl font-light mb-8 sm:mb-10 drop-shadow-sm"
          >
            {config.description}
          </p>

          {/* Dual Action Row */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5">
            {/* Primary Action Button: Filled Antique Gold Pill */}
            <button
              onClick={onOpenReservation}
              className="group bg-[#B99A65] text-[#111110] px-9 py-4 rounded-sm text-xs tracking-[0.25em] font-semibold uppercase hover:bg-[#c9aa73] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer shadow-lg hover:shadow-[#B99A65]/25 active:scale-95"
            >
              <FaCalendarCheck className="text-xs transition-transform duration-300 group-hover:scale-110" />
              <span>{config.hero.primaryCtaText}</span>
            </button>

            {/* Secondary Action Button: QR Menu Link */}
            <a
              href="/menu"
              onClick={onOpenMenu}
              className="group border border-[#B99A65]/40 hover:border-[#B99A65] bg-[#111110]/50 hover:bg-[#24221F]/80 backdrop-blur-xs text-[#EAE3D7] hover:text-[#B99A65] px-7 py-4 rounded-sm text-xs tracking-[0.25em] font-medium uppercase transition-all duration-300 flex items-center justify-center gap-2.5"
            >
              <FaQrcode className="text-xs text-[#B99A65]" />
              <span>{config.hero.secondaryCtaText}</span>
              <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Micro Trust & Operational Info */}
          <div
            ref={metaRef}
            className="mt-10 sm:mt-12 pt-6 border-t border-[#776B5D]/30 flex flex-wrap items-center gap-y-3 gap-x-8 text-[11px] text-[#776B5D] tracking-wider uppercase font-medium"
          >
            <div className="flex items-center gap-2 text-[#EAE3D7]/75">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A65]" />
              <span>{config.hours.schedule}</span>
            </div>
            <div className="flex items-center gap-2 text-[#EAE3D7]/75">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B99A65]" />
              <span>{config.contact.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. HERO FOOTER ACCENT BAR
         ───────────────────────────────────────────────────────────── */}
      <div
        ref={footerBarRef}
        className="relative z-20 w-full px-6 sm:px-10 lg:px-20 py-4 border-t border-[#24221F]/60 bg-[#111110]/40 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.2em] text-[#776B5D] uppercase"
      >
        <div className="flex items-center gap-3">
          <span className="text-[#B99A65]">✦</span>
          <span className="text-[#EAE3D7]/70">Artisanal Seafood & Culinary Heritage</span>
        </div>
        <div className="hidden sm:block text-[#776B5D]">
          <span>Scroll to explore the experience</span>
        </div>
        <div className="flex items-center gap-2 text-[#EAE3D7]/70">
          <span>{config.contact.displayPhone}</span>
        </div>
      </div>
    </section>
  );
}
