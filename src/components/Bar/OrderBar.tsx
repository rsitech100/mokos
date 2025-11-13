import Link from "next/link";

type OrderNavigationType = {
      title: string;
      href: string;
};

const OrderNavigationItems: OrderNavigationType[] = [
      { title: "Semua", href: "/order/semua" },
      { title: "Belum Bayar", href: "/order/belum-bayar" },
      { title: "Sedang Dikemas", href: "/order/sedang-dikemas" },
      { title: "Dikirim", href: "/order/dikirim" },
      { title: "Selesai", href: "/order/selesai" },
      { title: "Dibatalkan", href: "/order/dibatalkan" },
];

export function OrderBar() {
      return (
            <div className="flex flex-col overflow-hidden">
                  {/* Wrapper for scrolling */}
                  <div className="flex flex-row gap-8 justify-start lg:justify-around overflow-x-auto w-full scrollbar-hide">
                        {OrderNavigationItems.map((item) => (
                              <Link
                                    href={item.href}
                                    key={item.title}
                                    className="text-sm text-neutral-700 whitespace-nowrap"
                                    passHref
                              >
                                    {item.title}
                              </Link>
                        ))}
                  </div>
                  <div className="h-[1px] w-full bg-neutral-400 mt-2"></div>
            </div>
      );
}
