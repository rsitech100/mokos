'use client';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa6";
import { useProductDetail } from "@/context/ProductDetailContext";

type SocmedProductsType = {
      icon: React.ReactNode;
      alt: string;
      onClick: () => void;
}

export function ProductDetailsShare() {
      const { product } = useProductDetail();

      if (!product) return null;

      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const shareText = `Cek produk ini: ${product.title}`;
      const encodedText = encodeURIComponent(shareText);
      const encodedUrl = encodeURIComponent(currentUrl);

      const handleFacebookShare = () => {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
            window.open(facebookUrl, '_blank', 'width=600,height=400');
      };

      const handleInstagramShare = () => {
            if (navigator.clipboard) {
                  navigator.clipboard.writeText(currentUrl);
                  alert('Link produk berhasil disalin! Anda bisa mengirimnya di Instagram.');
            }
      };

      const handleTiktokShare = () => {
            if (navigator.clipboard) {
                  navigator.clipboard.writeText(currentUrl);
                  alert('Link produk berhasil disalin! Anda bisa mengirimnya di TikTok.');
            }
      };

      const handleWhatsappShare = () => {
            const whatsappUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
            window.open(whatsappUrl, '_blank');
      };

      const SocmedProductsItem: SocmedProductsType[] = [
            {
                  icon: <FaFacebookF color="#315879" size={18} />, 
                  alt: 'facebook',
                  onClick: handleFacebookShare
            },
            {
                  icon: <FaInstagram color="#315879" size={18} />, 
                  alt: 'instagram',
                  onClick: handleInstagramShare
            },
            {
                  icon: <FaTiktok color="#315879" size={18} />, 
                  alt: 'tiktok',
                  onClick: handleTiktokShare
            },
            {
                  icon: <FaWhatsapp color="#315879" size={18} />, 
                  alt: 'whatsapp',
                  onClick: handleWhatsappShare
            }
      ];

      return (
            <div className="inline-flex gap-3 items-center">
                  <p className="text-xs sm:text-sm text-neutral-700">Share</p>
                  {SocmedProductsItem.map((item) => (
                        <button
                              key={item.alt}
                              onClick={item.onClick}
                              className="bg-primary-100 p-3 rounded-full hover:bg-primary-200 transition-colors cursor-pointer"
                              aria-label={`Share to ${item.alt}`}
                        >
                              {item.icon}
                        </button>
                  ))}
            </div>
      )
}