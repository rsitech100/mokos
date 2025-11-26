'use client';
import { InfoProductType } from "@/types/info-product";
import { useProductDetail } from "@/context/ProductDetailContext";

interface ProductDetailsDescriptionProps {
      infoProductDetails: InfoProductType[];
      activeTab?: string;
}

export function ProductDetailsDescription({infoProductDetails, activeTab}: ProductDetailsDescriptionProps) {
      const { product, loading } = useProductDetail();

      if (loading) {
            return (
                  <div className="flex flex-col gap-2 animate-pulse">
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-full"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
            );
      }

      if (!product) return null;

      if (activeTab === 'Detail') {
            return (
                  <div 
                        className="text-sm prose prose-sm max-w-none text-neutral-700"
                        dangerouslySetInnerHTML={{ __html: product.description || 'Tidak ada deskripsi' }}
                  />
            );
      }

      // Spesifikasi tab - show product specifications
      if (activeTab === 'Spesifikasi') {
            return (
                  <div className="flex flex-col gap-3">
                        {product.weight && product.unitWeight && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-sm font-semibold text-neutral-700">Berat</p>
                                    <p className="text-sm text-neutral-600">{product.weight} {product.unitWeight}</p>
                              </div>
                        )}
                        {product.lengthDimension && product.widthDimension && product.heightDimension && product.unitDimension && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Dimensi</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">
                                          {product.lengthDimension} x {product.widthDimension} x {product.heightDimension} {product.unitDimension}
                                    </p>
                              </div>
                        )}
                        {product.category && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Kategori</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.category.name}</p>
                              </div>
                        )}
                        {product.condition && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Kondisi</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.condition}</p>
                              </div>
                        )}
                        {typeof product.isNew !== 'undefined' && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Status</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.isNew ? 'Baru' : 'Bekas'}</p>
                              </div>
                        )}
                        {!product.weight && !product.lengthDimension && !product.category && (
                              <p className="text-xs sm:text-sm text-neutral-500">Tidak ada spesifikasi tersedia</p>
                        )}
                  </div>
            );
      }

      // Info Penting tab - show important information
      if (activeTab === 'Info Penting') {
            return (
                  <div className="flex flex-col gap-3">
                        {product.stock && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Stok Tersedia</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.stock} unit</p>
                              </div>
                        )}
                        {product.minOrder && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Minimum Pembelian</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.minOrder} unit</p>
                              </div>
                        )}
                        {product.soldStock && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Terjual</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.soldStock} unit</p>
                              </div>
                        )}
                        {product.viewsCount && (
                              <div className="flex flex-col gap-1">
                                    <p className="text-xs sm:text-sm font-semibold text-neutral-700">Dilihat</p>
                                    <p className="text-xs sm:text-sm text-neutral-600">{product.viewsCount} kali</p>
                              </div>
                        )}
                        {!product.stock && !product.minOrder && !product.soldStock && !product.viewsCount && (
                              <p className="text-xs sm:text-sm text-neutral-500">Tidak ada informasi penting tersedia</p>
                        )}
                  </div>
            );
      }

      // Default fallback for other tabs
      return (
            <div className="">
                  {infoProductDetails.map((item) => (
                        <p className="text-xs sm:text-sm" key={item.id}>{item.description}</p>
                  ))}
            </div>
      )
}