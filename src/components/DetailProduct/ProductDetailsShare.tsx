import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";

type SocmedProductsType = {
      icon: React.ReactNode;
      alt: string;
}

const SocmedProductsItem: SocmedProductsType[] = [
      {icon: <FaFacebookF color="#315879" size={18} />, alt: 'facebook'},
      {icon: <FaInstagram color="#315879" size={18} />, alt: 'instagram'},
      {icon: <FaTiktok color="#315879" size={18} />, alt: 'tiktok' },
      {icon: <FaWhatsapp color="#315879" size={18} />, alt: 'whatsapp'}
]
export function ProductDetailsShare() {
      return (
            <div className="inline-flex gap-3 items-center">
                  <p className="text-sm text-neutral-700">Share</p>
                  {SocmedProductsItem.map((item) => (
                        <div className="bg-primary-100 p-3 rounded-full" key={item.alt}>
                              {item.icon}
                        </div>
                  ))}
            </div>
      )
}