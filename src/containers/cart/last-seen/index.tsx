'use client';
import { useState, useEffect } from "react";
import { ProductList } from "@/components/Product/ProductList";
import { fetchProducts, ApiProduct } from "@/lib/api/fetch-products";
import { ProductCardType } from "@/types/product-card";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function LastSeenCartSection() {
      const [products, setProducts] = useState<ProductCardType[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            loadProducts();
      }, []);

      const loadProducts = async () => {
            try {
                  setLoading(true);
                  const response = await fetchProducts({ page: 1, size: 4 });
                  
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
            } catch (error) {
                  console.error('Error loading products:', error);
            } finally {
                  setLoading(false);
            }
      };

      return (
            <section className="flex flex-col gap-4">
                  <h2 className="text-neutral-700 text-2xl font-extrabold">Terakhir Dilihat</h2>
                  <ProductList products={products} gridClass="grid-cols-2 md:grid-cols-4" FeaturedProducts={4} loading={loading} />
            </section>
      );
}
