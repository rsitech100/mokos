import { FilterButton } from "@/components/Buttons/FilterButton";
import { SortFilterButton } from "@/components/Buttons/SortFilterButton";
import { FilterByTime } from "@/components/Category/Filter/FilterByTime";
import { ListFilterCategory } from "@/components/Category/ListFilterCategory";
import { ProductDisplay } from "@/components/Category/ProductDisplay";
import { Pagination } from "@/components/Pagination/Pagination";
import { productsData } from "@/lib/product-data";

export function CategorySection() {
      return (
            <div className="flex flex-col lg:flex-row gap-4 max-w-[1440px] w-full mx-auto">
                  <div className="flex lg:hidden flex-row w-full gap-3">
                        <FilterButton />
                        <SortFilterButton />
                  </div>
                  <div className="flex flex-col gap-3">
                  <p className="text-neutral-700 font-bold text-base">Filter</p>     
                  <ListFilterCategory display="hidden lg:flex max-w-[180px]" />
                  </div>
                  <div className="flex flex-col max-w-[1000px] w-full gap-4">
                        <div className="flex flex-row items-center justify-between">
                              <p className="text-neutral-700 text-sm">Menampilkan 1 - 15 barang dari {productsData.length} produk untuk &quot;Sepatu&quot;</p>
                              <FilterByTime />
                        </div>
                        <ProductDisplay />
                        <Pagination totalProducts={productsData.length} rowsPerPageOptions={[3, 6, 9]} />
                  </div>
            </div>
      )
}