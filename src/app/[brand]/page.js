import RestaurantHomeView from "@/components/RestaurantHomeView";
import { getRestaurantByBrand } from "@/config/restaurant";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const config = getRestaurantByBrand(brand);
  return {
    title: `${config.name} | ${config.categoryTagline || "Dining Experience"}`,
    description: config.description,
  };
}

export default async function DynamicBrandPage({ params }) {
  const { brand } = await params;
  const config = getRestaurantByBrand(brand);

  return <RestaurantHomeView initialRestaurant={config} brandSlug={brand} />;
}

