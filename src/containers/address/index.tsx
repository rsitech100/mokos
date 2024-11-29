import { AddressList } from "@/components/Address/AddressList";
import { AddAddressButton } from "@/components/Buttons/AddAdressButton";
import { SearchAddressButton } from "@/components/Buttons/SearchAddressButton";

export function AddressSection() {
      return (
            <div className="flex flex-col shadow-md p-6 rounded-lg w-full gap-6">
                  <div className="flex flex-col md:flex-row w-full justify-between gap-4">
                  <AddAddressButton />
                  <SearchAddressButton />
                  </div>
                  <AddressList />
            </div>
      )
}