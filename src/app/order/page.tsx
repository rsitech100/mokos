// import { OrderSection } from "@/containers/order";
import { WithLoading } from "@/utils/WithLoading";
import { SectionSkeleton } from "@/components/Skeleton/SectionSkeleton";

export default function OrderPage() {
      return (
            <main className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Daftar Pesanan</h2>
                  <WithLoading isLoading={true} skeleton={<SectionSkeleton />}>
                        {/* <OrderSection /> */}
                        &nbsp;
                  </WithLoading>
            </main>
      )
}