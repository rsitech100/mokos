'use client';
import { useState, useEffect } from "react";
import { ProductList } from "@/components/Product/ProductList";
import { fetchProducts, ApiProduct } from "@/lib/api/fetch-products";
import { ProductCardType } from "@/types/product-card";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function ProductDisplay() {
      const [products, setProducts] = useState<ProductCardType[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            loadProducts();
      }, []);

      const loadProducts = async () => {
            try {
                  setLoading(true);
                  const response = await fetchProducts({ page: 1, size: 15 });
                  
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
            <div className="">
                  <ProductList products={products} showAllProducts={false} gridClass="grid-cols-2 md:grid-cols-3 lg:grid-cols-5" FeaturedProducts={15} loading={loading} />
            </div>
      )
}