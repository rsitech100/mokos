'use client';
import { useState } from "react";
import { ReviewBar } from "@/components/Review/ReviewBar";
import { ReviewEmpty } from "@/components/Review/ReviewEmpty";
import { ProductListBeforeReview } from "@/components/Review/BeforeReview/ProductListBeforeReview";
import { ProductListAfterReview } from "@/components/Review/AfterReview/ProductListAfterReview";

export function ReviewSection() {
            const [activeBar, setActiveBar] = useState<string>('Belum Diulas');

            const renderContent = () => {
                  if (activeBar === 'Belum Diulas') {
                        return <ProductListBeforeReview />;
                  }
                  if (activeBar === 'Sudah Diulas') {
                        return <ProductListAfterReview />;
                  }
            }
      return (
            <section className="flex flex-col gap-4">
                  <ReviewBar activeBar={activeBar} onTabClick={setActiveBar} />
                  <ReviewEmpty />
                  {renderContent()}
            </section>
      )
}