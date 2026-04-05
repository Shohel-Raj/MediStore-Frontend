import HeroSlider from "@/components/home/hero-slider";
import ProductSection from "@/components/home/ProductSection";
import { getHomeData } from "@/services/home/home.server";

export default async function Home() {
  // Fetch home page data from server
  const { latest, discounted, topSelling } = await getHomeData();

  return (
    <div className="bg-background text-foreground">
      {/* Hero / Main Slider */}
      <HeroSlider />

      {/* Latest Products */}
      <ProductSection
        products={latest ?? []}
        fallbackTitle="Latest Arrivals in Our Store"
        fallbackSubtitle="Explore the newest additions to our healthcare and wellness collection. Stay ahead with the latest medicines, supplements, and health essentials curated for your daily needs."
      />


      {/* Discounted Products */}
      <section className="py-16 bg-secondary dark:bg-secondary/20 transition-colors">
        <ProductSection
          products={discounted ?? []}
          fallbackTitle="Exclusive Discounts You Can't Miss"
          fallbackSubtitle="Grab these limited-time offers and save on a wide variety of medicines and health products. Perfect chance to stock up on essentials while enjoying significant savings."
        />
      </section>

      {/* Top Selling Products */}
      <ProductSection
        products={topSelling ?? []}
        fallbackTitle="Our Most Popular Products"
        fallbackSubtitle="These are the top-selling items loved by our customers. Check out what’s trending in health and wellness, and discover why these products are consistently in demand."
      />
    </div>
  );
}
