import { AddressList } from "@/components/Address/AddressList";
import { AddAddressButton } from "@/components/Buttons/AddAddressButton";
import { SearchAddressButton } from "@/components/Buttons/SearchAddressButton";
import { WithLoading } from "@/utils/WithLoading";
import { SectionSkeleton } from "@/components/Skeleton/SectionSkeleton";

export function AddressSection() {
      return (
            <WithLoading isLoading={true} skeleton={<SectionSkeleton />}>
                  <div className="flex flex-col shadow-md p-6 rounded-lg w-full gap-6">
                        <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                              <AddAddressButton />
                              <SearchAddressButton />
                        </div>
                        <AddressList />
                  </div>
            </WithLoading>

      )
}