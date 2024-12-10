import { reviewData } from "@/lib/review-data";
import { ReviewCard } from "./ReviewCard";

export function ReviewList() {
      return (
            <div className="flex flex-col gap-4">
                {reviewData.map((review) => (
                  <ReviewCard key={review.id} name={review.name} rating={review.rating} date={review.date} reviewText={review.reviewText} images={review.images} />
                ))}
            </div>
      )
}