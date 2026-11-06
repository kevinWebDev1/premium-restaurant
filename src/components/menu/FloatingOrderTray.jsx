"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/whatsappOrder";
import { FaBagShopping, FaArrowRight } from "react-icons/fa6";

export default function FloatingOrderTray() {
  const { totalItems, subtotal, setIsCartOpen, tableNumber, restaurant } = useCart();

  if (totalItems <= 0) return null;

  const currency = restaurant?.currency || "USD";
  const formattedSubtotal = formatCurrency(subtotal, currency);

  return (
    <div className="fixed bottom-16 md:bottom-8 inset-x-4 md:inset-x-auto md:right-8 z-40 pointer-events-none animate-slide-up">
      <div className="max-w-md md:w-80 pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="w-full bg-[#181917]/95 backdrop-blur-md hover:bg-[#20221e] text-[#EAE3D7] border border-[#B99A65]/70 rounded-full px-4 sm:px-5 py-3.5 shadow-2xl flex items-center justify-between gap-3 transition-all duration-200 active:scale-[0.98] group"
          aria-label={`View order request with ${totalItems} items totaling ${formattedSubtotal}`}
        >
          {/* Left: Item Badge + Table Label */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full bg-[#B99A65] text-[#111110] flex items-center justify-center font-bold text-xs shadow-md">
              <FaBagShopping className="w-3.5 h-3.5" />
              <span className="absolute -top-1 -right-1 bg-[#111110] text-[#B99A65] border border-[#B99A65] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            </div>

            <div className="text-left">
              <span className="font-heading text-sm font-semibold tracking-wider text-[#EAE3D7] block leading-tight">
                VIEW ORDER
              </span>
              <span className="text-[10px] text-[#B99A65] tracking-wide block font-medium">
                {tableNumber ? `Table ${tableNumber}` : "Dine-In • Set Table"}
              </span>
            </div>
          </div>

          {/* Right: Subtotal + Action Arrow */}
          <div className="flex items-center gap-2">
            <span className="font-body text-sm font-bold text-[#B99A65] tracking-tight">
              {formattedSubtotal}
            </span>
            <div className="w-7 h-7 rounded-full bg-[#B99A65]/15 border border-[#B99A65]/40 flex items-center justify-center text-[#B99A65] group-hover:translate-x-0.5 transition-transform">
              <FaArrowRight className="w-3 h-3" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
