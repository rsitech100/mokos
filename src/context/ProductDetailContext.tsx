'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchProductPrices, ProductDetail } from '@/lib/api/fetch-product-detail';
import { getProductDetailById, getProductImages } from '@/lib/api/product-detail';

interface ProductDetailContextType {
  product: ProductDetail | null;
  loading: boolean;
  error: string | null;
  loadProduct: (id: string) => Promise<void>;
}

const ProductDetailContext = createContext<ProductDetailContextType | undefined>(undefined);

export function ProductDetailProvider({ children, productId }: { children: ReactNode; productId: string }) {
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      // 🟦 Fetch semua data secara parallel
      const [productDetail, images] = await Promise.all([
        getProductDetailById(id),
        getProductImages(id)
      ]);

      if (!productDetail) throw new Error("Product not found");

      // 🟦 Ambil harga (optional)
      let productPrices: unknown = undefined;
      try {
        const pricesResponse = await fetchProductPrices(id);
        if (pricesResponse.success && pricesResponse.data.length > 0) {
          productPrices = pricesResponse.data;
        }
      } catch {
        console.log("No prices available");
      }

      const mergedProduct = {
        ...productDetail,
        pictureFiles: images.length > 0 ? images : productDetail.pictureFiles || [],
        productPrices,
      };

      setProduct(mergedProduct);

    } catch (err) {
      console.error("Error loading product:", err);
      setError(err instanceof Error ? err.message : "Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) loadProduct(productId);
  }, [productId]);

  return (
    <ProductDetailContext.Provider value={{ product, loading, error, loadProduct }}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext);
  if (!context) {
    throw new Error('useProductDetail must be used within a ProductDetailProvider');
  }
  return context;
}
