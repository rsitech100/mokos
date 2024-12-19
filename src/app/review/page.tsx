import { ReviewSection } from "@/containers/review";

export default function ReviewPage() {
      return (
            <main className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Ulasan</h2>
                  <ReviewSection />
            </main>
      )
}