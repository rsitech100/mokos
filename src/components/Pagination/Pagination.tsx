"use client";
import { useState } from "react";
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
}

export function Pagination({ totalProducts, rowsPerPageOptions }: PaginationProps) {
      const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
      const [currentPage, setCurrentPage] = useState(1);

      const totalPages = Math.ceil(totalProducts / rowsPerPage);

      // Function to handle changing the number of rows per page
      const handleRowsPerPageChange = (value: string) => {
            setRowsPerPage(parseInt(value));
            setCurrentPage(1); // Reset to first page when rows per page change
      };

      // Function to handle page navigation
      const goToPreviousPage = () => {
            if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
            }
      };

      const goToNextPage = () => {
            if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
            }
      };

      return (
            <div className="py-2 px-6 flex justify-end">
                  <div className="inline-flex items-center justify-end text-sm gap-3.5 text-neutral-700 w-full">
                        <p>Rows per page</p>
                        <Select onValueChange={handleRowsPerPageChange}>
                              <SelectTrigger className="bg-neutral-200 rounded-3xl w-[66px] py-2 px-3">
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
                              {`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(
                                    currentPage * rowsPerPage,
                                    totalProducts
                              )} of ${totalProducts}`}
                        </p>
                        <div
                              className={`cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={goToPreviousPage}
                        >
                              <MdKeyboardArrowLeft size={20} color="#191717" />
                        </div>
                        <div
                              className={`cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
                              onClick={goToNextPage}
                        >
                              <MdKeyboardArrowRight size={20} color="#191717" />
                        </div>
                  </div>
            </div>
      );
}
