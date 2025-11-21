'use client';
import { useState, useEffect } from "react";
import Image from "next/image";

const BASE_API = process.env.NEXT_PUBLIC_BASE_API || '';

interface ProductCheckoutCardProps {
      product: {
            productPrice?: {
                  id?: string;
                  product?: {
                        id?: string;
                        title?: string;
                        images?: Array<{ url: string }>;
                  };
            };
            qty: number;
            finalTotalPrice: number;
      };
}

export function ProductCheckoutCard({ product }: ProductCheckoutCardProps) {
      const [productImage, setProductImage] = useState<string>('/image/product/shoes-dummy.svg');
      const [loading, setLoading] = useState(true);
      
      const prod = product as Record<string, unknown>;
      const productPrice = prod.productPrice as Record<string, unknown> | undefined;
      const productInfo = productPrice?.product as Record<string, unknown> | undefined;
      
      const productId = productInfo?.id as string | undefined;
      const productTitle = (productInfo?.title as string) || 'Produk';
      
      useEffect(() => {
            const fetchProductImage = async () => {
                  if (!productId) {
                        setLoading(false);
                        return;
                  }

                  try {
                        const response = await fetch(`${BASE_API}/v1/product?id=${productId}`, {
                              credentials: 'include',
                              cache: 'no-store'
                        });

                        if (response.ok) {
                              const data = await response.json();
                              if (data.success && data.data && data.data.length > 0) {
                                    const product = data.data[0];
                                    if (product.pictureFiles && product.pictureFiles.length > 0) {
                                          setProductImage(`${BASE_API}${product.pictureFiles[0].uri}`);
                                    }
                              }
                        }
                  } catch (error) {
                        console.error('Error fetching product image:', error);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchProductImage();
      }, [productId]);
      
      const itemPrice = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
      }).format((prod.finalTotalPrice as number) || 0);

      return (
            <div className="flex gap-3 mb-3 pb-3 border-b border-dashed last:border-0">
                  <div className="relative w-16 h-16 flex-shrink-0">
                        {loading ? (
                              <div className="w-full h-full bg-gray-200 animate-pulse rounded" />
                        ) : (
                              <Image
                                    src={productImage}
                                    alt={productTitle}
                                    fill
                                    className="object-cover rounded"
                                    unoptimized
                              />
                        )}
                  </div>
                  <div className="flex-1">
                        <p className="text-sm font-medium text-neutral-700">{productTitle}</p>
                        <p className="text-xs text-neutral-500">{prod.qty as number} barang</p>
                        <p className="text-sm font-bold text-neutral-700">{itemPrice}</p>
                  </div>
            </div>
      );
}
