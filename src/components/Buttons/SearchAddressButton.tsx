import Image from "next/image";
export function SearchAddressButton() {
      return (
            <div className="flex flex-row bg-transparent border border-neutral-400 rounded-xl gap-3 px-2 py-2 lg:w-[221px]">
                  <Image src="/image/nav/search-icon.svg" alt="search-icon" width={16} height={16} />
                  <input placeholder="Cari Alamat" className="outline-none text-neutral-700 w-full text-sm"/>
            </div>
      )
}