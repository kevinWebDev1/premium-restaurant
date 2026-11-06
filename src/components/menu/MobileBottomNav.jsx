"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/whatsappOrder";
import { LuUtensils, LuWine, LuChefHat } from "react-icons/lu";
import { FaBagShopping, FaBellConcierge } from "react-icons/fa6";

export default function MobileBottomNav() {
  const { totalItems, subtotal, setIsCartOpen, setIsTableModalOpen, tableNumber, restaurant } =
    useCart();

  const currency = restaurant?.currency || "USD";
  const formattedSubtotal = formatCurrency(subtotal, currency);

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#111210]/95 backdrop-blur-lg border-t border-[#242622] px-3 py-2 pb-safe">
      <div className="flex items-center justify-around">
        {/* 1. Menu Tab (Active) */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center gap-1 text-[#B99A65] relative py-1"
        >
          <FaBellConcierge className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Menu</span>
          <span className="w-4 h-[1.5px] bg-[#B99A65] rounded-full mt-0.5" />
        </button>

        {/* 2. Wines Tab (Smooth scroll to Cellar) */}
        <a
          href="#category-cellar-drinks"
          className="flex flex-col items-center gap-1 text-[#776B5D] hover:text-[#EAE3D7] transition-colors py-1"
        >
          <LuWine className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Wines</span>
        </a>

        {/* 3. Order Tray Button (Highlights if items in cart) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className={`flex flex-col items-center gap-1 relative py-1 transition-all ${
            totalItems > 0
              ? "text-[#EAE3D7] font-bold scale-105"
              : "text-[#776B5D] hover:text-[#EAE3D7]"
          }`}
        >
          <div className="relative">
            <FaBagShopping className={`w-4 h-4 ${totalItems > 0 ? "text-[#B99A65]" : ""}`} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-[#B99A65] text-[#111110] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-wider uppercase">
            {totalItems > 0 ? formattedSubtotal : "Order"}
          </span>
        </button>

        {/* 4. Table Indicator / Change Table */}
        <button
          onClick={() => setIsTableModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[#776B5D] hover:text-[#EAE3D7] transition-colors py-1"
        >
          <LuUtensils className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">
            {tableNumber ? `T-${tableNumber}` : "Table"}
          </span>
        </button>

        {/* 5. Chef / Story Tab */}
        <Link
          href="/#story"
          className="flex flex-col items-center gap-1 text-[#776B5D] hover:text-[#EAE3D7] transition-colors py-1"
        >
          <LuChefHat className="w-4 h-4" />
          <span className="text-[10px] tracking-wider uppercase font-medium">Chef</span>
        </Link>
      </div>
    </div>
  );
}
