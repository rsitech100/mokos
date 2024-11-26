import { AddressList } from "@/components/Address/AddressList";
import { AddAddressButton } from "@/components/Buttons/AddAdressButton";
import { SearchAddressButton } from "@/components/Buttons/SearchAddressButton";

export function AddressSection() {
      return (
            <div className="flex flex-col shadow-md p-6 rounded-lg w-full gap-6">
                  <div className="inline-flex w-full justify-between">
                  <AddAddressButton />
                  <SearchAddressButton />
                  </div>
                  <AddressList />
            </div>
      )
}