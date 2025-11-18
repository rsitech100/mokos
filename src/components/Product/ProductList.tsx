import { ProductCard } from "./ProductCard";
import { ProductCardType } from "@/types/product-card";
import { ProductCardSkeleton } from "../Skeleton/ProductCardSkeleton";

interface ProductsListProps {
  products: ProductCardType[];
  showAllProducts?: boolean;
  gridClass?: string;
  FeaturedProducts: number;
  loading?: boolean;
}

export function ProductList({ products, showAllProducts, gridClass, FeaturedProducts, loading }: ProductsListProps) {

  const displayedProducts = showAllProducts ? products : products.slice(0, FeaturedProducts);
  
  if (loading) {
    return (
      <div className={`grid gap-5 ${gridClass}`}>
        {Array.from({ length: FeaturedProducts }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {displayedProducts.map((item) => (
        <ProductCard
          key={item.id}
          id={item.id}
          image={item.image}
          title={item.title}
          price={item.price}
          location={item.location}
          ratings={item.ratings}
          sold={item.sold}
        />
      ))}
    </div>
  );
}
