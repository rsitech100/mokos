import PropTypes from "prop-types";
import { IoIosClose } from "react-icons/io";

interface PopupCategorySortProps {
      isOpen: boolean;
      onClose: () => void;
}

export function PopupCategorySort({
      isOpen,
      onClose,
}: PopupCategorySortProps) {
      if (!isOpen) return null;

      return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-end z-50">
                  <div className="flex flex-col bg-white rounded-lg p-5 w-screen">
                        <div className="inline-flex w-full justify-between">
                              <p className="text-base text-neutral-700 font-bold">Urutkan</p>
                              <div onClick={onClose}>
                                    <IoIosClose size={30} color="191717" />
                              </div>
                        </div>
                        <div className="flex flex-col mt-3 gap-5">
                              <p>Terbaru</p>
                              <p>Harga Tertinggi</p>
                              <p>Harga Terrendah</p>
                        </div>
                  </div>
            </div>
      );
}

PopupCategorySort.propTypes = {
      isOpen: PropTypes.bool.isRequired,
      onClose: PropTypes.func.isRequired,
};
