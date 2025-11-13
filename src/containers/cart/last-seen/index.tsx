import { ProductList } from "@/components/Product/ProductList";

export function LastSeenCartSection() {
      return (
            <section className="flex flex-col gap-4">
                  <h2 className="text-neutral-700 text-2xl font-extrabold">Terakhir Dilihat</h2>
                  <ProductList gridClass="grid-cols-2 md:grid-cols-4" FeaturedProducts={4} />
            </section>
      );
}
