import Image from "next/image";
import Link from "next/link";

export function FailedPayment() {
      return (
            <section className="hidden flex-col gap-4 items-center justify-center text-center">
                  <Image src="/image/payment/failed-payment.svg" alt="success-payment" width={72} height={72} />
                  <h3 className="font-extrabold text-neutral-700 text-xl">Pembayaran Gagal!</h3>
                  <p className="text-sm text-neutral-700">Mohon maaf pembayaran kamu tidak dapat diproses</p>
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