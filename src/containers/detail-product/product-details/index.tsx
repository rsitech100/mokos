'use client';
import { useState } from "react";
import { ProductDetailsBar } from "@/components/Bar/ProductDetailsBar";
import { ProductDetailsDescription } from "@/components/DetailProduct/ProductDetailsDescription";
import { ProductDetailsImage } from "@/components/DetailProduct/ProductDetailsImage";
import { ProductDetailsInfo } from "@/components/DetailProduct/ProductDetailsInfo";
import { ProductDetailsShare } from "@/components/DetailProduct/ProductDetailsShare";
import { infoProductData } from "@/lib/infoproduct-data";
import { SellerInfo } from "@/components/DetailProduct/ProductDetailsCard/SellerInfo";
import { ShippingInfo } from "@/components/DetailProduct/ProductDetailsCard/ShippingInfo";

export function ProductDetailsSection() {
      const [activeInfoProducts, setActiveInfoProducts] = useState<string>('Detail');
      const infoProductDetails = Object.keys(infoProductData);

      const handleTabClick = (infoProductDetails: string) => {
            setActiveInfoProducts(infoProductDetails);
      }

      return (
            <section className="flex flex-row gap-10">
                  <div className="flex flex-col gap-4 items-start">
                        <ProductDetailsImage />
                        <ProductDetailsShare />
                  </div>
                  <div className="flex flex-col gap-5">
                        <ProductDetailsInfo />
                        <ProductDetailsBar infoProductDetails={infoProductDetails} activeInfoProductDetails={activeInfoProducts} onTabClick={handleTabClick} />
                        <ProductDetailsDescription infoProductDetails={infoProductData[activeInfoProducts] || []} />

                        <div className="flex flex-col w-full border border-neutral-400 rounded-xl">
                              <SellerInfo />
                              <ShippingInfo />
                        </div>
                  </div>

            </section>
      )
}