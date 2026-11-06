"use client";

import React from "react";
import { FaStar, FaLeaf } from "react-icons/fa6";
import { LuWheatOff } from "react-icons/lu";

const FILTERS = [
  { id: "all", label: "All Items", icon: null },
  { id: "chef", label: "Chef's Picks", icon: FaStar },
  { id: "veg", label: "Vegetarian", icon: FaLeaf },
  { id: "gf", label: "Gluten-Free", icon: LuWheatOff },
];

export default function MenuFilterBar({ activeFilter, onSelectFilter }) {
  return (
    <div className="max-w-6xl lg:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1 sm:py-3 flex items-center md:justify-center gap-2.5 overflow-x-auto no-scrollbar">
      {FILTERS.map((f) => {
        const isActive = activeFilter === f.id;
        const Icon = f.icon;

        return (
          <button
            key={f.id}
            onClick={() => onSelectFilter(f.id)}
            className={`whitespace-nowrap px-3.5 py-1.5 rounded-sm text-xs sm:text-[13px] font-medium tracking-wide transition-all border flex items-center gap-2 select-none shrink-0 ${
              isActive
                ? "bg-[#24221F] text-[#B99A65] border-[#B99A65]/70 shadow-xs font-semibold"
                : "bg-[#181715]/60 text-[#776B5D] border-[#24221F] hover:text-[#EAE3D7] hover:border-[#776B5D]"
            }`}
          >
            {Icon && (
              <Icon
                className={`w-2.5 h-2.5 ${
                  isActive ? "text-[#B99A65]" : "text-[#776B5D]"
                }`}
              />
            )}
            <span>{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}

