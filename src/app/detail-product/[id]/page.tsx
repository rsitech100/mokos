import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import DetailProductContent from "./product-content";
import { notFound } from "next/navigation";
import { getProductDetailById } from "@/lib/api/product-detail";

export const dynamic = 'force-dynamic';

export default async function DetailProductPage({ params }: { params: Promise<{ id: string }> }) {
      const { id: productId } = await params;

      const product = await getProductDetailById(productId);

      if (!product) {
            notFound();
      }

      const breadcrumbItems = [
            { label: "Beranda", href: "/", current: false },
            { label: "Produk", href: "/", current: false },
            { label: product.title || "Detail Produk", href: `/detail-product/${productId}`, current: true },
      ];

      return (
            <main className="flex flex-col lg:py-12 gap-10 w-full mt-6 md:mt-0">
                  <div className="w-full max-w-[1440px] mx-auto px-5 lg:px-20">
                        <Breadcrumb items={breadcrumbItems} />
                  </div>

                  <DetailProductContent productId={productId} />
            </main>
      );
}
