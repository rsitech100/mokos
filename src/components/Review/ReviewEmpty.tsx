import Image from "next/image";
import Link from "next/link";

export function ReviewEmpty() {
      return (
            <div className="hidden flex-col gap-6 items-center justify-center py-5">
                  <Image src="/image/review/review-empty.svg" alt="review-empty" width={245} height={212} />
                  <div className="text-center">
                        <p className="font-bold text-base text-neutral-700">Ulasan Masih Kosong</p>
                        <p className="text-base text-neutral-700">Cari barang dulu agar bisa memberikan ulasan</p>
                  </div>
                  <Link href="/category" className="bg-primary-500 text-neutral-100 py-3 px-12 rounded-3xl" passHref>
                        Cari Barang
                  </Link>
            </div>
      )
}