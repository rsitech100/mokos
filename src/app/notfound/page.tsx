import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
      return (
            <main className="flex justify-center items-center h-screen text-center flex-col gap-6">
                  <Image src="/image/additional/404.svg" alt="404 not found" width={160} height={160} />
                  <div className="flex flex-col">
                        <p className="text-base font-bold text-neutral-700">Halaman tidak ditemukan</p>
                        <p className="text-base text-neutral-700">kami tidak dapat menemukan halaman</p>
                  </div>
                  <Link href="/" className="bg-primary-500 text-neutral-100 text-sm font-semibold py-2.5 px-12 rounded-3xl" passHref>
                        Kembali ke Beranda
                  </Link>
            </main>
      )
}