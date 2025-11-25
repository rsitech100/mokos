"use client";
import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectTrigger,
      SelectValue,
} from "@/components/ui/select";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
      totalProducts: number;
      rowsPerPageOptions: number[];
      page: number;
      setPage: (page: number) => void;
      rowsPerPage: number;
      setRowsPerPage: (val: number) => void;
}

export function Pagination({
      totalProducts,
      rowsPerPageOptions,
      page,
      setPage,
      rowsPerPage,
      setRowsPerPage
}: PaginationProps) {

      const totalPages = Math.ceil(totalProducts / rowsPerPage);

      const handleRowsPerPageChange = (value: string) => {
            setRowsPerPage(parseInt(value));
            setPage(1);
      };

      const goToPreviousPage = () => {
            if (page > 1) setPage(page - 1);
      };

      const goToNextPage = () => {
            if (page < totalPages) setPage(page + 1);
      };

      return (
            <div className="py-2 px-0 md:px-6 flex w-full justify-end">
                  <div className="flex items-center text-xs md:text-sm gap-3.5 text-neutral-700">
                        <p>Rows per page</p>

                        <Select onValueChange={handleRowsPerPageChange}>
                              <SelectTrigger className="bg-neutral-200 rounded-xl md:rounded-3xl w-[66px] py-2 px-3">
                                    <SelectValue placeholder={String(rowsPerPage)} />
                              </SelectTrigger>

                              <SelectContent>
                                    <SelectGroup>
                                          {rowsPerPageOptions.map((option) => (
                                                <SelectItem key={option} value={String(option)}>
                                                      {option}
                                                </SelectItem>
                                          ))}
                                    </SelectGroup>
                              </SelectContent>
                        </Select>

                        <p>
                              {`${(page - 1) * rowsPerPage + 1}-${Math.min(
                                    page * rowsPerPage,
                                    totalProducts
                              )} of ${totalProducts}`}
                        </p>

                        <div
                              className={`cursor-pointer ${page === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={goToPreviousPage}
                        >
                              <MdKeyboardArrowLeft size={20} color="#191717" />
                        </div>

                        <div
                              className={`cursor-pointer ${page === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={goToNextPage}
                        >
                              <MdKeyboardArrowRight size={20} color="#191717" />
                        </div>
                  </div>
            </div>
      );
}
