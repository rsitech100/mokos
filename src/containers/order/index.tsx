"use client";

import { useState, useEffect, useCallback } from "react";
import { Pagination } from "@/components/Pagination/Pagination";
import { InputSearchOrder } from "@/components/Order/InputSearchOrder";
import { OrderCardList } from "@/components/Order/OrderCardList";
import { OrderEmpty } from "@/components/Order/OrderEmpty";
import { OrderBar } from "@/components/Bar/OrderBar";
import { CalendarButton } from "@/components/Buttons/CalendarButton";
import { getOrders, Order } from "@/lib/api/fetch-order";
import toast from "react-hot-toast";

export function OrderSection() {
      const [allOrders, setAllOrders] = useState<Order[]>([]);
      const [displayOrders, setDisplayOrders] = useState<Order[]>([]);
      const [loading, setLoading] = useState(true);
      const [currentStatus, setCurrentStatus] = useState<string>("");
      const [search, setSearch] = useState("");
      const [selectedDate, setSelectedDate] = useState<Date | undefined>();
      const [page, setPage] = useState(1);
      const [rowsPerPage, setRowsPerPage] = useState(10);

      const normalizeTimestamp = (ts: number) => {
            // If timestamp is in microseconds (> 9999999999999), convert to milliseconds
            // If in milliseconds (> 9999999999), keep as is
            // If in seconds, multiply by 1000
            if (ts > 9999999999999) {
                  return Math.floor(ts / 1000);
            } else if (ts > 9999999999) {
                  return ts;
            } else {
                  return ts * 1000;
            }
      };

      const loadOrders = useCallback(async () => {
            try {
                  setLoading(true);

                  const response = await getOrders({
                        progressStatus: currentStatus || undefined,
                        page: 1,
                        size: 9999,
                  });

                  if (response.success) {
                        setAllOrders(response.data);
                        setPage(1);
                  }
            } catch (error) {
                  console.error("Error loading orders:", error);
                  toast.error("Gagal memuat pesanan");
            } finally {
                  setLoading(false);
            }
      }, [currentStatus]);

      useEffect(() => {
            loadOrders();
      }, [loadOrders]);

      const filterFrontend = useCallback(() => {
            let filtered = [...allOrders];

            if (search.trim() !== "") {
                  const keyword = search.toLowerCase();
                  filtered = filtered.filter(order =>
                        order.ordersProduct.some(op =>
                              op.productPrice.product.title.toLowerCase().includes(keyword)
                        )
                  );
            }

            if (selectedDate) {
                  // Format selected date to YYYY-MM-DD in local timezone
                  const year = selectedDate.getFullYear();
                  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
                  const day = String(selectedDate.getDate()).padStart(2, '0');
                  const selectedDateStr = `${year}-${month}-${day}`;

                  console.log('Filtering by date:', selectedDateStr);

                  filtered = filtered.filter(order => {
                        const normalizedTs = normalizeTimestamp(order.createdDate);
                        const orderDate = new Date(normalizedTs);
                        
                        // Format order date to YYYY-MM-DD in local timezone
                        const orderYear = orderDate.getFullYear();
                        const orderMonth = String(orderDate.getMonth() + 1).padStart(2, '0');
                        const orderDay = String(orderDate.getDate()).padStart(2, '0');
                        const orderDateStr = `${orderYear}-${orderMonth}-${orderDay}`;

                        console.log('Order date:', orderDateStr, 'vs Selected:', selectedDateStr);

                        return orderDateStr === selectedDateStr;
                  });

                  console.log('Filtered orders count:', filtered.length);
            }

            const start = (page - 1) * rowsPerPage;
            const end = start + rowsPerPage;

            setDisplayOrders(filtered.slice(start, end));
      }, [allOrders, search, selectedDate, page, rowsPerPage]);

      useEffect(() => {
            filterFrontend();
      }, [filterFrontend]);

      return (
            <div className="flex flex-col gap-5">
                  <OrderBar
                        activeStatus={currentStatus}
                        onStatusChange={(status) => {
                              setCurrentStatus(status);
                              setPage(1);
                        }}
                  />

                  <div className="flex flex-row gap-2">
                        <InputSearchOrder
                              value={search}
                              onChange={(val) => {
                                    setSearch(val);
                                    setPage(1);
                              }}
                        />
                        <CalendarButton
                              onDateChange={(date) => {
                                    setSelectedDate(date);
                                    setPage(1);
                              }}
                        />
                  </div>

                  {loading ? (
                        <div className="animate-pulse">
                              <div className="h-12 bg-gray-300 rounded mb-4"></div>
                              <div className="h-64 bg-gray-300 rounded"></div>
                        </div>
                  ) : displayOrders.length === 0 ? (
                        <OrderEmpty />
                  ) : (
                        <>
                              <OrderCardList orders={displayOrders} />
                              <Pagination
                                    totalProducts={allOrders.length}
                                    rowsPerPageOptions={[10, 20, 50]}
                                    page={page}
                                    setPage={setPage}
                                    rowsPerPage={rowsPerPage}
                                    setRowsPerPage={(val) => {
                                          setRowsPerPage(val);
                                          setPage(1);
                                    }}
                              />
                        </>
                  )}
            </div>
      );
}
