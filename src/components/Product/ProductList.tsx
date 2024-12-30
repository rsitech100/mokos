
import { ProductCard } from "./ProductCard";
import { productsData } from "@/lib/product-data";

interface ProductsListProps {
  showAllProducts?: boolean;
  gridClass?: string;
  FeaturedProducts: number;
}

export function ProductList({ showAllProducts, gridClass, FeaturedProducts }: ProductsListProps) {

  const displayedProducts = showAllProducts ? productsData : productsData.slice(0, FeaturedProducts);
  return (
    <div className={`grid gap-5 ${gridClass}`}>
      {displayedProducts.map((item) => (
        <ProductCard
          key={item.id}
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
