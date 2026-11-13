import { Suspense } from "react";
import { defaultRestaurant, getRestaurantByBrand } from "@/config/restaurant";
import { CartProvider } from "@/context/CartContext";
import MenuClientView from "@/components/menu/MenuClientView";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const brand = sp?.brand || sp?.restaurant || sp?.name;
  const restaurant = brand ? getRestaurantByBrand(brand) : defaultRestaurant;
  return {
    title: `Digital Menu & Table Ordering | ${restaurant.name}`,
    description: restaurant.description,
  };
}

export default async function MenuPage({ searchParams }) {
  const sp = await searchParams;
  const brand = sp?.brand || sp?.restaurant || sp?.name;
  const restaurant = brand ? getRestaurantByBrand(brand) : defaultRestaurant;

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#111110] flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#B99A65] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CartProvider restaurant={restaurant}>
        <MenuClientView />
      </CartProvider>
    </Suspense>
  );
}
