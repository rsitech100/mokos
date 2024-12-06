'use client';
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"
import { LuCalendarDays } from "react-icons/lu";

export function CalendarButton() {
      const [showCalendar, setShowCalendar] = useState(false);
      const [date, setDate] = useState<Date | undefined>(new Date())

      const toggleCalendar = () => {
            setShowCalendar(!showCalendar)
      }

      return (
            <div className="relative space-y-3">
                  <div className="inline-flex cursor-pointer justify-between w-fit border border-neutral-400 px-3 py-2 rounded-[12px] gap-8 md:gap-16 items-center"
                  onClick={toggleCalendar}
                  >
                        <p className="text-sm text-neutral-700 whitespace-nowrap">Pilih Tanggal</p>
                        <LuCalendarDays size={16} color="#000000" />
                  </div>
                  {showCalendar && (
                        <div className="absolute">
                              <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    className="rounded-md border bg-white"
                              />
                        </div>
                  )}
            </div>
      )
}