import Image from "next/image";
import { AddAddressButton } from "../Buttons/AddAddressButton";

export function AddressEmpty() {
      return (
            <div className="hidden flex-col items-center justify-center w-full gap-6">
                  <Image src="/image/address/address-empty.svg" alt="adress-empty" width={308} height={240} className="w-[380px] h-[240px]" />
                  <div className="flex flex-col text-center">
                        <p className="text-neutral-700 text-base font-bold">Daftar alamat masih kosong</p>
                        <p className="text-neutral-700 text-base">Tambahkan alamat untuk memudahkan pesananmu</p>
                  </div>
                  <AddAddressButton />
            </div>
      )
}