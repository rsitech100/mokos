// 'use client';
// import { useEffect, useState } from "react";
// import { Pagination } from "@/components/Pagination/Pagination";
// import { InputSearchOrder } from "@/components/Order/InputSearchOrder";
// import { OrderCardList } from "@/components/Order/OrderCardList";
// import { OrderEmpty } from "@/components/Order/OrderEmpty";
// import { OrderBar } from "@/components/Bar/OrderBar";
// import { CalendarButton } from "@/components/Buttons/CalendarButton";
// import { getOrders, Order } from "@/lib/api/fetch-order";
// import toast from "react-hot-toast";

// export function OrderSection() {
//       const [orders, setOrders] = useState<Order[]>([]);
//       const [loading, setLoading] = useState(true);
//       const [currentStatus, setCurrentStatus] = useState<string>('');
//       const [page, setPage] = useState(0);
//       const [size] = useState(10);
//       const [totalElements, setTotalElements] = useState(0);

//       useEffect(() => {
//             loadOrders();
//       }, [currentStatus, page]);

//       const loadOrders = async () => {
//             try {
//                   setLoading(true);
//                   const response = await getOrders({
//                         progressStatus: currentStatus || undefined,
//                         page,
//                         size
//                   });

//                   if (response.success) {
//                         setOrders(response.data);
//                         setTotalElements(response.result?.totalElements || 0);
//                   }
//             } catch (error) {
//                   console.error('Error loading orders:', error);
//                   toast.error('Gagal memuat pesanan');
//             } finally {
//                   setLoading(false);
//             }
//       };

//       if (loading) {
//             return (
//                   <div className="flex flex-col gap-5">
//                         <div className="animate-pulse">
//                               <div className="h-12 bg-gray-300 rounded mb-4"></div>
//                               <div className="h-64 bg-gray-300 rounded"></div>
//                         </div>
//                   </div>
//             );
//       }

//       return (
//             <div className="flex flex-col gap-5">
//                   {/* <OrderBar onStatusChange={setCurrentStatus} /> */}
//                   <div className="flex flex-row gap-2">
//                         <InputSearchOrder />
//                         <CalendarButton />
//                   </div>
//                   {orders.length === 0 ? (
//                         <OrderEmpty />
//                   ) : (
//                         <>
//                               {/* <OrderCardList orders={orders} /> */}
//                               <Pagination 
//                                     totalProducts={totalElements} 
//                                     rowsPerPageOptions={[size]} 
//                                     // onPageChange={setPage}
//                               />
//                         </>
//                   )}
//             </div>
//       );
// }