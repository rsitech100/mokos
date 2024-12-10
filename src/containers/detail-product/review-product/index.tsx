import { Pagination } from "@/components/Pagination/Pagination";
import { ReviewBar } from "@/components/Review/ReviewBar";
// import { ReviewEmpty } from "@/components/Review/ReviewEmpty";
import { ReviewList } from "@/components/Review/ReviewList";
import { ReviewTitle } from "@/components/Review/ReviewTitle";
import { reviewData } from "@/lib/review-data";

export function ReviewProductSection() {
      return (
            <section className="flex flex-col gap-4">
                  <ReviewTitle />
                  <ReviewBar />
                  <ReviewList />
                  {/* <ReviewEmpty /> */}
                  <Pagination totalProducts={reviewData.length} rowsPerPageOptions={[3, 6, 9]} />
            </section>
      )
}