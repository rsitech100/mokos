'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchCart, CartMerchant } from "@/lib/api/fetch-cart";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export function PopupCart() {
      const [cartMerchants, setCartMerchants] = useState<CartMerchant[]>([]);
      const [loading, setLoading] = useState(true);
      const [productImages, setProductImages] = useState<Record<string, string>>({});

      useEffect(() => {
            loadCart();
      }, []);

      const loadCart = async () => {
            try {
                  setLoading(true);
                  const response = await fetchCart();
                  if (response.success) {
                        const imageMap: Record<string, string> = {};
                        const allItems = response.data.flatMap(m => m.productsCart).slice(0, 4);
                        
                        const imagePromises = allItems.map(async (item) => {
                              const productId = item.productPrice.product.id;
                              try {
                                    const productResponse = await fetch(
                                          `${BASE_API}/v1/product?id=${productId}`,
                                          { 
                                                credentials: 'include', 
                                                cache: 'no-store',
                                                headers: {
                                                      'Cache-Control': 'no-cache',
                                                      'Pragma': 'no-cache'
                                                }
                                          }
                                    );
                                    if (productResponse.ok) {
                                          const productData = await productResponse.json();
                                          if (productData.success && productData.data && productData.data.length > 0) {
                                                const product = productData.data[0];
                                                if (product.pictureFiles && product.pictureFiles.length > 0) {
                                                      const imageUrl = `${BASE_API}${product.pictureFiles[0].uri}`;
                                                      imageMap[productId] = imageUrl;
                                                }
                                          }
                                    }
                              } catch (error) {
                                    console.error(`Error fetching product ${productId}:`, error);
                              }
                        });
                        
                        // Wait for all images to be fetched
                        await Promise.all(imagePromises);
                        console.log('Final imageMap:', imageMap);
                        
                        setProductImages(imageMap);
                        setCartMerchants(response.data);
                  }
            } catch (error) {
                  console.error('Error loading cart:', error);
            } finally {
                  setLoading(false);
            }
      };

      const getTotalItems = () => {
            return cartMerchants.reduce((total, merchant) => {
                  return total + merchant.productsCart.length;
            }, 0);
      };

      const totalItems = getTotalItems();
      const displayItems = cartMerchants.flatMap(m => m.productsCart).slice(0, 4);

      return (
            <div className="z-50 bg-white p-6 shadow-md rounded-lg absolute gap-5 w-[520px]">
                  {loading ? (
                        <div className="flex flex-col gap-3">
                              {[...Array(3)].map((_, i) => (
                                    <div key={i} className="animate-pulse flex gap-3">
                                          <div className="w-[60px] h-[60px] bg-gray-300 rounded"></div>
                                          <div className="flex-1 flex flex-col gap-2">
                                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  ) : totalItems === 0 ? (
                        <div className="flex flex-col">
                              <p className="text-lg text-neutral-700 font-bold">Keranjang (0)</p>
                              <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                              <div className="flex flex-col items-center justify-center p-3">
                                    <Image src="/image/popup/cart-empty.svg" alt="cart-empty" width={140} height={169} />
                                    <p className="font-bold text-sm text-neutral-700 mt-5">Keranjang masih kosong</p>
                                    <p className="text-neutral-700 text-sm">Yuk, cari barang yang kamu inginkan</p>
                              </div>
                        </div>
                  ) : (
                        <div className="flex flex-col">
                              <div className="flex flex-row justify-between gap-40 items-center whitespace-nowrap">
                                    <p className="text-lg text-neutral-700 font-bold">Keranjang ({totalItems})</p>
                                    <Link href="/cart" passHref>
                                          <p className="text-sm font-semibold text-primary-500 hover:underline">Lihat Semua</p>
                                    </Link>
                              </div>
                              <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                              {displayItems.map((item) => {
                                    const product = item.productPrice.product;
                                    const productId = product.id;
                                    
                                    // Use fetched image from /v1/product or fallback
                                    const productImage = productImages[productId] ||
                                          (product.pictureFiles && product.pictureFiles.length > 0
                                                ? `${BASE_API}${product.pictureFiles[0].uri}`
                                                : '/image/product/shoes-dummy.svg');

                                    const itemTotal = new Intl.NumberFormat('id-ID', {
                                          style: 'currency',
                                          currency: 'IDR',
                                          minimumFractionDigits: 0,
                                    }).format(item.finalTotalPrice);

                                    return (
                                          <div className="flex flex-col" key={item.id}>
                                                <div className="flex flex-row justify-between w-full">
                                                      <div className="flex flex-row gap-3">
                                                            <Image src={productImage} alt={product.title} width={60} height={60} className="w-[60px] rounded-lg" unoptimized />
                                                            <div>
                                                                  <p className="text-sm text-neutral-700 whitespace-nowrap">{product.title}</p>
                                                                  <p className="text-sm text-neutral-600">{item.qty} Barang</p>
                                                            </div>
                                                      </div>
                                                      <div className="flex items-center text-right">
                                                            <p className="font-extrabold text-base text-neutral-700 whitespace-nowrap">{itemTotal}</p>
                                                      </div>
                                                </div>
                                                <div className="border-t-[1px] border-dashed border-neutral-400 my-2"></div>
                                          </div>
                                    );
                              })}
                        </div>
                  )}
            </div>
      )
}