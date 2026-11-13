"use client";

import React, { useEffect, useRef } from "react";
import { FaArrowRight, FaQrcode } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, getFanBladeData, animateFanReveal } from "@/utils/motion";

const BLADE_COUNT = 12;

/**
 * FanRevealImage Component
 * Physical Abanico (Radial Folding Fan) reveal:
 * - Starting State: Closed along the SHORT vertical edge (blue reference line).
 * - Sweep: Fans outward across the frame from short edge to long edge.
 * - End State: Pleats dissolve seamlessly into the unclipped photograph (Image 4).
 */
export function FanRevealImage({ src, alt, badgeText, pivot = "bottom-right" }) {
  const stageRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      animateFanReveal(stageRef.current, { pivot });
    }, stageRef);

    return () => ctx.revert();
  }, [pivot]);

  return (
    <div
      ref={stageRef}
      data-pivot={pivot}
      className="fan-stage relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10] overflow-hidden rounded-sm bg-[#111110] group"
    >
      {/* Background canvas: Pure Obsidian (Seamless with dark page background) */}
      <div className="absolute inset-0 bg-[#111110]" />

      {/* Full unclipped base image (Image 4: smoothly revealed once fan locks at 0deg) */}
      <img
        src={src}
        alt={alt}
        className="fan-base-image absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.04] opacity-0"
      />

      {/* 12 Radial Fan Blades anchored at pivot corner */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: BLADE_COUNT }).map((_, index) => {
          const { clipPath, origin } = getFanBladeData(index, BLADE_COUNT, pivot);
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="fan-blade absolute inset-0 w-full h-full will-change-transform opacity-0"
              style={{
                clipPath,
                WebkitClipPath: clipPath,
                transformOrigin: origin,
                zIndex: BLADE_COUNT - index, // Blade 0 (vertical strip) sits on top when closed
              }}
            >
              {/* Pristine stationary food slice */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover object-center"
              />

              {/* Exact subtle physical accordion pleat lighting (restrained, never flashy) */}
              <div
                className={`fan-pleat-shadow absolute inset-0 pointer-events-none ${
                  isEven
                    ? "bg-gradient-to-tr from-black/50 via-black/20 to-transparent"
                    : "bg-gradient-to-bl from-white/10 via-transparent to-black/40"
                }`}
              />

              {/* Subtle 1px radial fold line along blade edge */}
              <div className="fan-pleat-line absolute inset-0 border-b border-[#111110]/70 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Subtle Cinematic Edge Mask (Active after reveal) */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#111110]/80 via-transparent to-[#111110]/20" />

      {/* Luxury Frame Border (Revealed alongside badge when animation completes - crisp, warm antique gold) */}
      <div className="fan-frame-border absolute inset-0 z-20 pointer-events-none rounded-sm border border-[#B99A65]/50 ring-1 ring-inset ring-[#B99A65]/30 shadow-2xl opacity-0" />

      {/* Top badge (Revealed ONLY alongside completed frame) */}
      {badgeText && (
        <span className="dish-badge absolute top-4 left-4 z-20 bg-[#111110]/85 backdrop-blur-xs px-3 py-1.5 border-l border-[#B99A65] text-[9px] tracking-[0.25em] text-[#B99A65] uppercase font-semibold opacity-0">
          {badgeText}
        </span>
      )}
    </div>
  );
}

export default function SignatureDishes({ dishes, onOpenMenu, menuUrl = "/menu" }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const dishRefs = useRef([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // 1. SECTION HEADER CHOREOGRAPHY
      // ─────────────────────────────────────────────────────────────
      if (headerRef.current) {
        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 92%",
            once: true,
          },
        });

        const kicker = headerRef.current.querySelector(".dishes-kicker");
        const titleLine = headerRef.current.querySelector(".dishes-title-reveal");
        const rule = headerRef.current.querySelector(".dishes-rule");
        const desc = headerRef.current.querySelector(".dishes-desc");

        headerTl
          .fromTo(kicker, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: MOTION.ease.luxury })
          .fromTo(titleLine, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.75, ease: MOTION.ease.luxury }, "-=0.2")
          .fromTo(rule, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.55, ease: MOTION.ease.cinematic }, "-=0.35")
          .fromTo(desc, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease: MOTION.ease.luxury }, "-=0.3");
      }

      // ─────────────────────────────────────────────────────────────
      // 2. INDIVIDUAL DISH TYPOGRAPHY CHOREOGRAPHY
      // ─────────────────────────────────────────────────────────────
      dishRefs.current.forEach((dishEl) => {
        if (!dishEl) return;

        const nameReveal = dishEl.querySelector(".dish-name-reveal");
        const dishKicker = dishEl.querySelector(".dish-kicker");
        const dishRule = dishEl.querySelector(".dish-rule");
        const dishDesc = dishEl.querySelector(".dish-desc");
        const dishTags = dishEl.querySelector(".dish-tags");
        const dishFooter = dishEl.querySelector(".dish-footer");

        const dishTl = gsap.timeline({
          scrollTrigger: {
            trigger: dishEl,
            start: "top 55%", // Triggers naturally when dish is centered in full view (Image 2), never when cut off
            once: true,
          },
        });

        // Dish Number & Subtitle
        if (dishKicker) {
          dishTl.fromTo(
            dishKicker,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.45, ease: MOTION.ease.luxury }
          );
        }

        // Dish Name Masked Reveal
        if (nameReveal) {
          dishTl.fromTo(
            nameReveal,
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.75, ease: MOTION.ease.luxury },
            "-=0.2"
          );
        }

        // Dish Gold Rule
        if (dishRule) {
          dishTl.fromTo(
            dishRule,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.5, ease: MOTION.ease.cinematic },
            "-=0.35"
          );
        }

        // Dish Description & Tags
        if (dishDesc) {
          dishTl.fromTo(
            dishDesc,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, ease: MOTION.ease.luxury },
            "-=0.3"
          );
        }

        if (dishTags) {
          dishTl.fromTo(
            dishTags,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.45, ease: MOTION.ease.luxury },
            "-=0.3"
          );
        }

        // Footer Row
        if (dishFooter) {
          dishTl.fromTo(
            dishFooter,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: MOTION.ease.luxury },
            "-=0.25"
          );
        }
      });

      // ─────────────────────────────────────────────────────────────
      // 3. TERMINAL INVITATION CHOREOGRAPHY
      // ─────────────────────────────────────────────────────────────
      if (terminalRef.current) {
        const terminalTl = gsap.timeline({
          scrollTrigger: {
            trigger: terminalRef.current,
            start: "top 88%",
            end: "bottom top",
            once: true,
          },
        });

        terminalTl.fromTo(
          terminalRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: MOTION.ease.luxury,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [dishes]);

  if (!dishes || dishes.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      id="creations"
      className="relative w-full bg-[#111110] text-[#EAE3D7] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#24221F]/60"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 -left-32 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full blur-[140px] opacity-15"
        style={{
          background: "radial-gradient(circle, #B99A65 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Section Header */}
        <div ref={headerRef} className="max-w-2xl mb-16 sm:mb-24 lg:mb-32">
          <div className="dishes-kicker flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#B99A65]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B99A65] font-medium uppercase">
              02 / CURATED CREATIONS
            </span>
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[0.03em] text-[#EAE3D7] leading-[1.08] uppercase">
            <span className="block overflow-hidden py-1">
              <span className="block dishes-title-reveal">SIGNATURE DISHES</span>
            </span>
          </h2>

          <div className="dishes-rule w-24 sm:w-36 h-[1.5px] bg-[#B99A65] my-6 sm:my-8 opacity-85" />

          <p className="dishes-desc text-sm sm:text-base lg:text-lg text-[#EAE3D7]/80 font-body font-light leading-relaxed">
            A seasonal anthology honoring deep oceanic harvests and the ancestral precision of binchotan fire.
          </p>
        </div>

        {/* Dish Feature Showcase: Alternating Asymmetric Editorial Grid */}
        <div className="space-y-24 sm:space-y-36 lg:space-y-44">
          {dishes.map((dish, idx) => {
            const isEven = idx % 2 === 0;
            // Dish 01 & 03: Photo on left -> pivot="bottom-right" (fans from vertical right edge to left)
            // Dish 02: Photo on right -> pivot="bottom-left" (fans from vertical left edge to right)
            const pivot = isEven ? "bottom-right" : "bottom-left";

            return (
              <div
                key={dish.id}
                ref={(el) => (dishRefs.current[idx] = el)}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center group"
              >
                {/* Visual Frame: Mechanical Abanico Fan Reveal */}
                <div
                  className={`relative w-full ${
                    isEven ? "lg:col-span-7 lg:order-1" : "lg:col-span-7 lg:order-2"
                  }`}
                >
                  <FanRevealImage
                    src={dish.image}
                    alt={dish.imageAlt || dish.name}
                    badgeText={dish.badge}
                    pivot={pivot}
                  />
                </div>

                {/* Typographic Story (5 Cols) */}
                <div
                  className={`flex flex-col justify-center ${
                    isEven ? "lg:col-span-5 lg:order-2" : "lg:col-span-5 lg:order-1"
                  } max-w-xl`}
                >
                  {/* Dish Number & Category */}
                  <div className="dish-kicker flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.3em] text-[#B99A65] font-semibold uppercase">
                      NO. {dish.number}
                    </span>
                    <span className="w-4 h-[1px] bg-[#776B5D]" />
                    <span className="text-[10px] tracking-[0.25em] text-[#776B5D] uppercase font-medium">
                      {dish.subtitle}
                    </span>
                  </div>

                  {/* Dish Name: Cormorant Garamond with Masked Reveal */}
                  <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.03em] text-[#EAE3D7] leading-[1.1] uppercase mt-1">
                    <span className="block overflow-hidden py-1">
                      <span className="block dish-name-reveal">{dish.name}</span>
                    </span>
                  </h3>

                  {/* Delicate Gold Rule */}
                  <div className="dish-rule w-16 sm:w-20 h-[1px] bg-[#B99A65]/70 my-5" />

                  {/* Minimalist Ingredients & Culinary Narrative */}
                  <p className="dish-desc text-sm sm:text-base text-[#EAE3D7]/85 font-body font-light leading-relaxed mb-6">
                    {dish.description}
                  </p>

                  {/* Dietary & Heritage Tags */}
                  {dish.tags && dish.tags.length > 0 && (
                    <div className="dish-tags flex flex-wrap items-center gap-2 mb-8">
                      {dish.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.2em] text-[#776B5D] uppercase px-3 py-1 border border-[#24221F] rounded-xs bg-[#111110]/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Price & Interaction */}
                  <div className="dish-footer flex items-center justify-between pt-6 border-t border-[#24221F]">
                    <div>
                      <span className="block text-[9px] tracking-[0.25em] text-[#776B5D] uppercase">
                        Course Investment
                      </span>
                      <span className="font-heading text-2xl sm:text-3xl text-[#B99A65] tracking-wide font-normal">
                        ${dish.price}
                      </span>
                    </div>

                    <a
                      href={menuUrl}
                      onClick={onOpenMenu}
                      className="group/btn inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#EAE3D7] hover:text-[#B99A65] uppercase font-medium transition-colors"
                    >
                      <span>View in Menu</span>
                      <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminal Section Invitation: Direct Link to Digital Menu */}
        <div
          ref={terminalRef}
          className="mt-28 sm:mt-36 lg:mt-44 p-10 sm:p-14 lg:p-16 border border-[#24221F] bg-gradient-to-b from-[#24221F]/40 to-[#111110] rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl"
        >
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[10px] tracking-[0.25em] text-[#B99A65] uppercase font-medium">
              <span>✦</span>
              <span>Delicious Dining & Drinks</span>
            </div>
            <h4 className="font-heading text-2xl sm:text-3xl text-[#EAE3D7] uppercase tracking-wide">
              Explore Our Complete Menu
            </h4>
            <p className="text-xs sm:text-sm text-[#776B5D] font-light leading-relaxed">
              Browse our freshly prepared dishes, signature specialties, refreshing drinks, and desserts.
            </p>
          </div>

          <a
            href={menuUrl}
            onClick={onOpenMenu}
            className="group inline-flex items-center gap-3 bg-[#B99A65] text-[#111110] px-8 py-4 rounded-sm text-xs tracking-[0.25em] font-semibold uppercase hover:bg-[#c9aa73] transition-all duration-300 shadow-lg hover:shadow-[#B99A65]/20 active:scale-95 shrink-0"
          >
            <FaQrcode className="text-xs" />
            <span>VIEW DIGITAL MENU</span>
            <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
