import { ProductCard } from "./ProductCard";
import { productsData } from "@/utils/product-data";

interface ProductsListProps {
  showAllProducts: boolean;
}

export function ProductList({ showAllProducts }: ProductsListProps) {
  const displayedProducts = showAllProducts ? productsData : productsData.slice(0, 12);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
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
