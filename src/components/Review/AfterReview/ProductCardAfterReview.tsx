import { ReviewDataType } from "@/types/review";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

type ProductCardAfterReviewProps = Pick<
      ReviewDataType,
      "invoice" | "images" | "productName" | "quantity" | "price" | "storeName" | "rating" | "reviewText"
>;

export function ProductCardAfterReview({
      invoice,
      images,
      productName,
      quantity,
      price,
      storeName,
      rating,
      reviewText
}: ProductCardAfterReviewProps) {
      return (
            <div className="bg-white rounded-[12px] shadow-md flex flex-col p-4 gap-[18px]">
                  <p className="text-sm underline font-bold text-primary-500">{invoice}</p>
                  <hr className="border-dashed border-neutral-400" />

                  {/* detail product */}
                  <div className="flex flex-row justify-between items-center">
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

                  </div>

                  <hr className="border-dashed border-neutral-400" />

                  {/* the review */}
                  <div className="flex flex-col gap-3 text-sm text-neutral-700">
                        <p className="font-semibold">Ulasan Saya:</p>
                        <div className="inline-flex gap-[5px] items-center">
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <FaStar color="#FFAB0D" size={18} />
                              <p className="font-bold text-xs sm:text-sm text-neutral-700">{rating}</p>
                        </div>
                        <p>{reviewText}</p>

                        <div className="inline-flex gap-2 mt-5">
                              {images.map((item, index) => (
                                    <Image
                                          key={index}
                                          src={item}
                                          alt="shoes-dummy"
                                          width={64}
                                          height={61}
                                          className="rounded-[12px]"
                                    />
                              ))}
                        </div>
                  </div>
            </div>
      )
}