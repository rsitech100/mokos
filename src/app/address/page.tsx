import { AddressSection } from "@/containers/address";

export default function ProfilePage() {
      return (
            <div className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Daftar Alamat</h2>
                  <AddressSection />
            </div>
      )
}