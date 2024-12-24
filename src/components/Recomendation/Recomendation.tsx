import { ProductList } from "../Product/ProductList";

export function RecomendationSection() {
      return (
            <div className="flex flex-col gap-6">
                  <h2 className="text-2xl font-extrabold text-neutral-700">Rekomendasi untuk kamu</h2>
                  <ProductList gridClass="grid-cols-2 md:grid-cols-5" FeaturedProducts={5} />

            </div>
      )
}