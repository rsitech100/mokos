import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";
import { CategorySection } from "@/containers/category";

export default function CategoryPage() {
      const breadcrumbItems = [
            { label: "Beranda", href: "/", current: false },
            { label: "Fashion", href: "/fashion", current: false },
            { label: "Sepatu", href: "/fashion/sepatu", current: true },
      ];


      return (
            <main className="flex flex-col lg:py-12 p-5 lg:px-20 gap-6">
                  <Breadcrumb items={breadcrumbItems} />
                  <CategorySection />
            </main>
      )
}