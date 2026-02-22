import ProductCard from "../All-product/ProductCard";
import SectionWrapper from "./SectionWrapper";

type Product = {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  image?: string | null;
};

interface Props {
  products: Product[];

  // From API (optional)
  title?: string;
  subtitle?: string;

  // Fallback
  fallbackTitle: string;
  fallbackSubtitle?: string;
}

export default function ProductSection({
  products,
  title,
  subtitle,
  fallbackTitle,
  fallbackSubtitle,
}: Props) {
  if (!products?.length) return null;

  return (
    <SectionWrapper
      title={title}
      subtitle={subtitle}
      fallbackTitle={fallbackTitle}
      fallbackSubtitle={fallbackSubtitle}
    >
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  );
}