import Image from "next/image";
import Link from "next/link";

const NotificationDummy = () => {
      return (
            <div className="flex flex-row bg-primary-100 p-4 rounded-lg items-center justify-start gap-3">
                  <div className="bg-white p-2 w-12 rounded-lg">
                        <Image src="/image/popup/order-notification.svg" alt="order-notification" width={24} height={24} className="w-6" />
                  </div>
                  <div className="flex flex-col gap-[6px]">
                        <p className="text-base text-neutral-700 font-bold">Pesanan Diproses</p>
                        <p className="text-sm text-neutral-700">ID Pesanan #I234567890 telah diproses.. <span className="hidden">. Segera proses untuk pengiriman.</span></p>
                        <p className="text-sm text-neutral-500">1 Jam Lalu </p>
                  </div>
            </div>
      )
}
export function PopupNotification() {
      return (
            <div className="z-50 bg-white p-6 shadow-md rounded-lg absolute gap-5 w-[420px]">
                  <div className="flex flex-row justify-between gap-40 items-center whitespace-nowrap">
                        <p className="text-lg text-neutral-700 font-bold">Notifikasi</p>
                        <Link href="/notification" passHref>
                        <p className="text-sm font-semibold text-primary-500 hover:underline">Lihat Semua</p>                        
                        </Link>
                  </div>
                  <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>

                  {/* PopUp Cart Fill */}
                  <div className="hidden">
                        <p className="text-sm text-neutral-600">Today</p>
                        <div className="flex flex-col gap-5 mt-2">
                              <NotificationDummy />
                              <NotificationDummy />
                              <NotificationDummy />
                        </div>
                  </div>


                  {/* PopUp Cart Empty */}
                  <div>
                        <div className="flex flex-col p-3 items-center justify-center">
                              <Image src="/image/popup/notification-empty.svg" alt="notification-empty" width={183} height={155} />
                              <p className="font-bold text-sm text-neutral-700 mt-8">Notifikasi masih kosong</p>
                              <p className="text-neutral-700 text-sm">Notifikasimu akan tampil di sini</p>
                        </div>
                  </div>

            </div>
      )
}