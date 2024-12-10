import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { ProductDetailsCart } from "@/components/DetailProduct/ProductDetailsCart";
import { ProductDetailsSection } from "@/containers/detail-product/product-details";
import { ReviewProductSection } from "@/containers/detail-product/review-product";

export default function DetailProductPage() {
      const breadcrumbItems = [
            { label: "Beranda", href: "/", current: false },
            { label: "Fashion", href: "/detail-product", current: false },
            { label: "Sepatu Hitam Bagus dan Berkualitas", href: "/detail-product/sepatu", current: true },
      ]
      return (
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
      )
}