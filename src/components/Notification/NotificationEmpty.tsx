import Image from "next/image";

export function NotificationEmpty() {
      return (
            <div className="hidden flex-col items-center justify-center w-full gap-6 py-10">
                  <Image src="/image/notification/notification-empty.png" alt="notification-empty" width={206} height={170} className="w-[206px] h-[174px]" />
                  <div className="flex flex-col text-center">
                        <p className="text-neutral-700 text-base font-bold">Notifikasi masih kosong</p>
                        <p className="text-neutral-700 text-base">Notifikasimu akan tampil di sini</p>
                  </div>
            </div>
      )
}