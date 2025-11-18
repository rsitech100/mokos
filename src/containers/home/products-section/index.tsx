'use client';
import { useState, useEffect } from "react";
import { ProductList } from "@/components/Product/ProductList";
import { fetchProducts, ApiProduct } from "@/lib/api/fetch-products";
import { ProductCardType } from "@/types/product-card";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function ProductsSection() {
      const [showAllProducts, setShowAllProducts] = useState(false);
      const [products, setProducts] = useState<ProductCardType[]>([]);
      const [loading, setLoading] = useState(true);
      const [totalProducts, setTotalProducts] = useState(0);

      useEffect(() => {
            loadProducts();
      }, []);

      const loadProducts = async () => {
            try {
                  setLoading(true);
                  const response = await fetchProducts({ page: 1, size: 50 });
                  
                  // Transform API data to match ProductCardType
                  const transformedProducts: ProductCardType[] = response.data.map((product: ApiProduct) => ({
                        id: product.id,
                        image: product.pictureFiles.length > 0 
                              ? `${BASE_API}${product.pictureFiles[0].uri}` 
                              : '/image/product/shoes-dummy.svg',
                        title: product.title,
                        price: product.price,
                        location: product.merchant.name,
                        ratings: product.totalRating,
                        sold: product.soldStock,
                  }));

                  setProducts(transformedProducts);
                  setTotalProducts(response.result.total);
            } catch (error) {
                  console.error('Error loading products:', error);
            } finally {
                  setLoading(false);
            }
      };

      const toggleShowAll = () => {
            setShowAllProducts(!showAllProducts);
      };

      return (
            <section className="px-5 lg:px-20 pt-12 flex flex-col gap-5">
                  <h2 className="text-neutral-700 text-2xl font-semibold text-left">Produk</h2>
                  <ProductList 
                        products={products} 
                        showAllProducts={showAllProducts} 
                        gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-6" 
                        FeaturedProducts={12}
                        loading={loading}
                  />
                  {totalProducts > 12 && !showAllProducts && (
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