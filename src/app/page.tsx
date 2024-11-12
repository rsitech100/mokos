import { Hero } from "@/containers/home/hero-section";
import { ProductsSection } from "@/containers/home/products-section";

export default function Home() {
  return (
    <main className="flex flex-col max-w-[1440px] w-full mx-auto py-5 lg:py-14">
      <Hero />
      <ProductsSection />
          </main>
  );
}
