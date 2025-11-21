'use client';
import { useState, useEffect } from "react";
import { ProductList } from "@/components/Product/ProductList";
import { ProductCardType } from "@/types/product-card";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function LastSeenCartSection() {
      const [products, setProducts] = useState<ProductCardType[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            loadRecentlyViewed();
      }, []);

      const loadRecentlyViewed = async () => {
            try {
                  setLoading(true);
                  
                  // Get recently viewed product IDs from localStorage
                  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                  
                  if (recentlyViewed.length === 0) {
                        setProducts([]);
                        return;
                  }

                  // Fetch details for each product (max 4)
                  const productPromises = recentlyViewed.slice(0, 4).map(async (productId: string) => {
                        try {
                              const response = await fetch(`${BASE_API}/v1/product?id=${productId}`, {
                                    credentials: 'include',
                                    cache: 'no-store'
                              });
                              
                              if (!response.ok) return null;
                              
                              const data = await response.json();
                              const product = data.data[0];
                              
                              return {
                                    id: product.id,
                                    image: product.pictureFiles && product.pictureFiles.length > 0
                                          ? `${BASE_API}${product.pictureFiles[0].uri}`
                                          : '/image/product/shoes-dummy.svg',
                                    title: product.title,
                                    price: product.price,
                                    location: product.merchant.name,
                                    ratings: product.totalRating,
                                    sold: product.soldStock,
                              } as ProductCardType;
                        } catch (error) {
                              console.error(`Error loading product ${productId}:`, error);
                              return null;
                        }
                  });

                  const loadedProducts = (await Promise.all(productPromises)).filter(p => p !== null) as ProductCardType[];
                  setProducts(loadedProducts);
            } catch (error) {
                  console.error('Error loading recently viewed:', error);
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
