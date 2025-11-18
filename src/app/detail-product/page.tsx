'use client';
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductDetailsCart } from "@/components/DetailProduct/ProductDetailsCart";
import { ProductDetailsSection } from "@/containers/detail-product/product-details";
import { ReviewProductSection } from "@/containers/detail-product/review-product";
import { ProductDetailProvider } from "@/context/ProductDetailContext";

function DetailProductContent() {
      const searchParams = useSearchParams();
      const productId = searchParams.get('id') || '';

      const breadcrumbItems = [
            { label: "Beranda", href: "/", current: false },
            { label: "Produk", href: "/", current: false },
            { label: "Detail Produk", href: `/detail-product?id=${productId}`, current: true },
      ];

      return (
            <ProductDetailProvider productId={productId}>
                  <div className="relative">
                        <main className="flex flex-col lg:py-12 p-5 lg:px-20 gap-10 w-full max-w-[1440px] mx-auto">
                              <div className="flex flex-col gap-4">
                                    <Breadcrumb items={breadcrumbItems} /> 
                                    <ProductDetailsSection />
                              </div>
                              <div className="bg-neutral-400 w-full h-[1px]"></div>
                              <ReviewProductSection />
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