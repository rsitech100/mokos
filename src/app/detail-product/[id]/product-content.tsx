'use client';
import { useEffect } from "react";
import { ProductDetailsCart } from "@/components/DetailProduct/ProductDetailsCart";
import { ProductDetailsSection } from "@/containers/detail-product/product-details";
import { ReviewProductSection } from "@/containers/detail-product/review-product";
import { ProductDetailProvider } from "@/context/ProductDetailContext";

interface DetailProductContentProps {
  productId: string;
}

export default function DetailProductContent({ productId }: DetailProductContentProps) {

      useEffect(() => {
            if (productId) {
                  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');

                  const filtered = recentlyViewed.filter((id: string) => id !== productId);
                  const updated = [productId, ...filtered].slice(0, 10);

                  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
            }
      }, [productId]);

      return (
            <ProductDetailProvider productId={productId}>
                        <div className="flex flex-col gap-4 w-full max-w-[1440px] mx-auto px-5 lg:px-20">
                              <ProductDetailsSection />
                        </div>

                        <div className="bg-neutral-400 w-full h-[1px]"></div>

                        <div className="hidden">
                              <ReviewProductSection />
                        </div>

                        <ProductDetailsCart />
            </ProductDetailProvider>
      );
}
