'use client';
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { LuCalendarDays } from "react-icons/lu";

interface CalendarButtonProps {
      onDateChange?: (selectedDate: Date | undefined) => void; 
}

export function CalendarButton({ onDateChange }: CalendarButtonProps) {
      const [showCalendar, setShowCalendar] = useState(false);
      const [date, setDate] = useState<Date | undefined>(new Date());

      const toggleCalendar = () => {
            setShowCalendar(!showCalendar);
      };

      const handleDateSelect = (selectedDate: Date | undefined) => {
            setDate(selectedDate); // menyimpan tanggal yang dipilih
            onDateChange?.(selectedDate);
            setShowCalendar(false); // menutup kalender setelah memilih tanggal
      };

      return (
            <div className="relative space-y-3">
                  <div
                        className="inline-flex cursor-pointer justify-between w-fit border border-neutral-400 px-3 py-2 rounded-[12px] gap-8 md:gap-16 items-center"
                        onClick={toggleCalendar}
                  >
                        <p className="text-sm text-neutral-700 whitespace-nowrap">
                              {date ? date.toLocaleDateString() : "Pilih Tanggal"}
                        </p>
                        <LuCalendarDays size={16} color="#000000" />
                  </div>
                  {showCalendar && (
                        <div className="absolute z-10 right-[15px]">
                              <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={handleDateSelect} // Panggil handler saat tanggal dipilih
                                    className="rounded-md border bg-white"
                              />
                        </div>
                  )}
            </div>
      );
}
