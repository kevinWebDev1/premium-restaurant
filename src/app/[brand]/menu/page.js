import { Suspense } from "react";
import { getRestaurantByBrand } from "@/config/restaurant";
import { CartProvider } from "@/context/CartContext";
import MenuClientView from "@/components/menu/MenuClientView";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const config = getRestaurantByBrand(brand);
  return {
    title: `Digital Menu & Ordering | ${config.name}`,
    description: config.description,
  };
}

export default async function DynamicBrandMenuPage({ params }) {
  const { brand } = await params;
  const restaurant = getRestaurantByBrand(brand);

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

