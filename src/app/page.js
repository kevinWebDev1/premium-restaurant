"use client";

import React, { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import CulinaryStory from "@/components/CulinaryStory";
import SignatureDishes from "@/components/SignatureDishes";
import { defaultRestaurant, getRestaurantByBrand } from "@/config/restaurant";
import { FaXmark, FaCalendarCheck, FaPhone, FaWhatsapp, FaChevronDown } from "react-icons/fa6";

export default function HomePage() {
  const [restaurantConfig, setRestaurantConfig] = useState(defaultRestaurant);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "20:00",
    guests: "2",
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const searchParams = new URLSearchParams(window.location.search);
    const brandParam =
      searchParams.get("brand") ||
      searchParams.get("restaurant") ||
      searchParams.get("name");
    if (brandParam) {
      setRestaurantConfig(getRestaurantByBrand(brandParam));
    }
  }, []);

  const handleWhatsAppReservation = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello ${restaurantConfig.name}, I would like to request a table reservation for ${formData.guests} guests on ${formData.date} at ${formData.time}.\nName: ${formData.name}\nPhone: ${formData.phone}`
    );
    window.open(`https://wa.me/${restaurantConfig.contact.whatsappNumber}?text=${text}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-[#111110] text-[#EAE3D7]">
      {/* 1. HERO SECTION */}
      <HeroSection
        config={restaurantConfig}
        onOpenReservation={() => setReservationOpen(true)}
        onOpenMenu={() => {
          // Future menu router
        }}
      />

      {/* 2. CULINARY STORY & PHILOSOPHY (Asymmetric Editorial Composition) */}
      <CulinaryStory story={defaultRestaurant.story} />

      {/* 3. SIGNATURE DISHES SHOWCASE (Large Cinematic Photography) */}
      <SignatureDishes
        dishes={defaultRestaurant.signatureDishes}
        onOpenMenu={() => {
          // Future menu router
        }}
      />

      {/* 4. TERMINAL FOOTER */}
      <footer className="w-full bg-[#111110] border-t border-[#24221F] py-16 px-6 sm:px-10 lg:px-20 text-[#776B5D] text-xs">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-heading text-xl text-[#EAE3D7] tracking-[0.2em] uppercase">
              {defaultRestaurant.name}
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#B99A65] uppercase">
              Contemporary Gastronomy
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-[11px] tracking-[0.2em] uppercase">
            <a href="#story" className="hover:text-[#B99A65] transition-colors">Philosophy</a>
            <a href="#creations" className="hover:text-[#B99A65] transition-colors">Creations</a>
            <a href="/menu" className="hover:text-[#B99A65] transition-colors">Digital Menu</a>
            <button
              onClick={() => setReservationOpen(true)}
              className="text-[#B99A65] hover:text-[#c9aa73] transition-colors cursor-pointer"
            >
              Reserve a Table
            </button>
          </div>

          <div className="text-[10px] tracking-wider text-center md:text-right">
            <span>© 2026 {defaultRestaurant.name} · All rights reserved.</span>
          </div>
        </div>
      </footer>

      {/* 5. ELEGANT IN-PAGE RESERVATION MODAL */}
      {reservationOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#111110]/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#24221F] border border-[#B99A65]/40 rounded-sm p-6 sm:p-8 shadow-2xl">
            {/* Close trigger */}
            <button
              onClick={() => setReservationOpen(false)}
              className="absolute top-5 right-5 text-[#776B5D] hover:text-[#B99A65] transition-colors p-2"
              aria-label="Close"
            >
              <FaXmark className="text-lg" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <span className="text-[10px] tracking-[0.3em] text-[#B99A65] uppercase font-medium">
                Gastronomic Experience
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl text-[#EAE3D7] mt-1 uppercase tracking-wide">
                Reserve a Table
              </h2>
              <div className="w-16 h-[1px] bg-[#B99A65] mx-auto mt-3 opacity-60" />
            </div>

            {/* Form */}
            <form onSubmit={handleWhatsAppReservation} className="space-y-4">
              <div>
                <label className="block text-[11px] tracking-wider uppercase text-[#EAE3D7]/70 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#111110] border border-[#776B5D]/40 focus:border-[#B99A65] rounded-xs px-3.5 py-2.5 text-sm text-[#EAE3D7] focus:outline-none transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#EAE3D7]/70 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) ..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#111110] border border-[#776B5D]/40 focus:border-[#B99A65] rounded-xs px-3.5 py-2.5 text-sm text-[#EAE3D7] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#EAE3D7]/70 mb-1">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full appearance-none bg-[#111110] border border-[#776B5D]/40 focus:border-[#B99A65] rounded-xs px-3.5 pr-10 py-2.5 text-sm text-[#EAE3D7] focus:outline-none transition-colors cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, "9+"].map((num) => (
                        <option key={num} value={num} className="bg-[#24221F] text-[#EAE3D7]">
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[10px] text-[#B99A65] pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#EAE3D7]/70 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full [color-scheme:dark] bg-[#111110] border border-[#776B5D]/40 focus:border-[#B99A65] rounded-xs px-3.5 py-2.5 text-sm text-[#EAE3D7] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] tracking-wider uppercase text-[#EAE3D7]/70 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full [color-scheme:dark] bg-[#111110] border border-[#776B5D]/40 focus:border-[#B99A65] rounded-xs px-3.5 py-2.5 text-sm text-[#EAE3D7] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#B99A65] text-[#111110] py-3 rounded-xs text-xs tracking-[0.2em] font-semibold uppercase hover:bg-[#c9aa73] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <FaWhatsapp className="text-sm" />
                  Confirm via WhatsApp
                </button>
                <a
                  href={`tel:${defaultRestaurant.contact.phone}`}
                  className="border border-[#776B5D]/60 hover:border-[#B99A65] text-[#EAE3D7] py-3 px-4 rounded-xs text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                >
                  <FaPhone className="text-xs text-[#B99A65]" />
                  Call Directly
                </a>
              </div>

              <p className="text-[10px] text-[#776B5D] text-center mt-3">
                ✦ Table reservations are subject to restaurant confirmation.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
