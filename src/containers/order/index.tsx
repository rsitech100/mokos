import { Pagination } from "@/components/Pagination/Pagination";
import { InputSearchOrder } from "@/components/Order/InputSearchOrder";
import { OrderCardList } from "@/components/Order/OrderCardList";
import { OrderEmpty } from "@/components/Order/OrderEmpty";
import { OrderNavigation } from "@/components/Order/OrderNavigation";
import { orderData } from "@/lib/order-data";
import { CalendarButton } from "@/components/Buttons/CalendarButton";
export function OrderSection() {
      return (
            <div className="flex flex-col gap-5">
                  <OrderNavigation />
                  <div className="flex flex-row gap-2">
                        <InputSearchOrder />
                        <CalendarButton />
                  </div>
                  <OrderEmpty />
                  <OrderCardList /> 
                  <Pagination totalProducts={orderData.length} rowsPerPageOptions={[3,6,9]} />
            </div>
      )
}