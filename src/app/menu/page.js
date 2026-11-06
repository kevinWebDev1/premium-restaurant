import { Suspense } from "react";
import { defaultRestaurant } from "@/config/restaurant";
import { CartProvider } from "@/context/CartContext";
import MenuClientView from "@/components/menu/MenuClientView";

export const metadata = {
  title: "Digital Menu & Table Ordering | NAMI Contemporary Gastronomy",
  description:
    "Explore our seasonal crudo, binchotan hearth specialties, and artisanal mixology. Request orders directly from your table.",
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#111110] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#B99A65] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CartProvider restaurant={defaultRestaurant}>
        <MenuClientView />
      </CartProvider>
    </Suspense>
  );
}

