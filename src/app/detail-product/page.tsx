'use client';
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductDetailsCart } from "@/components/DetailProduct/ProductDetailsCart";
import { ProductDetailsSection } from "@/containers/detail-product/product-details";
import { ReviewProductSection } from "@/containers/detail-product/review-product";
import { ProductDetailProvider } from "@/context/ProductDetailContext";

function DetailProductContent() {
      const searchParams = useSearchParams();
      const productId = searchParams.get('id') || '';

      useEffect(() => {
            if (productId) {
                  // Save to recently viewed
                  const recentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
                  
                  // Remove if already exists (to move to front)
                  const filtered = recentlyViewed.filter((id: string) => id !== productId);
                  
                  // Add to front and keep max 10 items
                  const updated = [productId, ...filtered].slice(0, 10);
                  
                  localStorage.setItem('recentlyViewed', JSON.stringify(updated));
            }
      }, [productId]);

      const breadcrumbItems = [
            { label: "Beranda", href: "/", current: false },
            { label: "Produk", href: "/", current: false },
            { label: "Detail Produk", href: `/detail-product?id=${productId}`, current: true },
      ];

      return (
            <ProductDetailProvider productId={productId}>
                  <div className="w-full">
                        <main className="flex flex-col lg:py-12 p-5 lg:px-20 gap-10 w-full max-w-[1440px] mx-auto">
                              <div className="flex flex-col gap-4">
                                    <Breadcrumb items={breadcrumbItems} />
                                    <ProductDetailsSection />
                              </div>
                              <div className="bg-neutral-400 w-full h-[1px]"></div>
                              <div className="hidden">
                                    <ReviewProductSection />
                              </div>
                        </main>
                        <ProductDetailsCart />
                  </div>
            </ProductDetailProvider>
      );
}

export default function DetailProductPage() {
      return (
            <Suspense fallback={<div>Loading...</div>}>
                  <DetailProductContent />
            </Suspense>
      );
}