import { reviewData } from "@/lib/review-data";
import { ProductCardBeforeReview } from "./ProductCardBeforeReview";

export function ProductListBeforeReview() {
      return (
            <div className="flex flex-col gap-5">
                  {reviewData.map((item) => (
                        <ProductCardBeforeReview
                              key={item.id}
                              invoice={item.invoice}
                              images={item.images}
                              productName={item.productName}
                              quantity={item.quantity}
                              price={item.price}
                              storeName={item.storeName}
                        />
                  ))}
            </div>
      )
}