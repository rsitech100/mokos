"use client";
import { usePathname } from "next/navigation"
import { disableNavWithFooter } from "@/utils/disableNavWithFooter";
import Image from "next/image";
import Link from "next/link";
import { ImagesIconType } from "@/types/images";

const SocmedIcons: ImagesIconType[] = [
  { image: '/image/footer/instagram-icon.svg', alt: 'instagram-icon', href: 'instagram.com' },
  { image: '/image/footer/facebook-icon.svg', alt: 'facebook-icon', href: 'facebook.com' },
  { image: '/image/footer/tiktok-icon.svg', alt: 'tiktok-icon', href: 'tiktok.com' },
  { image: '/image/footer/youtube-icon.svg', alt: 'youtube-icon', href: 'youtube.com' },
]

const menus = [
  {
    title: "E-Commerce",
    subMenus: ["Tentang E-Commerce", "Syarat dan Ketentuan", "Kebijakan Privasi", "Blog"],
  },
  {
    title: "Penjual",
    subMenus: ["Mulai Berjualan"],
  },
  {
    title: "Bantuan",
    subMenus: ["Cara Bertransaksi", "Cara Pembayaran", "Cara Registrasi"],
  },
];

export function Footer() {
  const path = usePathname()

  return (
    <>
      {!disableNavWithFooter.includes(path) && (
        <footer className="border border-t-neutral-400">
          <div className="flex flex-col lg:flex-row justify-between px-5 lg:px-20 py-12 max-w-[1440px] w-full mx-auto gap-10 lg:gap-0">
            <div className="flex flex-col w-full lg:max-w-[325px] gap-3">
              <Image
                src="/image/nav/profile-dummy.svg"
                alt="profile-dummy"
                width={48}
                height={48}
              />
              <p className="text-xs sm:text-sm text-neutral-700">
                Lorem ipsum dolor sit amet consectetur. Lacinia ut consequat lacus
                donec vel. Vitae non mauris turpis nisl lectus morbi. Orci duis sit
                sed nibh ornare aliquam scelerisque nisl sed. Vitae amet tincidunt
                consectetur morbi.
              </p>
              <div className="flex flex-col gap-5">
                <p className="font-bold text-sm md:text-base text-neutral-700">Ikuti Kami</p>
                <div className="flex flex-row gap-6 items-center">
                  {SocmedIcons.map((item) => (
                    <Link href={item.href} key={item.alt}>
                      <Image src={item.image} alt={item.image} width={48} height={48} className="w-10 sm:w-12" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-10">
              {menus.map((menu, index) => (
                <div key={index} className="flex flex-col text-neutral-700 gap-3 w-[180px] cursor-pointer">
                  <p className="text-sm sm:text-base font-extrabold">{menu.title}</p>
                  <ul className="text-xs sm:text-sm leading-snug space-y-5">
                    {menu.subMenus.map((subMenu, subIndex) => (
                      <li key={subIndex}>{subMenu}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </footer>
      )}
    </>

  );
}
