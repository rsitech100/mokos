'use client';
import { useState } from "react";
import { ProductList } from "@/components/Product/ProductList";
import { productsData } from "@/utils/product-data";


export function ProductsSection() {
      const [showAllProducts, setShowAllProducts] = useState(false);

      const toggleShowAll = () => {
            setShowAllProducts(!showAllProducts);
      };

      return (
            <section className="px-5 lg:px-20 pt-12 flex flex-col gap-5">
                  <h2 className="text-neutral-700 text-2xl font-semibold text-left">Produk</h2>
                  <ProductList showAllProducts={showAllProducts} />
                  {productsData.length > 12 && !showAllProducts && (
                        <button
                              className="rounded-full text-primary-500 border border-primary-500 hover:bg-primary-500 hover:text-white text-xs sm:text-sm px-14 py-3 font-semibold mx-auto mt-5"
                              aria-label="Show All Product Button"
                              onClick={toggleShowAll}
                        >
                              Muat Lainnya
                        </button>
                  )}
            </section>
      )
}