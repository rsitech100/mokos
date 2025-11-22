import { Order } from "@/lib/api/fetch-order";
import Image from "next/image";

interface DetailProductProps {
      order: Order;
}

const formatPrice = (price: number) => {
      return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
      }).format(price);
};

export function DetailProduct({ order }: DetailProductProps) {
      // Calculate subtotal from products
      const subtotal = order.ordersProduct.reduce((sum, item) => sum + item.finalTotalPrice, 0);
      
      return (
            <div className="flex flex-col flex-1 bg-white py-5 gap-5 rounded-xl shadow-md">
                  <h4 className="text-lg font-extrabold text-neutral-700 px-5">Detail Produk</h4>

                  {order.ordersProduct.map((item, index) => (
                        <div key={item.id}>
                              <div className="inline-flex justify-between px-5 items-center">
                                    <div className="inline-flex gap-2 items-center">
                                          <Image 
                                                src="/image/order/dummy.png" 
                                                alt={item.productPrice.product.title} 
                                                width={60} 
                                                height={60} 
                                          />
                                          <div className="flex flex-col gap-[4px] text-sm text-neutral-700">
                                                <p className="font-bold">{item.productPrice.product.title}</p>
                                                <p>{item.productPrice.product.category.name}</p>
                                          </div>
                                    </div>
                                    <p className="text-neutral-700 font-sm">x{item.qty}</p>
                                    <p className="font-bold text-neutral-700 font-sm">{formatPrice(item.finalTotalPrice)}</p>
                              </div>
                              {index < order.ordersProduct.length - 1 && (
                                    <hr className="border-dashed border-neutral-400 w-full my-5"></hr>
                              )}
                        </div>
                  ))}

                  <hr className="border-dashed border-neutral-400 w-full"></hr>

                  {/* Total  */}
                  <div className="flex flex-col gap-4 px-5 w-full">
                        <div className="inline-flex justify-between items-center text-sm text-neutral-700">
                              <p>Sub Total Produk</p>
                              <p className="font-bold">{formatPrice(subtotal)}</p>
                        </div>

                        <div className="inline-flex justify-between items-center text-sm text-neutral-700">
                              <p>Ongkos Kirim</p>
                              <p className="font-bold">{formatPrice(order.shippingTotalPrice)}</p>
                        </div>

                        <div className="inline-flex justify-between items-center text-sm text-primary-500">
                              <p>Total</p>
                              <p className="font-bold">{formatPrice(order.finalTotalPrice)}</p>
                        </div>
                  </div>
            </div>
      )
} 