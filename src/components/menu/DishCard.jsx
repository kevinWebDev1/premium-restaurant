"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/utils/whatsappOrder";
import { FaPlus, FaMinus, FaStar, FaLeaf } from "react-icons/fa6";
import { LuWheatOff } from "react-icons/lu";

export default function DishCard({ dish }) {
  const { cart, addToCart, updateQuantity, restaurant } = useCart();

  const isAvailable = dish.available !== false;
  const currency = dish.currency || restaurant?.currency || "USD";
  const formattedPrice = formatCurrency(dish.price, currency);

  // Check if item is already in cart
  const cartItem = cart.find((item) => item.id === dish.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    if (!isAvailable) return;
    addToCart(dish);
  };

  const handleIncrement = () => {
    if (!isAvailable) return;
    updateQuantity(dish.id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(dish.id, quantity - 1);
  };

  return (
    <div
      className={`group relative bg-[#141513]/90 rounded-2xl border transition-all duration-300 p-3 sm:p-4 shadow-lg flex flex-col justify-between ${
        isAvailable
          ? "border-[#242622] hover:border-[#B99A65]/50 hover:bg-[#181a17] hover:shadow-2xl"
          : "border-[#242622]/50 opacity-60 bg-[#111210]"
      }`}
    >
      <div className="flex gap-3.5 sm:gap-4 items-center">
        {/* Left: Wide Rectangular Food Photograph (La Lumière style 4:3) */}
        <div className="relative shrink-0 w-28 sm:w-36 md:w-36 lg:w-44 aspect-[4/3] rounded-xl overflow-hidden bg-[#111110] border border-[#242622] shadow-inner">
          <img
            src={dish.image || "/images/hero-canvas.jpg"}
            alt={dish.imageAlt || dish.name}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 ${
              !isAvailable ? "grayscale contrast-75" : ""
            }`}
            loading="lazy"
          />

          {/* Subtle dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />

          {/* Chef Special Badge on image */}
          {dish.isChefSpecial && isAvailable && (
            <span
              className="absolute top-1.5 left-1.5 bg-[#111110]/85 backdrop-blur-xs text-[#B99A65] p-1 rounded-sm shadow-xs border border-[#B99A65]/40"
              title="Chef's Special Selection"
            >
              <FaStar className="w-2.5 h-2.5" />
            </span>
          )}

          {/* Sold Out Overlay */}
          {!isAvailable && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-1 text-center backdrop-blur-2xs">
              <span className="text-[10px] font-bold text-[#776B5D] tracking-[0.2em] uppercase leading-tight">
                Sold Out
              </span>
            </div>
          )}
        </div>

        {/* Right: Dish Content */}
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
          <div>
            {/* Header: Name */}
            <div className="flex items-start justify-between gap-2">
              <h4 className="font-heading text-base sm:text-lg lg:text-xl font-normal tracking-wide text-[#EAE3D7] leading-snug group-hover:text-[#f3ede4] transition-colors">
                {dish.name}
              </h4>
            </div>

            {/* Subtitle / Alternate title */}
            {dish.subtitle && (
              <p className="text-[9px] sm:text-[10px] tracking-[0.16em] uppercase text-[#B99A65] font-medium mt-0.5">
                {dish.subtitle}
              </p>
            )}

            {/* Ingredients Description */}
            <p className="text-xs sm:text-[13px] text-[#8E867A] font-light leading-relaxed mt-1 line-clamp-2">
              {dish.description}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="flex items-center justify-between gap-2 mt-2.5 pt-2 border-t border-[#242622]/60">
            {/* Price & Dietary tags */}
            <div className="flex items-center gap-2">
              <span className="font-body text-sm sm:text-base font-medium text-[#B99A65] tracking-tight">
                {formattedPrice}
              </span>

              {dish.isVegetarian && (
                <span
                  className="inline-flex items-center gap-0.5 text-[9px] text-[#86efac] font-medium bg-[#86efac]/10 border border-[#86efac]/25 px-1.5 py-0.2 rounded-xs"
                  title="Vegetarian"
                >
                  <FaLeaf className="w-2 h-2" />
                  Veg
                </span>
              )}
              {dish.isGlutenFree && (
                <span
                  className="inline-flex items-center gap-0.5 text-[9px] text-[#fcd34d] font-medium bg-[#fcd34d]/10 border border-[#fcd34d]/25 px-1.5 py-0.2 rounded-xs"
                  title="Gluten-Free"
                >
                  <LuWheatOff className="w-2 h-2" />
                  GF
                </span>
              )}
            </div>

            {/* Action: Add / Quantity Stepper */}
            <div>
              {!isAvailable ? (
                <span className="text-[10px] font-semibold text-[#776B5D] px-2.5 py-1 bg-[#111110] border border-[#24221F] rounded-full uppercase tracking-wider cursor-not-allowed">
                  Sold Out
                </span>
              ) : quantity > 0 ? (
                /* Interactive Stepper */
                <div className="flex items-center bg-[#111110] border border-[#B99A65] rounded-full overflow-hidden shadow-xs">
                  <button
                    onClick={handleDecrement}
                    aria-label={`Decrease ${dish.name} quantity`}
                    className="w-7 h-7 flex items-center justify-center text-[#B99A65] hover:bg-[#B99A65]/20 active:scale-95 transition-all"
                  >
                    <FaMinus className="w-2.5 h-2.5" />
                  </button>

                  <span className="w-6 text-center font-bold text-xs text-[#EAE3D7]">
                    {quantity}
                  </span>

                  <button
                    onClick={handleIncrement}
                    aria-label={`Increase ${dish.name} quantity`}
                    className="w-7 h-7 flex items-center justify-center text-[#B99A65] hover:bg-[#B99A65]/20 active:scale-95 transition-all"
                  >
                    <FaPlus className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                /* Sleek Add Button */
                <button
                  onClick={handleAdd}
                  aria-label={`Add ${dish.name} to order`}
                  className="group/btn flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-xs font-semibold bg-[#111110] text-[#EAE3D7] border border-[#B99A65]/50 hover:bg-[#B99A65] hover:text-[#111110] active:scale-95 transition-all duration-150 shadow-xs"
                >
                  <FaPlus className="w-2.5 h-2.5 text-[#B99A65] group-hover/btn:text-[#111110] transition-colors" />
                  <span>Add</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
