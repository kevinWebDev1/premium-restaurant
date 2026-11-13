import RestaurantHomeView from "@/components/RestaurantHomeView";
import { defaultRestaurant } from "@/config/restaurant";

export const metadata = {
  title: `${defaultRestaurant.name} | ${defaultRestaurant.categoryTagline}`,
  description: defaultRestaurant.description,
};

export default function RootHomePage() {
  return <RestaurantHomeView />;
}
