"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useCart } from "@/context/CartContext";
import MenuTopBar from "./MenuTopBar";
import CategoryNav from "./CategoryNav";
import MenuFilterBar from "./MenuFilterBar";
import DishSection from "./DishSection";
import TableModal from "./TableModal";
import FloatingOrderTray from "./FloatingOrderTray";
import OrderReviewSheet from "./OrderReviewSheet";
import MobileBottomNav from "./MobileBottomNav";
import { FaUtensils, FaRotateLeft } from "react-icons/fa6";

export default function MenuClientView() {
  const { restaurant } = useCart();
  const categories = restaurant?.menuCategories || [];

  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.id || "crudos"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const isManualScrolling = useRef(false);

  // 1. Scroll-Spy implementation for Category Sticky Navigation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isManualScrolling.current) return;

      const header = document.querySelector("header");
      const headerH = header ? header.offsetHeight : 80;
      const scrollPos = window.scrollY + headerH + 30;

      const sections = document.querySelectorAll(".menu-category-section");
      let currentCat = categories[0]?.id || "";

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("data-category-id");

        if (scrollPos >= top && scrollPos < top + height) {
          if (id) currentCat = id;
        }
      });

      if (currentCat && currentCat !== activeCategory) {
        setActiveCategory(currentCat);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [categories, activeCategory]);

  // 2. Smooth scrolling to category when clicked (Exact offset so header is never cut)
  const handleSelectCategory = useCallback(
    (catId) => {
      setActiveCategory(catId);
      isManualScrolling.current = true;

      // If selecting the first category, scroll smoothly to the very top to match Image 2
      if (catId === categories[0]?.id) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        setTimeout(() => {
          isManualScrolling.current = false;
        }, 700);
        return;
      }

      const el = document.getElementById(`category-${catId}`);
      if (el) {
        const header = document.querySelector("header");
        const headerH = header ? header.offsetHeight : 80;
        const totalStickyOffset = headerH + 16;

        const targetY =
          el.getBoundingClientRect().top + window.scrollY - totalStickyOffset;

        window.scrollTo({
          top: Math.max(0, targetY),
          behavior: "smooth",
        });

        // Release manual scroll lock after animation
        setTimeout(() => {
          isManualScrolling.current = false;
        }, 700);
      } else {
        isManualScrolling.current = false;
      }
    },
    [categories]
  );

  // 3. Filter and Search Engine
  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return categories
      .map((cat) => {
        const matchingDishes = cat.items.filter((dish) => {
          // Dietary filter
          if (activeFilter === "chef" && !dish.isChefSpecial) return false;
          if (activeFilter === "veg" && !dish.isVegetarian) return false;
          if (activeFilter === "gf" && !dish.isGlutenFree) return false;

          // Search query filter
          if (q) {
            const matchName = dish.name.toLowerCase().includes(q);
            const matchSubtitle = (dish.subtitle || "").toLowerCase().includes(q);
            const matchDesc = (dish.description || "").toLowerCase().includes(q);
            return matchName || matchSubtitle || matchDesc;
          }

          return true;
        });

        return {
          ...cat,
          filteredItems: matchingDishes,
        };
      })
      .filter((cat) => cat.filteredItems.length > 0);
  }, [categories, searchQuery, activeFilter]);

  const totalMatchingDishes = useMemo(() => {
    return filteredCategories.reduce(
      (acc, cat) => acc + cat.filteredItems.length,
      0
    );
  }, [filteredCategories]);

  return (
    <div className="min-h-screen bg-[#111110] text-[#EAE3D7] selection:bg-[#B99A65] selection:text-[#111110]">
      {/* 1. Sticky Top Navigation Bar */}
      <MenuTopBar
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 2. Dietary Filter Chips */}
      <MenuFilterBar
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
      />

      {/* 3. Main Menu Body */}
      <main className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-36 pt-1 sm:pt-3">
        {/* Results Counter if filtering/searching */}
        {(searchQuery || activeFilter !== "all") && (
          <div className="py-2.5 px-3 mb-3 bg-[#181715] border border-[#24221F] rounded-xs flex items-center justify-between text-xs text-[#776B5D]">
            <span>
              Found <strong className="text-[#B99A65]">{totalMatchingDishes}</strong> items
              {searchQuery && ` for "${searchQuery}"`}
            </span>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="text-[#B99A65] hover:underline flex items-center gap-1 font-medium"
            >
              <FaRotateLeft className="w-2.5 h-2.5" />
              Reset filters
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredCategories.length === 0 ? (
          <div className="py-20 text-center text-[#776B5D] space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#181715] border border-[#24221F] flex items-center justify-center text-[#B99A65]">
              <FaUtensils className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-lg text-[#EAE3D7]">
              No dishes found
            </h4>
            <p className="text-xs max-w-xs mx-auto">
              We couldn't find any dishes matching your current search or dietary filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("all");
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B99A65] text-[#111110] font-semibold text-xs rounded-xs"
            >
              <FaRotateLeft className="w-3 h-3" />
              Clear all filters
            </button>
          </div>
        ) : (
          /* Category Sections */
          filteredCategories.map((cat) => (
            <DishSection
              key={cat.id}
              category={cat}
              dishes={cat.filteredItems}
            />
          ))
        )}
      </main>

      {/* 5. Modals, Drawers & Mobile Nav */}
      <TableModal />
      <FloatingOrderTray />
      <OrderReviewSheet />
      <MobileBottomNav />
    </div>
  );
}

