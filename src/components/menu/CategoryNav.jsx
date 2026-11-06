"use client";

import React, { useEffect, useRef } from "react";

export default function CategoryNav({
  categories = [],
  activeCategory,
  onSelectCategory,
}) {
  const scrollContainerRef = useRef(null);
  const activeBtnRef = useRef(null);

  // Auto-scroll active pill into view on mobile screens
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const btn = activeBtnRef.current;
      const containerWidth = container.offsetWidth;
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;

      container.scrollTo({
        left: btnLeft - containerWidth / 2 + btnWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeCategory]);

  if (!categories || categories.length === 0) return null;

  return (
    <nav
      aria-label="Menu Categories"
      className="sticky top-16 z-30 w-full bg-[#111110]/95 backdrop-blur-md border-b border-[#242622] md:hidden"
    >
      {/* Category Pills Navigation with Horizontal Scroll */}
      <div
        ref={scrollContainerRef}
        className="px-3 py-2.5 flex items-center justify-start overflow-x-auto no-scrollbar scroll-smooth flex-nowrap gap-2"
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          // Short pill label for mobile nav bar
          const shortName =
            cat.id === "raw-bar"
              ? "RAW BAR"
              : cat.id === "hearth-mains"
              ? "HEARTH & MAINS"
              : cat.id === "harvest-sides"
              ? "SIDES & HARVEST"
              : cat.id === "desserts"
              ? "DESSERTS"
              : cat.id === "cellar-drinks"
              ? "CELLAR & DRINKS"
              : cat.name;

          return (
            <button
              key={cat.id}
              ref={isActive ? activeBtnRef : null}
              onClick={() => onSelectCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs tracking-[0.16em] uppercase font-medium transition-all duration-200 select-none shrink-0 relative ${
                isActive
                  ? "text-[#B99A65] font-semibold after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-full after:h-[1.5px] after:bg-[#B99A65]"
                  : "text-[#776B5D] hover:text-[#EAE3D7]"
              }`}
            >
              <span>{shortName}</span>
              <span
                className={`ml-1.5 text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-[#B99A65]/20 text-[#B99A65]"
                    : "bg-[#181917] text-[#776B5D]"
                }`}
              >
                {cat.items?.length || 0}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
