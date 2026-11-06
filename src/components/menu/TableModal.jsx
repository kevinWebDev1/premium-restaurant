"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { LuUtensils } from "react-icons/lu";

const PRESET_TABLES = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "12", "Bar"];

export default function TableModal() {
  const { tableNumber, setTableNumber, isTableModalOpen, setIsTableModalOpen, restaurant } =
    useCart();
  const [inputValue, setInputValue] = useState(tableNumber || "");

  if (!isTableModalOpen) return null;

  const handleSave = (val) => {
    const finalVal = val !== undefined ? val : inputValue;
    setTableNumber(finalVal.trim() || null);
    setIsTableModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-[#181715] border border-[#B99A65]/40 rounded-sm p-6 text-[#EAE3D7] shadow-2xl">
        {/* Close Button */}
        <button
          onClick={() => setIsTableModalOpen(false)}
          className="absolute top-4 right-4 text-[#776B5D] hover:text-[#EAE3D7] transition-colors p-2"
          aria-label="Close"
        >
          <FaXmark className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#B99A65]/15 border border-[#B99A65]/40 flex items-center justify-center text-[#B99A65]">
            <LuUtensils className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading text-xl text-[#EAE3D7] tracking-wider font-semibold">
              Select Dining Table
            </h3>
            <p className="text-[11px] text-[#776B5D] tracking-wide">
              {restaurant?.name || "NAMI"} — QR / NFC Dine-In
            </p>
          </div>
        </div>

        <p className="text-xs text-[#EAE3D7]/70 leading-relaxed mb-5">
          Your order cart is saved specifically to your table number so multiple guests or separate
          tables never get mixed.
        </p>

        {/* Quick Table Presets */}
        <div className="mb-5">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#B99A65] font-semibold mb-2.5 block">
            Quick Select Table
          </label>
          <div className="grid grid-cols-4 gap-2">
            {PRESET_TABLES.map((t) => {
              const isSelected = tableNumber === t || inputValue === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setInputValue(t);
                    handleSave(t);
                  }}
                  className={`py-2 px-2.5 text-xs font-semibold rounded-xs transition-all border ${
                    isSelected
                      ? "bg-[#B99A65] text-[#111110] border-[#B99A65] shadow-md font-bold"
                      : "bg-[#111110] text-[#EAE3D7]/80 border-[#24221F] hover:border-[#B99A65]/50 hover:text-[#EAE3D7]"
                  }`}
                >
                  {t.startsWith("Bar") ? "Bar" : `T-${t}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Input */}
        <div className="mb-6">
          <label className="text-[10px] tracking-[0.2em] uppercase text-[#B99A65] font-semibold mb-2 block">
            Or Type Table Number / Area
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. 14, Patio-2, Terrace"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-[#111110] border border-[#24221F] focus:border-[#B99A65] text-[#EAE3D7] text-xs px-3.5 py-2.5 rounded-xs outline-none transition-colors"
            />
            <button
              onClick={() => handleSave()}
              className="bg-[#B99A65] hover:bg-[#c9aa75] text-[#111110] font-semibold px-4 py-2.5 rounded-xs text-xs flex items-center gap-1.5 transition-colors"
            >
              <FaCheck className="w-3 h-3" />
              Save
            </button>
          </div>
        </div>

        {/* Clear Option */}
        {tableNumber && (
          <div className="text-center pt-2 border-t border-[#24221F]">
            <button
              onClick={() => {
                setInputValue("");
                handleSave("");
              }}
              className="text-[11px] text-[#776B5D] hover:text-[#EAE3D7] underline transition-colors"
            >
              Clear table (Takeaway / No Table)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

