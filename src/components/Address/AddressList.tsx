import { AddressCard } from "./AddressCard";
import { addressData } from "@/lib/address-data";

export function AddressList() {
      return (
            <div className="flex flex-col gap-4">
                  {addressData.map((item) => (
                        <AddressCard
                              key={item.id}
                              label={item.label}
                              name={item.name}
                              telephone={item.telephone}
                              address={item.address} />
                  ))}
            </div>
      )
}