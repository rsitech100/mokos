'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProductDetail, fetchProductDetail } from '@/lib/api/fetch-product-detail';
import { fetchProducts } from '@/lib/api/fetch-products';

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

      // Fetch from product list to get images
      const listResponse = await fetchProducts({ page: 1, size: 100 });
      const productFromList = listResponse.data.find(p => p.id === id);
      
      // Fetch detail
      const response = await fetchProductDetail(id);
      
      // Merge: use images from list if available, otherwise from detail
      const mergedProduct = {
        ...response.data,
        pictureFiles: productFromList?.pictureFiles || response.data.pictureFiles
      };
      setProduct(mergedProduct);
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
