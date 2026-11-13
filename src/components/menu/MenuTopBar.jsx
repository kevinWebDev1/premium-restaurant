"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import BrandEmblem from "@/components/BrandEmblem";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { LuUtensils } from "react-icons/lu";

export default function MenuTopBar({
  categories = [],
  activeCategory,
  onSelectCategory,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
}) {
  const { tableNumber, setIsTableModalOpen, restaurant } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Two-line luxury brand lockup (Option 3): splits long names cleanly
  const brandName = restaurant?.name || "NAMI";
  const brandLockup = useMemo(() => {
    if (restaurant?.brandLockup) {
      return restaurant.brandLockup;
    }
    const cleaned = String(brandName).trim();
    const words = cleaned.split(/\s+/);
    if (words.length === 1) {
      return { top: words[0], sub: "GASTRONOMY" };
    }
    if (words.length === 2) {
      return { top: words[0], sub: words[1] };
    }
    // Smart split for names ending with compound suffixes like "BAKERY & CAFE" or "BAR & GRILL"
    if (words.length >= 4 && words[words.length - 2] === "&") {
      const sub = words.slice(-3).join(" ");
      const top = words.slice(0, -3).join(" ");
      return { top, sub };
    }
    const sub = words.slice(-1)[0];
    const top = words.slice(0, -1).join(" ");
    return { top, sub };
  }, [brandName, restaurant?.brandLockup]);

  // Short category names for clean top bar wings
  const getShortName = (cat) => {
    switch (cat.id) {
      case "raw-bar":
        return "RAW BAR";
      case "hearth-mains":
        return "HEARTH & MAINS";
      case "harvest-sides":
        return "SIDES";
      case "desserts":
        return "DESSERTS";
      case "cellar-drinks":
        return "CELLAR";
      default:
        return cat.name?.toUpperCase() || "";
    }
  };

  // Split categories for desktop centered logo wings
  const leftCategories = categories.slice(0, 2);
  const rightCategories = categories.slice(2);

  const handleCategoryClick = (catId) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    setIsDrawerOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#111110]/95 backdrop-blur-md border-b border-[#242622]/80 transition-all">
        {/* ─────────────────────────────────────────────────────────────
            1. MOBILE HEADER (< 768px): Exact Reference Layout
            [Logo NAMI]        [Menù —❖—]        [🔍 Search] [≡ Circle]
           ───────────────────────────────────────────────────────────── */}
        <div className="flex md:hidden relative items-center justify-between px-4 h-16 w-full">
          {/* Mobile Left: Brand Emblem + 2-line Stacked Lockup (Option 3) */}
          <Link
            href={restaurant?.homeUrl || (restaurant?.slug ? `/${restaurant.slug}` : "/")}
            className="flex items-center gap-2 group shrink-0 max-w-[135px] z-10"
          >
            <BrandEmblem
              size={26}
              className="transition-transform duration-500 group-hover:rotate-45 shrink-0"
            />
            <div className="flex flex-col text-left min-w-0">
              <span className="font-heading text-xs sm:text-sm tracking-[0.12em] text-[#EAE3D7] font-semibold leading-tight truncate">
                {brandLockup.top}
              </span>
              <span className="text-[7.5px] tracking-[0.22em] text-[#B99A65] uppercase font-medium leading-none mt-0.5 truncate">
                {brandLockup.sub}
              </span>
            </div>
          </Link>

          {/* Mobile Center: TRUE 50% MATHEMATICAL VIEWPORT CENTER */}
          <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center justify-center pointer-events-none">
            <h1 className="font-heading text-xl font-normal tracking-[0.12em] text-[#EAE3D7] leading-none">
              Menù
            </h1>
            <div className="flex items-center gap-1.5 mt-0.5 text-[#B99A65]">
              <span className="w-3 h-[1px] bg-gradient-to-r from-transparent to-[#B99A65]/80" />
              <span className="text-[7px] select-none leading-none">❖</span>
              <span className="w-3 h-[1px] bg-gradient-to-l from-transparent to-[#B99A65]/80" />
            </div>
          </div>

          {/* Mobile Right: Search Icon + Circular Hamburger Button */}
          <div className="flex items-center gap-2 shrink-0 z-10">
            {/* Search Toggle Icon */}
            <button
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                if (isSearchOpen) setSearchQuery("");
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors border ${
                isSearchOpen
                  ? "bg-[#B99A65] text-[#111110] border-[#B99A65]"
                  : "bg-[#181917] border-[#242622] text-[#B99A65] hover:border-[#B99A65]/60"
              }`}
              aria-label="Toggle Search"
            >
              {isSearchOpen ? (
                <FaXmark className="w-3.5 h-3.5" />
              ) : (
                <FaMagnifyingGlass className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Circular Hamburger Button matching user reference */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="w-9 h-9 rounded-full border border-[#B99A65]/60 hover:border-[#B99A65] bg-[#181917] flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <span className="w-3.5 h-[1.5px] bg-[#B99A65] rounded-full" />
              <span className="w-3.5 h-[1.5px] bg-[#B99A65] rounded-full" />
              <span className="w-3.5 h-[1.5px] bg-[#B99A65] rounded-full" />
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. DESKTOP HEADER (>= 768px): La Lumière Centered Luxury
            Left Wing: [RAW BAR] [HEARTH] | True Center: [❖ NAMI] | Right Wing: [SIDES] [DESSERTS] [CELLAR] | [Table 07] [🔍]
           ───────────────────────────────────────────────────────────── */}
        <div className="hidden md:flex relative items-center justify-between px-6 lg:px-10 h-20 max-w-7xl mx-auto w-full">
          {/* Left Wing Categories */}
          <div className="flex items-center gap-4 lg:gap-8 text-xs tracking-[0.2em] uppercase font-medium">
            {leftCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`relative py-1.5 transition-colors select-none ${
                    isActive
                      ? "text-[#B99A65] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B99A65]"
                      : "text-[#776B5D] hover:text-[#EAE3D7]"
                  }`}
                >
                  {getShortName(cat)}
                </button>
              );
            })}
          </div>

          {/* Absolute True Center Brand Logo (Option 3 Two-Line Lockup) */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
            <Link
              href={restaurant?.homeUrl || (restaurant?.slug ? `/${restaurant.slug}` : "/")}
              className="flex items-center gap-3 group shrink-0"
            >
              <BrandEmblem
                size={32}
                className="transition-transform duration-700 group-hover:rotate-45 shrink-0"
              />
              <div className="flex flex-col text-left">
                <span className="font-heading text-base lg:text-lg tracking-[0.16em] text-[#EAE3D7] font-semibold leading-tight group-hover:text-[#B99A65] transition-colors whitespace-nowrap">
                  {brandLockup.top}
                </span>
                <span className="text-[8.5px] tracking-[0.28em] text-[#B99A65] uppercase font-medium leading-none mt-0.5 whitespace-nowrap">
                  {brandLockup.sub}
                </span>
              </div>
            </Link>
          </div>

          {/* Right Group: Right Wing Categories + Table Selector + Search */}
          <div className="flex items-center gap-4 lg:gap-7">
            {/* Right Wing Categories */}
            <div className="flex items-center gap-4 lg:gap-7 text-xs tracking-[0.2em] uppercase font-medium">
              {rightCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`relative py-1.5 transition-colors select-none ${
                      isActive
                        ? "text-[#B99A65] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#B99A65]"
                        : "text-[#776B5D] hover:text-[#EAE3D7]"
                    }`}
                  >
                    {getShortName(cat)}
                  </button>
                );
              })}
            </div>

            {/* Divider */}
            <span className="h-4 w-[1px] bg-[#242622]" />

            {/* Table Selector Pill */}
            <button
              onClick={() => setIsTableModalOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs transition-all border ${
                tableNumber
                  ? "bg-[#B99A65]/15 border-[#B99A65]/50 text-[#B99A65] hover:bg-[#B99A65]/25 font-semibold"
                  : "bg-[#181917] border-[#242622] text-[#776B5D] hover:border-[#B99A65]/40 hover:text-[#EAE3D7]"
              }`}
              title="Change Dining Table"
            >
              <LuUtensils className="w-3.5 h-3.5 text-[#B99A65]" />
              <span className="font-medium tracking-wide">
                {tableNumber ? `Table ${tableNumber}` : "Set Table"}
              </span>
            </button>

            {/* Search Toggle Button */}
            <button
              onClick={() => {
                setIsSearchOpen((prev) => !prev);
                if (isSearchOpen) setSearchQuery("");
              }}
              className={`p-2.5 rounded-full transition-colors border ${
                isSearchOpen
                  ? "bg-[#B99A65] text-[#111110] border-[#B99A65]"
                  : "bg-[#181917] border-[#242622] text-[#776B5D] hover:text-[#EAE3D7] hover:border-[#B99A65]/40"
              }`}
              aria-label="Toggle Menu Search"
            >
              {isSearchOpen ? (
                <FaXmark className="w-3.5 h-3.5" />
              ) : (
                <FaMagnifyingGlass className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. EXPANDABLE SEARCH FIELD (Works on both mobile & desktop)
           ───────────────────────────────────────────────────────────── */}
        {isSearchOpen && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-4 pt-1 border-t border-[#242622]/60 animate-fade-in">
            <div className="relative max-w-xl mx-auto">
              <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#776B5D]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search dishes, ingredients, or allergens..."
                className="w-full bg-[#181917] border border-[#B99A65]/40 focus:border-[#B99A65] text-xs text-[#EAE3D7] pl-10 pr-9 py-2.5 rounded-sm outline-none placeholder-[#776B5D]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#776B5D] hover:text-[#EAE3D7]"
                >
                  <FaXmark className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ─────────────────────────────────────────────────────────────
          4. MOBILE SLIDE-OVER DRAWER (Tapped from Circular Hamburger)
         ───────────────────────────────────────────────────────────── */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end md:hidden">
          {/* Backdrop Blur Overlay */}
          <div
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-fade-in"
          />

          {/* Drawer Container */}
          <aside className="relative z-10 w-full max-w-[320px] h-full bg-[#141513] border-l border-[#242622] p-6 flex flex-col justify-between overflow-y-auto no-scrollbar shadow-2xl animate-slide-left">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-5 border-b border-[#242622]">
                <div className="flex items-center gap-2.5">
                  <BrandEmblem size={26} />
                  <span className="font-heading text-lg tracking-[0.24em] text-[#EAE3D7] font-semibold">
                    {restaurant?.name || "NAMI"}
                  </span>
                </div>

                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="w-8 h-8 rounded-full border border-[#B99A65]/60 flex items-center justify-center text-[#B99A65] hover:bg-[#B99A65]/10 active:scale-95 transition-all"
                  aria-label="Close Navigation"
                >
                  <FaXmark className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Seated Table Card */}
              <div className="mt-5 p-3.5 rounded-xl bg-[#181917] border border-[#242622] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#B99A65]/15 border border-[#B99A65]/40 flex items-center justify-center text-[#B99A65]">
                    <LuUtensils className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#776B5D] block">
                      Dining Table
                    </span>
                    <span className="font-heading text-base text-[#EAE3D7] font-medium">
                      {tableNumber ? `Table ${tableNumber}` : "Not Assigned"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsTableModalOpen(true);
                  }}
                  className="text-xs text-[#B99A65] hover:underline font-semibold"
                >
                  Change
                </button>
              </div>

              {/* Menu Categories Index */}
              <div className="mt-6">
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#776B5D] font-semibold block mb-3">
                  Menu Courses
                </span>

                <div className="space-y-1">
                  {categories.map((cat, idx) => {
                    const isActive = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs tracking-[0.16em] uppercase font-medium transition-all ${
                          isActive
                            ? "bg-[#B99A65]/15 text-[#B99A65] border border-[#B99A65]/40 font-semibold"
                            : "text-[#EAE3D7]/85 hover:bg-[#181917] hover:text-[#EAE3D7]"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-[10px] text-[#776B5D]">
                            0{idx + 1}
                          </span>
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#111110] text-[#776B5D]">
                          {cat.items?.length || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 mt-6 border-t border-[#242622] space-y-3">
              <Link
                href={restaurant?.homeUrl || (restaurant?.slug ? `/${restaurant.slug}` : "/")}
                className="w-full py-2.5 px-3 rounded-lg border border-[#242622] text-xs text-[#776B5D] hover:text-[#B99A65] hover:border-[#B99A65]/40 flex items-center justify-center gap-2 tracking-[0.18em] uppercase transition-colors"
              >
                <span>←</span>
                <span>Exit to Main Site</span>
              </Link>

              <p className="text-[9px] text-[#555047] text-center tracking-wider">
                {restaurant?.name || "NAMI"} Fine Dining · Digital Order System
              </p>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
