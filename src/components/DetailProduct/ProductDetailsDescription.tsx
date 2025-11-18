'use client';
import { InfoProductType } from "@/types/info-product";
import { useProductDetail } from "@/context/ProductDetailContext";

interface ProductDetailsDescriptionProps {
      infoProductDetails: InfoProductType[];
      activeTab?: string;
}

export function ProductDetailsDescription({infoProductDetails, activeTab}: ProductDetailsDescriptionProps) {
      const { product, loading } = useProductDetail();

      if (loading) {
            return (
                  <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
            );
      }

      // If on Detail tab, show product description from API
      if (activeTab === 'Detail' && product) {
            return (
                  <div 
                        className="text-xs sm:text-sm prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: product.description }}
                  />
            );
      }

      // Otherwise show the passed infoProductDetails
      return (
            <div className="">
                  {infoProductDetails.map((item) => (
                        <p className="text-xs sm:text-sm" key={item.id}>{item.description}</p>
                  ))}
            </div>
      )
}