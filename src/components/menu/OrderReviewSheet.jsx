"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatCurrency, generateWhatsAppOrder } from "@/utils/whatsappOrder";
import {
  FaXmark,
  FaPlus,
  FaMinus,
  FaTrashCan,
  FaWhatsapp,
  FaTriangleExclamation,
  FaPencil,
} from "react-icons/fa6";
import { LuUtensils } from "react-icons/lu";

export default function OrderReviewSheet() {
  const {
    restaurant,
    tableNumber,
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    isCartOpen,
    setIsCartOpen,
    setIsTableModalOpen,
    unavailableCartItems,
    removeUnavailableItems,
  } = useCart();

  const [guestNote, setGuestNote] = useState("");
  const [isDispatching, setIsDispatching] = useState(false);

  if (!isCartOpen) return null;

  const currency = restaurant?.currency || "USD";
  const formattedSubtotal = formatCurrency(subtotal, currency);
  const hasUnavailable = unavailableCartItems && unavailableCartItems.length > 0;

  const handleSendOrder = () => {
    if (cart.length === 0) return;

    if (hasUnavailable) {
      alert("Please remove sold out items from your order before submitting.");
      return;
    }

    setIsDispatching(true);

    try {
      const order = generateWhatsAppOrder({
        restaurant,
        tableNumber,
        cartItems: cart,
        guestNote,
      });

      // Open WhatsApp with prefilled order request
      window.open(order.url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error("Order generation error:", e);
      alert("Could not generate WhatsApp order: " + e.message);
    } finally {
      setIsDispatching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm animate-fade-in">
      {/* Click outside to close */}
      <div
        className="absolute inset-0"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-lg bg-[#181715] border-t sm:border border-[#B99A65]/50 sm:rounded-sm max-h-[92vh] flex flex-col text-[#EAE3D7] shadow-2xl z-10">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#24221F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#B99A65]/15 border border-[#B99A65]/40 flex items-center justify-center text-[#B99A65]">
              <LuUtensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold tracking-wider text-[#EAE3D7]">
                Order Request
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] font-semibold text-[#B99A65]">
                  {tableNumber ? `Table ${tableNumber}` : "No Table Selected"}
                </span>
                <button
                  onClick={() => setIsTableModalOpen(true)}
                  className="text-[10px] text-[#776B5D] hover:text-[#EAE3D7] flex items-center gap-1 underline transition-colors"
                >
                  <FaPencil className="w-2.5 h-2.5" />
                  Change
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-[#776B5D] hover:text-[#EAE3D7] transition-colors"
            aria-label="Close Order Review"
          >
            <FaXmark className="w-5 h-5" />
          </button>
        </div>

        {/* Unavailable Alert Banner (Rule 3) */}
        {hasUnavailable && (
          <div className="bg-[#2a1b12] border-b border-amber-600/40 p-3.5 flex items-start justify-between gap-3 text-xs">
            <div className="flex items-start gap-2 text-amber-200">
              <FaTriangleExclamation className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Items Sold Out</p>
                <p className="text-[11px] text-amber-200/80 mt-0.5">
                  {unavailableCartItems.map((i) => i.name).join(", ")} became unavailable.
                </p>
              </div>
            </div>
            <button
              onClick={removeUnavailableItems}
              className="shrink-0 px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xs text-[10px] font-semibold transition-colors"
            >
              Remove
            </button>
          </div>
        )}

        {/* Scrollable Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-[#24221F]">
          {cart.length === 0 ? (
            <div className="py-12 text-center text-[#776B5D]">
              <p className="text-sm">Your order tray is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-3 text-xs text-[#B99A65] underline"
              >
                Browse Menu Dishes
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = formatCurrency(item.price * item.quantity, currency);
              const isItemUnavailable = unavailableCartItems?.some((u) => u.id === item.id);

              return (
                <div
                  key={item.id}
                  className={`py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 ${
                    isItemUnavailable ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <h5 className="font-heading text-sm font-semibold text-[#EAE3D7] truncate">
                        {item.name}
                      </h5>
                      {isItemUnavailable && (
                        <span className="text-[9px] bg-red-950 text-red-300 px-1.5 py-0.2 rounded-xs border border-red-800">
                          Sold Out
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <p className="text-[10px] uppercase text-[#776B5D] tracking-wider truncate">
                        {item.subtitle}
                      </p>
                    )}
                    <span className="text-xs font-semibold text-[#B99A65]">
                      {itemTotal}
                    </span>
                  </div>

                  {/* Quantity Stepper + Trash */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center bg-[#111110] border border-[#24221F] rounded-full overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[#776B5D] hover:text-[#B99A65] active:scale-95 transition-all"
                        aria-label="Decrease quantity"
                      >
                        <FaMinus className="w-2.5 h-2.5" />
                      </button>

                      <span className="w-6 text-center text-xs font-bold text-[#EAE3D7]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={isItemUnavailable}
                        className="w-7 h-7 flex items-center justify-center text-[#776B5D] hover:text-[#B99A65] active:scale-95 transition-all disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <FaPlus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 text-[#776B5D] hover:text-red-400 transition-colors"
                      title="Remove item"
                    >
                      <FaTrashCan className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Special Instructions / Notes */}
        {cart.length > 0 && (
          <div className="px-4 sm:px-5 py-2.5 border-t border-[#24221F] bg-[#141312]">
            <label className="text-[10px] tracking-[0.2em] uppercase text-[#B99A65] font-semibold mb-1 block">
              Special Instructions / Dietary Allergies
            </label>
            <input
              type="text"
              placeholder="e.g. Shellfish allergy, dressing on the side..."
              value={guestNote}
              onChange={(e) => setGuestNote(e.target.value)}
              className="w-full bg-[#111110] border border-[#24221F] focus:border-[#B99A65] text-xs text-[#EAE3D7] px-3 py-2 rounded-xs outline-none placeholder-[#776B5D]"
            />
          </div>
        )}

        {/* Footer Summary & Human Confirmation Boundary (Rule 4) */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#24221F] bg-[#141312]">
            {/* Totals */}
            <div className="space-y-1.5 mb-3.5 text-xs">
              <div className="flex justify-between text-[#776B5D]">
                <span>Subtotal ({totalItems} items)</span>
                <span className="text-[#EAE3D7] font-medium">{formattedSubtotal}</span>
              </div>
              <div className="flex justify-between text-[#776B5D]">
                <span>Taxes & Gratuity</span>
                <span>Calculated at table</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#EAE3D7] pt-2 border-t border-[#24221F]">
                <span>Estimated Total</span>
                <span className="text-[#B99A65] font-heading text-lg">
                  {formattedSubtotal}
                </span>
              </div>
            </div>

            {/* Human Confirmation Notice */}
            <p className="text-[10px] text-[#776B5D] leading-tight mb-3 italic">
              ⚠️ *Order Request:* Kitchen preparation begins upon floor staff confirmation at your table.
            </p>

            {/* Primary Action Button */}
            <button
              onClick={handleSendOrder}
              disabled={isDispatching || hasUnavailable}
              className={`w-full py-3.5 px-4 rounded-xs font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all shadow-xl ${
                hasUnavailable
                  ? "bg-[#24221F] text-[#776B5D] cursor-not-allowed"
                  : "bg-[#25D366] hover:bg-[#20ba59] text-[#111110] active:scale-[0.99] font-bold"
              }`}
            >
              <FaWhatsapp className="w-4 h-4 text-black" />
              <span>Send Order Request via WhatsApp</span>
            </button>

            {/* Clear Cart Option */}
            <div className="text-center mt-2.5">
              <button
                onClick={clearCart}
                className="text-[10px] text-[#776B5D] hover:text-red-400 underline transition-colors"
              >
                Clear current order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

