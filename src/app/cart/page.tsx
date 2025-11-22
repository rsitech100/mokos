'use client';
import { TotalShoppingBox } from "@/components/Cart/TotalShoppingBox";
import { CartSection } from "@/containers/cart";
import { LastSeenCartSection } from "@/containers/cart/last-seen";
import { CartProvider } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { fetchCart } from "@/lib/api/fetch-cart";
import { CartItem } from "@/types/cart";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

export default function CartPage() {
      const [cartItems, setCartItems] = useState<CartItem[]>([]);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            loadCartData();
      }, []);

      const loadCartData = async () => {
            try {
                  setLoading(true);
                  const response = await fetchCart();
                  if (response.success) {
                        // Fetch product images
                        const imageMap: Record<string, string> = {};
                        const allItems = response.data.flatMap(m => m.productsCart);

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
                                                      imageMap[productId] = `${BASE_API}${product.pictureFiles[0].uri}`;
                                                }
                                          }
                                    }
                              } catch (error) {
                                    console.error(`Error fetching product ${productId}:`, error);
                              }
                        });

                        await Promise.all(imagePromises);

                        const items: CartItem[] = response.data.map((merchantData) => ({
                              id: parseInt(merchantData.merchant.id),
                              storeName: merchantData.merchant.name,
                              products: merchantData.productsCart.map((item) => {
                                    const product = item.productPrice.product;

                                    const picture = product.pictureFiles?.[0]?.uri;
                                    const productImage = picture
                                          ? `${BASE_API}${picture}`
                                          : '/image/product/shoes-dummy.svg';

                                    return {
                                          id: parseInt(item.id),
                                          name: product.title,
                                          category: product.category?.name || '',
                                          price: item.productPrice.price.toString(),
                                          quantity: item.qty,
                                          imageUrl: productImage,
                                          isSelected: false,
                                          cartItemId: item.id
                                    };
                              })
                        }));

                        setCartItems(items);
                  }
            } catch (error) {
                  console.error('Error loading cart:', error);
            } finally {
                  setLoading(false);
            }
      };

      if (loading) {
            return (
                  <main className="flex flex-col md:flex-row gap-10 py-10 lg:px-20 max-w-[1440px] w-full mx-auto px-5">
                        <div className="flex-1 animate-pulse space-y-4">
                              <div className="h-8 bg-gray-300 rounded"></div>
                              <div className="h-64 bg-gray-300 rounded"></div>
                        </div>
                  </main>
            );
      }

      return (
            <main className="flex flex-col md:flex-row gap-10 py-10 lg:px-20 max-w-[1440px] w-full mx-auto">
                  <CartProvider initialCartItems={cartItems}>
                        <section className="flex flex-col gap-6 max-w-[790px] w-full px-5">
                              <h2 className="text-neutral-700 font-extrabold text-lg md:text-2xl">Keranjang</h2>
                              <CartSection />
                              <LastSeenCartSection />
                        </section>
                        <TotalShoppingBox />
                  </CartProvider>
            </main>
      );
}