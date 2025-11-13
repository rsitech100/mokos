import { ProductList } from "@/components/Product/ProductList";

export function ProductDisplay() {

      return (
            <div className="">
                  <ProductList showAllProducts={false} gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-5" FeaturedProducts={15} />
            </div>
      )
}