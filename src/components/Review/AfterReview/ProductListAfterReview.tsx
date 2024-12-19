import { reviewData } from "@/lib/review-data";
import { ProductCardAfterReview } from "./ProductCardAfterReview";

export function ProductListAfterReview() {
      return (
            <div className="flex flex-col gap-5">
                  {reviewData.map((item) => (
                        <ProductCardAfterReview
                              key={item.id}
                              invoice={item.invoice}
                              images={item.images}
                              productName={item.productName}
                              quantity={item.quantity}
                              price={item.price}
                              storeName={item.storeName}
                              rating={item.rating}
                              reviewText={item.reviewText}
                        />
                  ))}
            </div>
      )
}