import { ListFilterCategory } from "@/components/Category/ListFilterCategory";
import PropTypes from "prop-types";
import React from "react";
import { IoIosClose } from "react-icons/io";

interface PopupCategoryFilterProps {
      isOpen: boolean;
      onClose: () => void;
}

export function PopupCategoryFilter({
      isOpen,
      onClose,
}: PopupCategoryFilterProps) {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-50">
                  <div className="bg-white rounded-lg p-5 w-screen">
                        <div className="inline-flex w-full justify-between">
                              <p className="text-base text-neutral-700 font-bold">Filter</p>
                              <div onClick={onClose}>
                                    <IoIosClose size={30} color="191717" />
                              </div>
                        </div>
                        <ListFilterCategory display="flex" />
                        <button className="mt-5 w-full bg-primary-500 text-white p-2 rounded-3xl">Terapkan</button>
                  </div>
            </div>
      );
}

PopupCategoryFilter.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
      children: PropTypes.node,
};
