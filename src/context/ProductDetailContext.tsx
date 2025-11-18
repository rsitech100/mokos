'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductDetail, fetchProductDetail } from '@/lib/api/fetch-product-detail';

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
      const response = await fetchProductDetail(id);
      setProduct(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product');
      console.error('Error loading product:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct(productId);
    }
  }, [productId]);

  return (
    <ProductDetailContext.Provider value={{ product, loading, error, loadProduct }}>
      {children}
    </ProductDetailContext.Provider>
  );
}

export function useProductDetail() {
  const context = useContext(ProductDetailContext);
  if (context === undefined) {
    throw new Error('useProductDetail must be used within a ProductDetailProvider');
  }
  return context;
}
