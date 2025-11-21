'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useProductDetail } from "@/context/ProductDetailContext";
import { addToCart } from "@/lib/api/fetch-cart";
import toast from "react-hot-toast";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function ProductDetailsCart() {
      const [quantity, setQuantity] = useState(1);
      const [addingToCart, setAddingToCart] = useState(false);
      const [buyingNow, setBuyingNow] = useState(false);
      const { product, loading } = useProductDetail();
      const router = useRouter();

      const handleDecrement = () => {
            if (quantity > 1) setQuantity(quantity - 1);
      };

      const handleIncrement = () => {
            setQuantity(quantity + 1);
      };

      const handleAddToCart = async () => {
            if (!product) return;
            
            // Get productPriceId from productPrices array (use the main/default one)
            const productPriceId = product.productPrices && product.productPrices.length > 0
                  ? product.productPrices.find(p => p.isMainView)?.id || product.productPrices[0].id
                  : product.id; // Fallback to product id
            
            setAddingToCart(true);
            try {
                  const response = await addToCart({
                        productPriceId: productPriceId,
                        qty: quantity,
                  });

                  if (response.success) {
                        toast.success("Produk berhasil ditambahkan ke keranjang");
                        setQuantity(1); // Reset quantity
                        // Trigger cart update event
                        window.dispatchEvent(new Event('cartUpdated'));
                  } else {
                        throw new Error(response.message || "Gagal menambahkan ke keranjang");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setAddingToCart(false);
            }
      };

      const handleBuyNow = async () => {
            if (!product) return;
            
            // Get productPriceId from productPrices array (use the main/default one)
            const productPriceId = product.productPrices && product.productPrices.length > 0
                  ? product.productPrices.find(p => p.isMainView)?.id || product.productPrices[0].id
                  : product.id; // Fallback to product id
            
            setBuyingNow(true);
            try {
                  // Add to cart first
                  const response = await addToCart({
                        productPriceId: productPriceId,
                        qty: quantity,
                  });

                  if (response.success) {
                        // Redirect to cart
                        router.push('/cart');
                  } else {
                        throw new Error(response.message || "Gagal memproses pesanan");
                  }
            } catch (error) {
                  const msg = error instanceof Error ? error.message : "Terjadi kesalahan";
                  toast.error(msg);
            } finally {
                  setBuyingNow(false);
            }
      };

      if (loading || !product) {
            return null;
      }

      const totalPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
      }).format(product.price * quantity);

      const productImage = product.pictureFiles && product.pictureFiles.length > 0 
            ? `${BASE_API}${product.pictureFiles[0].uri}` 
            : '/image/detail-product/dummy-2.svg';

      return (
            <>
                  <div className="z-50 shadow-md fixed bottom-0  bg-neutral-100 w-full border-t border-t-neutral-400">
                        <div className="flex flex-row justify-center md:justify-between items-center px-5 md:px-20 py-5 w-full mx-auto max-w-[1440px]">
                              <div className="hidden md:flex flex-row gap-3 items-center">
                                    <div className="relative w-12 h-12 rounded overflow-hidden">
                                          <Image 
                                                src={productImage} 
                                                alt={product.title} 
                                                fill
                                                className="object-cover"
                                                unoptimized
                                          />
                                    </div>
                                    <p className="text-sm text-neutral-700 font-medium line-clamp-2 max-w-[200px]">
                                          {product.title}
                                    </p>
                              </div>
                              <div className="hidden md:flex flex-row gap-5">
                                    <div className="inline-flex border border-neutral-400 px-4 py-2 gap-4 rounded-xl">
                                          <FaMinus size={24} color="#9C9C9C" onClick={handleDecrement} className="cursor-pointer" />
                                          {quantity}
                                          <FaPlus size={24} color="#315879" onClick={handleIncrement} className="cursor-pointer" />
                                    </div>
                                    <div className="flex flex-col gap-[3px]">
                                          <p className="text-xs text-neutral-700">Total Harga</p>
                                          <p className="text-base font-extrabold text-neutral-700">{totalPrice}</p>
                                    </div>
                              </div>

                              <div className="inline-flex gap-3">
                                    <button 
                                          onClick={handleBuyNow}
                                          disabled={buyingNow}
                                          className={`rounded-2xl px-10 py-3 text-primary-500 border border-primary-500 bg-neutral-100 text-xs sm:text-sm font-semibold transition-colors ${
                                                buyingNow ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-50"
                                          }`}
                                    >
                                          {buyingNow ? "Memproses..." : "Beli Sekarang"}
                                    </button>
                                    <button 
                                          onClick={handleAddToCart}
                                          disabled={addingToCart}
                                          className={`rounded-2xl px-10 py-3 text-neutral-100 border bg-primary-500 text-xs sm:text-sm font-semibold transition-colors ${
                                                addingToCart ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-600"
                                          }`}
                                    >
                                          {addingToCart ? "Menambahkan..." : "Tambah ke Keranjang"}
                                    </button>
                              </div>
                        </div>
                  </div>
            </>
      )
}