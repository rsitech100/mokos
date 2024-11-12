import Image from "next/image";

export function CategoryButton() {
      return (
            <div className="bg-transparent border border-neutral-400 hidden lg:flex flex-row rounded-3xl px-6 py-2 items-center gap-3 cursor-pointer">
                  <Image src="/image/nav/category.svg" alt="category-icon" width={20} height={20} />
                  <p className="text-sm text-neutral-700">Kategori</p>
            </div>
      )
}