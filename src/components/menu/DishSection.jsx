"use client";

import React from "react";
import DishCard from "./DishCard";

export default function DishSection({ category, dishes }) {
  if (!dishes || dishes.length === 0) return null;

  return (
    <section
      id={`category-${category.id}`}
      data-category-id={category.id}
      className="menu-category-section scroll-mt-28 pt-2 sm:pt-4 pb-8 sm:pb-12"
    >
      {/* Category Header with La Lumière Ornate Diamond Flourish */}
      <div className="text-center mb-4 sm:mb-6">
        <div className="inline-flex items-center justify-center gap-3">
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#B99A65]/70" />
          <span className="text-[#B99A65] text-xs select-none">❖</span>
          <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-normal tracking-[0.2em] text-[#EAE3D7] uppercase">
            {category.name}
          </h3>
          <span className="text-[#B99A65] text-xs select-none">❖</span>
          <span className="w-8 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#B99A65]/70" />
        </div>

        {category.subtitle && (
          <p className="text-xs sm:text-[13px] text-[#776B5D] font-light mt-1.5 tracking-wide italic">
            {category.subtitle}
          </p>
        )}
      </div>

      {/* Dish Grid: 1 column on mobile, 2 EQUAL COLUMNS on tablet/desktop (matching La Lumière desktop reference) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  );
}
