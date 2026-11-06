"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOTION, isReducedMotion } from "@/utils/motion";

export default function CulinaryStory({ story }) {
  const sectionRef = useRef(null);
  const kickerRef = useRef(null);
  const dividerRef = useRef(null);
  const bodyRef = useRef(null);
  const quoteRef = useRef(null);
  const imageFrameRef = useRef(null);
  const imageInnerRef = useRef(null);
  const pillarsRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || isReducedMotion()) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // ─────────────────────────────────────────────────────────────
      // TIMELINE 1: Main Editorial Story Choreography (Early Trigger: top 92%)
      // ─────────────────────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 92%",
          once: true,
        },
      });

      // 1. Kicker
      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: MOTION.ease.luxury }
      );

      // 2. Headline: Staggered Masked Line Reveals (Snappy 0.75s)
      tl.fromTo(
        ".story-line-reveal",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: MOTION.ease.luxury,
        },
        "-=0.15"
      );

      // 3. Signature Gold Divider Line Expansion (Fast 0.55s)
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.55, ease: MOTION.ease.cinematic },
        "-=0.3"
      );

      // 4. Narrative Body
      if (bodyRef.current) {
        tl.fromTo(
          bodyRef.current.children,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: MOTION.ease.luxury,
          },
          "-=0.25"
        );
      }

      // 5. Pull Quote
      if (quoteRef.current) {
        tl.fromTo(
          quoteRef.current,
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.65, ease: MOTION.ease.luxury },
          "-=0.3"
        );
      }

      // 6. Framed Visual Reveal (Clip Mask + Settling Scale)
      if (imageFrameRef.current && imageInnerRef.current) {
        tl.fromTo(
          imageFrameRef.current,
          { clipPath: "inset(10% 0% 10% 0%)", opacity: 0 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.85,
            ease: MOTION.ease.luxury,
          },
          "-=0.7"
        );

        tl.fromTo(
          imageInnerRef.current,
          { scale: 1.08 },
          { scale: 1.0, duration: 1.2, ease: "power2.out" },
          "<"
        );
      }

      // ─────────────────────────────────────────────────────────────
      // TIMELINE 2: Sourcing Pillars Staggered Entrance (Early Trigger: top 95%)
      // ─────────────────────────────────────────────────────────────
      if (pillarsRef.current) {
        const pillarsTl = gsap.timeline({
          scrollTrigger: {
            trigger: pillarsRef.current,
            start: "top 95%",
            end: "bottom top",
            once: true,
          },
        });

        pillarsTl.fromTo(
          pillarsRef.current.children,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: MOTION.ease.luxury,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!story) return null;

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative w-full bg-[#111110] text-[#EAE3D7] py-24 sm:py-32 lg:py-40 overflow-hidden border-t border-[#24221F]/60"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/3 -right-32 w-[45vw] h-[45vw] max-w-[650px] max-h-[650px] rounded-full blur-[150px] opacity-15"
        style={{
          background: "radial-gradient(circle, #B99A65 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-20">
        
        {/* Top Editorial Kicker */}
        <div ref={kickerRef} className="flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-8 h-[1px] bg-[#B99A65]" />
          <span className="text-[10px] sm:text-[11px] tracking-[0.3em] text-[#B99A65] font-medium uppercase">
            {story.kicker}
          </span>
        </div>

        {/* Asymmetric 2-Column Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Typographic Philosophy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Primary Headline with Masked Line Reveals */}
            <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-normal tracking-[0.03em] text-[#EAE3D7] leading-[1.08] uppercase">
              <span className="block overflow-hidden py-1">
                <span className="block story-line-reveal">ROOTED IN COASTAL HARVEST,</span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="block story-line-reveal">REFINED BY ARTISANAL FIRE.</span>
              </span>
            </h2>

            {/* Signature Gold Divider Line */}
            <div
              ref={dividerRef}
              className="w-24 sm:w-36 h-[1.5px] bg-[#B99A65] my-6 sm:my-8 opacity-85"
            />

            {/* Narrative Body */}
            <div
              ref={bodyRef}
              className="space-y-6 text-[#EAE3D7]/85 font-body font-light text-base sm:text-lg leading-relaxed max-w-2xl"
            >
              {story.paragraphs.map((p, idx) => (
                <p key={idx} className="drop-shadow-xs">
                  {p}
                </p>
              ))}
            </div>

            {/* Editorial Pull Quote */}
            <div
              ref={quoteRef}
              className="mt-10 sm:mt-12 pl-6 border-l-2 border-[#B99A65]/50 py-2 max-w-xl"
            >
              <p className="font-heading italic text-xl sm:text-2xl text-[#EAE3D7] leading-relaxed">
                {story.quote}
              </p>
              <p className="mt-4 text-[10px] sm:text-[11px] tracking-[0.25em] text-[#B99A65] uppercase font-semibold">
                {story.author}
              </p>
            </div>
          </div>

          {/* Right Column: Framed Editorial Visual (5 Cols) */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center lg:justify-end">
            <div
              ref={imageFrameRef}
              className="relative w-full max-w-[480px] aspect-[3/4] rounded-sm overflow-hidden group shadow-2xl"
            >
              {/* Backlight halo */}
              <div
                className="absolute inset-0 rounded-sm opacity-25 blur-xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, #B99A65 0%, #111110 80%)",
                }}
              />

              {/* Main Image */}
              <div ref={imageInnerRef} className="relative w-full h-full">
                <Image
                  src={story.image}
                  alt={story.imageAlt}
                  fill
                  className="object-cover object-center transform transition-transform duration-1000 ease-out group-hover:scale-103"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>

              {/* Seamless Dark Edge Gradients */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#111110] via-transparent to-[#111110]/30" />
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-[#B99A65]/25 rounded-sm" />

              {/* Discreet Caption */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none bg-[#111110]/85 backdrop-blur-xs px-3 py-1.5 border-l border-[#B99A65] text-[10px] tracking-[0.2em] text-[#EAE3D7]/80 uppercase">
                Artisanal Plating Detail
              </div>
            </div>
          </div>

        </div>

        {/* 3-Pillar Sourcing Grid */}
        <div
          ref={pillarsRef}
          className="mt-20 sm:mt-28 lg:mt-36 pt-12 border-t border-[#24221F] grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14"
        >
          {story.pillars.map((pillar) => (
            <div key={pillar.roman} className="space-y-3 group">
              <span className="font-heading text-xl sm:text-2xl text-[#B99A65] font-normal tracking-wider block transition-transform group-hover:translate-x-1 duration-300">
                {pillar.roman}
              </span>
              <h3 className="font-heading text-lg sm:text-xl text-[#EAE3D7] tracking-[0.1em] uppercase font-medium">
                {pillar.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#776B5D] leading-relaxed font-light">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
