import { AddReviewButton } from "@/components/Buttons/AddReviewButton";
import { ReviewDataType } from "@/types/review";
import Image from "next/image";

type ProductCardBeforeReviewProps = Pick<
      ReviewDataType,
      "invoice" | "images" | "productName" | "quantity" | "price" | "storeName"
>;

export function ProductCardBeforeReview({
      invoice,
      images,
      productName,  
      quantity,
      price,
      storeName,
}: ProductCardBeforeReviewProps) {
      return (
            <div className="bg-white rounded-[12px] shadow-md flex flex-col p-4 gap-[18px]">
                  <p className="text-sm underline font-bold text-primary-500">{invoice}</p>
                  <hr className="border-dashed border-neutral-400" />

                  {/* detail product */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-0">
                        <div className="flex flex-row gap-3">
                              {images.slice(0, 1).map((item, index) => (
                                    <Image key={index} src={item} alt="dummy" width={60} height={60} className="w-[60px] h-[60px] rounded-[12px]" />
                              ))}
                              <div className="flex flex-col gap-2.5 text-sm text-neutral-700">
                                    <p>{productName}</p>
                                    <p className="font-extrabold">{quantity} x {price}</p>
                                    <div className="flex gap-1.5">
                                          <Image src="/image/review/shop-dummy.svg" alt="shop-dummy" width={20} height={20} className="w-5 h-5" />
                                          <span>{storeName}</span>
                                    </div>
                              </div>
                        </div>

                        <AddReviewButton />
                  </div>
            </div>
      )
}