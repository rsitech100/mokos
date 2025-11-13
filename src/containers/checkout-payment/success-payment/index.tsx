import Image from "next/image";
import Link from "next/link";

export function SuccessPayment() {
      return (
            <section className="flex flex-col gap-4 items-center justify-center text-center">
                  <Image src="/image/payment/success-payment.svg" alt="success-payment" width={72} height={72} />
                  <h3 className="font-extrabold text-neutral-700 text-lg md:text-xl">Pembayaran Berhasil!</h3>
                  <p className="text-sm text-neutral-700">Silahkan ke daftar pesanan untuk melihat status pesanan</p>
                  <Link href="/order" passHref>
                        <button className="rounded-3xl bg-primary-500 py-3 text-neutral-100 px-10 font-semibold text-sm">
                              Lihat Daftar Pesanan
                        </button>
                  </Link>
                  <Link href="/" passHref className="font-bold text-primary-500 text-sm">
                        Kembali ke Beranda
                  </Link>
            </section>
      )
}