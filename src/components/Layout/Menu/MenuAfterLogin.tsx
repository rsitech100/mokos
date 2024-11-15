import { NotificationButton } from "@/components/Buttons/NotificationButton";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";

interface isOpenProps {
      isOpen: boolean;
}

type MenuItemType = {
      href?: string;
      icon: string;
      alt: string;
      title: string;
}

const MenuItem: MenuItemType[] = [
      { icon: '/image/nav/menu/user.svg', alt: 'profile', title: 'Profil' },
      { icon: '/image/nav/menu/address.svg', alt: 'address', title: 'Daftar Alamat' },
      { icon: '/image/nav/menu/order.svg', alt: 'order', title: 'Daftar Pesanan' },
      { icon: '/image/nav/menu/review.svg', alt: 'review', title: 'Ulasan' },
      { icon: '/image/nav/menu/notification.svg', alt: 'notification', title: 'Notifikasi' },
]
export function MenuAfterLogin({ isOpen }: isOpenProps) {
      return (
            <div className={`lg:flex flex-row gap-5 justify-start bg-white ${isOpen ? 'items-start flex bg-white h-screen z-50 px-5' : 'hidden '}`}>
                  {isOpen ?
                        (
                              <div className="flex flex-col w-full max-w-[250px] gap-5">
                                    <div className="flex flex-row">
                                          <div className="flex flex-row gap-3">
                                                <Image src="/image/nav/menu/profile-icon-dummy.svg" alt="profile icon" height={48} width={48} className="w-12" />
                                                <div className="flex flex-col gap-1">
                                                      <h5 className="font-bold text-neutral-700 text-sm">Martin Paes</h5>
                                                      <div className="text-info-300 bg-info-100 px-3 py-[6px] rounded-lg font-semibold text-xs">Terverifikasi</div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="border-t-[1px] border-dashed border-neutral-400"></div>
                                    <div className="flex flex-col">
                                          {MenuItem.map((item) => (
                                                <div className="flex flex-row gap-3 p-3 hover:bg-primary-100 hover:rounded-xl cursor-pointer" key={item.alt}>
                                                      <Image src={item.icon} alt={item.alt} width={24} height={24} className="w-6" />
                                                      <p className="text-sm text-neutral-700 hover:text-primary-500 hover:font-semibold">{item.title}</p>
                                                </div>
                                          ))}
                                    </div>
                              </div>
                        ) : (
                              <div className="flex  items-center">
                                    <NotificationButton />
                                    <hr className="bg-neutral-400 w-8 rotate-90 hidden lg:flex" />
                                    <div className="bg-transparent border border-neutral-400 p-2 flex flex-row gap-14 items-center justify-between rounded-3xl">
                                          <div className="flex flex-row gap-1">
                                                <Image src="/image/nav/user-icon.svg" alt="user-icon" width={20} height={20} className="w-5 h-5" />
                                                <p className="text-sm font-semibold text-neutral-700 whitespace-nowrap">Martin Paes</p>
                                          </div>
                                          <IoIosArrowDown color="#191717" />
                                    </div>
                              </div>
                        )}

            </div>
      )
} 