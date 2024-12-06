import { NotificationType } from "@/types/notification";
import Image from "next/image";

export function NotificationCard({title, description, time}: NotificationType) {
      return (
            <div className="flex flex-row w-full gap-3.5 bg-primary-100 p-4 items-center rounded-none md:rounded-[12px]">
                  <div className="bg-white p-2 rounded-[12px]">
                        <Image src="/image/notification/order-icon.svg" alt="order-icon" width={24} height={24} className="w-6" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                        <p className="font-bold text-sm md:text-base text-neutral-700">{title}</p>
                        <p className="text-xs sm:text-sm text-neutral-700">{description}</p>
                        <p className="text-xs sm:text-sm text-neutral-500">{time}</p>
                  </div>
            </div>
      )
}