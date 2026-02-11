import React from "react";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  dosageForm?: string;
  strength?: string;
  price: number;
  discountPrice?: number | null;   // allow null explicitly
  stock: number;
  image?: string | null;
};

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    description,
    manufacturer,
    dosageForm,
    strength,
    price,
    discountPrice,
    stock,
    image,
  } = product;

  // Safe discount check
  const hasDiscount =
    discountPrice != null && discountPrice > 0 && discountPrice < price;

  const displayPrice = discountPrice != null ? discountPrice : price;
  const isOutOfStock = stock === 0;

  return (
    <Link
      href={`/all-medicine/${id}`}
      className={`
        group relative flex flex-col overflow-hidden rounded-2xl bg-white 
        border border-gray-200 hover:border-gray-300 
        transition-all duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.08)]
      `}
    >
      {/* Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-50">
        {image && (image.startsWith("http") || image.startsWith("/")) ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300 text-sm">
            No image
          </div>
        )}

        {/* Discount badge */}
        {hasDiscount && (
          <span className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm">
            {Math.round(((price - displayPrice) / price) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Product Name */}
        <h3 className="mb-1.5 text-lg font-medium leading-tight text-gray-900 line-clamp-2">
          {name}
        </h3>

        {/* Secondary info */}
        {(manufacturer || dosageForm || strength) && (
          <p className="mb-3 text-xs text-gray-500">
            {manufacturer}
            {manufacturer && (dosageForm || strength) ? " • " : ""}
            {dosageForm}
            {dosageForm && strength ? " • " : ""}
            {strength}
          </p>
        )}

        {/* Description (optional) */}
        {description && (
          <p className="mb-4 text-sm text-gray-600 line-clamp-2">{description}</p>
        )}

        {/* Price area */}
        <div className="mt-auto flex items-end gap-2.5">
          <span className="text-2xl font-semibold text-gray-900">
            ${displayPrice.toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through">
              ৳ {price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock indicator */}
        <span
          className={`
            mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              isOutOfStock
                ? "bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20"
                : "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20"
            }
          `}
        >
          {isOutOfStock ? "Out of Stock" : `${stock} in stock`}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;