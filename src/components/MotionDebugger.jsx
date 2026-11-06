"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaPlay,
  FaPause,
  FaSliders,
  FaArrowRotateRight,
  FaFan,
  FaChevronLeft,
  FaChevronRight,
  FaGaugeHigh,
} from "react-icons/fa6";
import {
  getFanBladeData,
  activeFanTimelines,
  pauseAllFanTimelines,
  playAllFanTimelines,
  seekAllFanTimelines,
  setAllFanTimeScale,
  MOTION,
} from "@/utils/motion";

export default function MotionDebugger() {
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1.0); // 1.0 = Normal, 0.4 = Slow-mo
  const [markersOn, setMarkersOn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Keyboard shortcut: Spacebar toggles Freeze / Play
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused]);

  // Sync timeline progress to slider
  useEffect(() => {
    const interval = setInterval(() => {
      // Grab first active timeline
      const activeTl = Array.from(activeFanTimelines)[0];
      if (activeTl) {
        setProgress(Math.round(activeTl.progress() * 100) / 100);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const togglePlayPause = () => {
    if (isPaused) {
      playAllFanTimelines();
      setIsPaused(false);
    } else {
      pauseAllFanTimelines();
      setIsPaused(true);
    }
  };

  const handleScrub = (val) => {
    const num = parseFloat(val);
    setProgress(num);
    setIsPaused(true);
    seekAllFanTimelines(num);
  };

  const stepProgress = (delta) => {
    const next = Math.max(0, Math.min(1, Math.round((progress + delta) * 100) / 100));
    handleScrub(next);
  };

  const toggleSpeed = () => {
    const nextSpeed = speed === 1.0 ? 0.4 : 1.0;
    setSpeed(nextSpeed);
    setAllFanTimeScale(nextSpeed);
  };

  const toggleMarkers = () => {
    const nextState = !markersOn;
    setMarkersOn(nextState);
    if (typeof window !== "undefined") {
      ScrollTrigger.getAll().forEach((st) => {
        st.vars.markers = nextState;
      });
      ScrollTrigger.refresh();
    }
  };

  const replayAbanicoFan = () => {
    document.querySelector("#creations")?.scrollIntoView({ behavior: "smooth" });
    setIsPaused(false);

    setTimeout(() => {
      const stages = document.querySelectorAll(".fan-stage");
      activeFanTimelines.clear();

      stages.forEach((stage) => {
        const pivot = stage.getAttribute("data-pivot") || "bottom-right";
        const blades = stage.querySelectorAll(".fan-blade");
        const pleatShadows = stage.querySelectorAll(".fan-pleat-shadow");
        const pleatLines = stage.querySelectorAll(".fan-pleat-line");
        const baseImage = stage.querySelector(".fan-base-image");
        const badge = stage.querySelector(".dish-badge");
        const frameBorder = stage.querySelector(".fan-frame-border");

        // 1. Reset all elements to clean starting state:
        // Pure dark canvas (#111110), zero borders, zero lone blades
        blades.forEach((blade) => {
          gsap.set(blade, {
            autoAlpha: 0,
            rotation: 0,
            clearProps: "transform",
          });
        });

        if (pleatShadows.length) gsap.set(pleatShadows, { autoAlpha: 0.75 });
        if (pleatLines.length) gsap.set(pleatLines, { autoAlpha: 0.75 });
        gsap.set(baseImage, { autoAlpha: 0 });
        if (frameBorder) gsap.set(frameBorder, { autoAlpha: 0 });
        if (badge) gsap.set(badge, { autoAlpha: 0, y: 10 });

        // 2. Build controlled GSAP timeline synchronized to 1.80s text reveal
        const tl = gsap.timeline({
          onUpdate: () => {
            setProgress(Math.round(tl.progress() * 100) / 100);
          },
          onComplete: () => {
            setIsPaused(true);
          },
        });

        tl.timeScale(speed);
        activeFanTimelines.add(tl);

        const staggerDelay = 0.10;
        const bladeRevealDuration = 0.45;

        blades.forEach((blade, i) => {
          const sweepArrival = i * staggerDelay;
          tl.to(
            blade,
            {
              autoAlpha: 1,
              duration: bladeRevealDuration,
              ease: "power2.out",
            },
            sweepArrival
          );

          // Subtle physical pleat shading dissolves behind the sweep wave
          if (pleatShadows[i]) {
            tl.to(
              pleatShadows[i],
              {
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.out",
              },
              sweepArrival + 0.22
            );
          }
          if (pleatLines[i]) {
            tl.to(
              pleatLines[i],
              {
                autoAlpha: 0,
                duration: 0.4,
                ease: "power2.out",
              },
              sweepArrival + 0.22
            );
          }
        });

        // Savor the fully illuminated dish before locking into Image 4
        const totalSweepTime = (blades.length - 1) * staggerDelay + bladeRevealDuration;
        const lockTime = totalSweepTime + 0.08;

        // Transition to Image 4
        tl.to(baseImage, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, lockTime);

        // Frame border and badge lock into place at ~1.80s alongside text
        if (frameBorder) {
          tl.to(frameBorder, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, lockTime);
        }
        if (badge) {
          tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, lockTime + 0.02);
        }
      });
    }, 450);
  };

  const replayHero = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(".hero-line-reveal", { yPercent: 110, opacity: 0 });
      gsap.set("header + div div div:nth-child(3)", { scaleX: 0 });

      heroTl
        .to(".hero-line-reveal", {
          yPercent: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          "header + div div div:nth-child(3)",
          { scaleX: 1, duration: 0.55, ease: "power4.out" },
          "-=0.4"
        );
    }, 300);
  };

  const replayStory = () => {
    document.querySelector("#story")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const storyTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      gsap.set(".story-line-reveal", { yPercent: 110, opacity: 0 });
      gsap.set("#story h2 + div", { scaleX: 0 });

      storyTl
        .to(".story-line-reveal", {
          yPercent: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
        })
        .to(
          "#story h2 + div",
          { scaleX: 1, duration: 0.55, ease: "power4.out" },
          "-=0.3"
        );
    }, 400);
  };

  return (
    <aside
      aria-label="Motion Debugger HUD"
      className="fixed bottom-6 left-6 z-50 flex flex-col bg-[#141413]/95 backdrop-blur-md border border-[#B99A65]/40 rounded-sm shadow-2xl text-[10px] text-[#EAE3D7] font-body tracking-wider uppercase overflow-hidden max-w-[95vw] sm:max-w-none"
    >
      {/* Top Action Bar */}
      <div className="flex items-center gap-1.5 p-2 border-b border-[#24221F]">
        {/* HUD Indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1 text-[#B99A65] font-semibold border-r border-[#776B5D]/40">
          <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-[#B99A65] animate-pulse"}`} />
          <span>Motion HUD</span>
        </div>

        {/* FREEZE / PLAY TOGGLE (Primary Button Requested by User) */}
        <button
          onClick={togglePlayPause}
          className={`px-3 py-1.5 rounded-xs transition-all flex items-center gap-1.5 font-bold cursor-pointer shadow-sm ${
            isPaused
              ? "bg-[#B99A65] text-[#111110] hover:bg-[#c9aa73]"
              : "bg-[#24221F] text-[#B99A65] hover:bg-[#B99A65]/20 border border-[#B99A65]/30"
          }`}
          title="Freeze / Resume Fan Animation (or press Spacebar)"
        >
          {isPaused ? <FaPlay className="text-[9px]" /> : <FaPause className="text-[9px]" />}
          <span>{isPaused ? "RESUME" : "FREEZE"}</span>
          <span className="text-[8px] opacity-60 font-mono">[SPACE]</span>
        </button>

        {/* Replay Abanico Fan */}
        <button
          onClick={replayAbanicoFan}
          className="px-2.5 py-1.5 bg-[#B99A65]/15 hover:bg-[#B99A65] hover:text-[#111110] text-[#B99A65] rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer font-medium"
          title="Replay Abanico Fan Sweep from 0%"
        >
          <FaFan className="text-[9px]" />
          <span>Replay Fan</span>
        </button>

        {/* Speed Toggle (1x vs 0.4x Slow-Mo) */}
        <button
          onClick={toggleSpeed}
          className={`px-2.5 py-1.5 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer ${
            speed < 1.0 ? "bg-[#B99A65]/30 text-[#B99A65] border border-[#B99A65]/60" : "hover:bg-[#24221F] text-[#EAE3D7]/70"
          }`}
          title="Toggle Slow Motion (0.4x)"
        >
          <FaGaugeHigh className="text-[9px]" />
          <span>{speed < 1.0 ? "0.4x SLOW" : "1.0x"}</span>
        </button>

        {/* Replay Hero */}
        <button
          onClick={replayHero}
          className="hidden sm:flex px-2 py-1.5 hover:bg-[#24221F] rounded-xs transition-colors items-center gap-1 cursor-pointer text-[#EAE3D7]/70"
          title="Replay Hero Typography Reveal"
        >
          <FaArrowRotateRight className="text-[8px]" />
          <span>Hero</span>
        </button>

        {/* Replay Story */}
        <button
          onClick={replayStory}
          className="hidden sm:flex px-2 py-1.5 hover:bg-[#24221F] rounded-xs transition-colors items-center gap-1 cursor-pointer text-[#EAE3D7]/70"
          title="Replay Story Reveal"
        >
          <FaPlay className="text-[8px]" />
          <span>Story</span>
        </button>

        {/* Toggle Markers */}
        <button
          onClick={toggleMarkers}
          className={`hidden md:flex px-2 py-1.5 rounded-xs transition-colors items-center gap-1 cursor-pointer ${
            markersOn ? "bg-[#B99A65] text-[#111110] font-semibold" : "hover:bg-[#24221F] text-[#EAE3D7]/50"
          }`}
          title="Toggle GSAP ScrollTrigger Markers"
        >
          <FaSliders className="text-[8px]" />
          <span>{markersOn ? "Markers ON" : "Markers"}</span>
        </button>

        {/* Expand / Collapse Scrub Bar */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-1.5 py-1 text-[#776B5D] hover:text-[#EAE3D7] ml-auto cursor-pointer"
          title={isExpanded ? "Collapse Scrubber" : "Expand Scrubber"}
        >
          {isExpanded ? "▼" : "▲"}
        </button>
      </div>

      {/* Scrub & Inspection Tray (Expandable) */}
      {isExpanded && (
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-3 py-2 bg-[#0e0e0d]/80 border-t border-[#24221F]/60">
          {/* Step Back / Forward */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => stepProgress(-0.05)}
              className="px-2 py-1 bg-[#24221F] hover:bg-[#B99A65] hover:text-[#111110] rounded-xs transition-colors cursor-pointer"
              title="Step -5%"
            >
              <FaChevronLeft className="text-[8px]" />
            </button>
            <button
              onClick={() => stepProgress(0.05)}
              className="px-2 py-1 bg-[#24221F] hover:bg-[#B99A65] hover:text-[#111110] rounded-xs transition-colors cursor-pointer"
              title="Step +5%"
            >
              <FaChevronRight className="text-[8px]" />
            </button>
          </div>

          {/* Scrub Slider */}
          <div className="flex items-center gap-2 flex-1 w-full">
            <span className="text-[9px] text-[#776B5D] font-mono">0%</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={progress}
              onChange={(e) => handleScrub(e.target.value)}
              className="flex-1 accent-[#B99A65] h-1.5 bg-[#24221F] rounded-lg cursor-pointer"
            />
            <span className="text-[9px] text-[#776B5D] font-mono">100%</span>
          </div>

          {/* Current Percentage Readout */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 bg-[#24221F] text-[#B99A65] font-mono font-semibold rounded-xs border border-[#B99A65]/20 text-[10px]">
              {Math.round(progress * 100)}%
            </span>

            {/* Quick Presets */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleScrub(0)}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer text-[9px] ${
                  progress === 0 ? "bg-[#B99A65] text-[#111110]" : "bg-[#24221F] hover:text-[#B99A65]"
                }`}
                title="Tucked / Closed State (0%)"
              >
                Closed
              </button>
              <button
                onClick={() => handleScrub(0.5)}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer text-[9px] ${
                  progress === 0.5 ? "bg-[#B99A65] text-[#111110]" : "bg-[#24221F] hover:text-[#B99A65]"
                }`}
                title="Mid-Fan (50%)"
              >
                50%
              </button>
              <button
                onClick={() => handleScrub(1)}
                className={`px-1.5 py-0.5 rounded-xs transition-colors cursor-pointer text-[9px] ${
                  progress === 1 ? "bg-[#B99A65] text-[#111110]" : "bg-[#24221F] hover:text-[#B99A65]"
                }`}
                title="Image 4 (100% Open + Formed Frame)"
              >
                Image 4
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
