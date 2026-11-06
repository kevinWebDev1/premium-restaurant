import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins safely on client
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic Motion Language Tokens
 * Calibrated for high-end Michelin dining aesthetic
 */
export const MOTION = {
  ease: {
    luxury: "power3.out",
    cinematic: "power4.out",
    smooth: "power2.out",
    mask: "expo.out",
    fan: "power2.out", // Silky deceleration wave across the radial arc
  },
  duration: {
    fast: 0.2,
    ui: 0.35,
    editorial: 0.55,
    cinematic: 0.65,
    fan: 0.8, // Ultra-fast, high-energy 2x speed sweep
  },
  stagger: {
    lines: 0.05,
    cards: 0.08,
    pillars: 0.05,
    fanBlades: 0.022, // Rapid-fire fluid cascade
  },
};

export const isReducedMotion = () => {
  return false;
};

// Global timeline registry for the live Motion Debugger (Pause/Play/Scrub)
export const activeFanTimelines = new Set();
export const fanStageElements = new Set();

/**
 * Computes radial wedge polygon starting from the SHORT vertical edge (blue starting strip)
 * and fanning outward across the card to the long edge.
 * 
 * - If pivot === 'bottom-right' (Dish 01 & 03):
 *   Origin at (100%, 100%).
 *   Starts from the vertical RIGHT edge (short height) and sweeps counter-clockwise toward left.
 *   Initial rotation is +(index + 1) * stepAngle so ALL blades start tucked identically outside the frame.
 * 
 * - If pivot === 'bottom-left' (Dish 02):
 *   Origin at (0%, 100%).
 *   Starts from the vertical LEFT edge (short height) and sweeps clockwise toward right.
 *   Initial rotation is -(index + 1) * stepAngle so ALL blades start tucked identically.
 */
export function getFanBladeData(index, totalBlades = 12, pivot = "bottom-right") {
  const stepAngle = 90 / totalBlades; // 7.5° for 12 blades
  const overlap = index < totalBlades - 1 ? 0.45 : 0; // Sub-pixel overlap to prevent seams

  const startDeg = index * stepAngle;
  const endDeg = (index + 1) * stepAngle + overlap;

  const toRad = (deg) => (deg * Math.PI) / 180;
  const radius = 260; // Guarantees polygon reaches far past the diagonal corner

  let x1, y1, x2, y2, origin;

  if (pivot === "bottom-right") {
    origin = "100% 100%";
    x1 = 100 - radius * Math.sin(toRad(startDeg));
    y1 = 100 - radius * Math.cos(toRad(startDeg));
    x2 = 100 - radius * Math.sin(toRad(endDeg));
    y2 = 100 - radius * Math.cos(toRad(endDeg));
  } else {
    origin = "0% 100%";
    x1 = 0 + radius * Math.sin(toRad(startDeg));
    y1 = 100 - radius * Math.cos(toRad(startDeg));
    x2 = 0 + radius * Math.sin(toRad(endDeg));
    y2 = 100 - radius * Math.cos(toRad(endDeg));
  }

  return {
    origin,
    clipPath: `polygon(${origin}, ${x1.toFixed(2)}% ${y1.toFixed(2)}%, ${x2.toFixed(2)}% ${y2.toFixed(2)}%)`,
  };
}

/**
 * Choreographs the Synchronized Dynamic Pleat Sweep:
 * - Exact Restrained Physical Pleat Shading: Uses the original subtle dark vignette and faint ambient highlight
 *   (restrained, elegant, never flashy or overly eye-catchy).
 * - Dynamic Dissolution: The pleat shading and fold lines are present as the blade reveals,
 *   then smoothly dissolve away behind the sweep so NO static milky white overlays stay forever.
 * - Choreographic Synchronization: Total sweep timing is calibrated to 1.80s, completing in exact
 *   rhythmic unison with the typographic story reveal on the right.
 */
export function animateFanReveal(stageEl, options = {}) {
  if (!stageEl || typeof window === "undefined") return;

  const pivot = options.pivot || stageEl.getAttribute("data-pivot") || "bottom-right";
  const blades = stageEl.querySelectorAll(".fan-blade");
  const pleatShadows = stageEl.querySelectorAll(".fan-pleat-shadow");
  const pleatLines = stageEl.querySelectorAll(".fan-pleat-line");
  const baseImage = stageEl.querySelector(".fan-base-image");
  const badge = stageEl.querySelector(".dish-badge");
  const frameBorder = stageEl.querySelector(".fan-frame-border");

  fanStageElements.add(stageEl);

  // Initial State: Pure dark obsidian canvas (#111110)
  // Zero borders, zero lone blades beforehand
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

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: stageEl,
      start: options.start || "top 55%", // Triggers naturally when dish is centered in full view (Image 2)
      toggleActions: "play none none none",
      once: true,
    },
  });

  activeFanTimelines.add(tl);
  stageEl._fanTimeline = tl;

  // 1. PROGRESSIVE OPACITY SWEEP WITH DYNAMIC PLEAT DISSOLUTION
  // Calibrated to 1.80s to match text reveal choreography
  const staggerDelay = 0.10;
  const bladeRevealDuration = 0.45;

  blades.forEach((blade, i) => {
    const sweepArrival = i * staggerDelay;

    // As the sweep passes this blade, its opacity increases smoothly from 0 to 1
    tl.to(
      blade,
      {
        autoAlpha: 1,
        duration: bladeRevealDuration,
        ease: "power2.out",
      },
      sweepArrival
    );

    // Dynamic Pleats: Present as the blade unfolds, then smoothly dissolves away
    // behind the sweep wave so the food is left completely clean and natural!
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

  // 2. SYNCHRONIZED FINALE (arrives at ~1.75s - 1.80s with text reveal)
  const totalSweepTime = (blades.length - 1) * staggerDelay + bladeRevealDuration;
  const lockTime = totalSweepTime + 0.08;

  // Seamless crossfade into unclipped base photograph
  tl.to(baseImage, { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, lockTime);

  // Luxury frame border and badge lock into place alongside the "$38" price and CTA button
  if (frameBorder) {
    tl.to(frameBorder, { autoAlpha: 1, duration: 0.35, ease: "power2.out" }, lockTime);
  }
  if (badge) {
    tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, lockTime + 0.02);
  }

  return tl;
}

/**
 * Controller utilities for live debugger (Freeze, Play, Scrub, Speed)
 */
export function pauseAllFanTimelines() {
  activeFanTimelines.forEach((tl) => tl.pause());
}

export function playAllFanTimelines() {
  activeFanTimelines.forEach((tl) => tl.play());
}

export function seekAllFanTimelines(progress) {
  activeFanTimelines.forEach((tl) => {
    tl.pause();
    tl.progress(progress);
  });
}

export function setAllFanTimeScale(scale) {
  activeFanTimelines.forEach((tl) => tl.timeScale(scale));
}
