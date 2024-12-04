import Link from "next/link";
type OrderNavigationType = {
      title: string;
      href: string;
}

const OrderNavigationItems: OrderNavigationType[] = [
      { title: 'Semua', href: '/order/semua' },
      { title: 'Belum Bayar', href: '/order/belum-bayar' },
      { title: 'Sedang Dikemas', href: '/order/sedang-dikemas' },
      { title: 'Dikirim', href: '/order/dikirim' },
      { title: 'Selesai', href: '/order/selesai' },
      { title: 'Dibatalkan', href: '/order/dibatalkan' },
]

export function OrderNavigation() {
      return (
            <div className="flex flex-col">
                  <div className="flex flex-row gap-8 justify-around">
                        {OrderNavigationItems.map((item) => (
                              <Link href={item.href} key={item.title} className="text-sm text-neutral-700" passHref>
                                    {item.title}
                              </Link>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400 mt-2"></div>
            </div>
      )
}