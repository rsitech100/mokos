import Image from "next/image";

export default function LostConnectionPage() {
      return (
            <main className="flex justify-center items-center h-screen text-center flex-col gap-6">
                  <Image src="/image/additional/lost-connection.svg" alt="lost-connection" width={160} height={160} />
                  <div className="flex flex-col">
                        <p className="text-base font-bold text-neutral-700">Tidak Ada Koneksi Internet</p>
                        <p className="text-base text-neutral-700">Silakan periksa koneksi kamu dan coba lagi</p>
                  </div>
                  <button className="bg-primary-500 text-neutral-100 text-sm font-semibold py-2.5 px-12 rounded-3xl">Coba lagi</button>
            </main>
      )
}