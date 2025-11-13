// import { FaArrowLeft } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface HeaderPopup {
      title: string;
      onClose: () => void;
}

export function HeaderPopupFilter({title, onClose}: HeaderPopup) {
      return (
            <div className="flex flex-col gap-6 overflow-y-auto h-full">
                  <div className="inline-flex w-full items-center justify-between shadow-md p-5 md:p-0 gap-3 md:gap-0 text-neutral-700">
                        {/* <div onClick={onClose} className="flex md:hidden cursor-pointer">
                              <FaArrowLeft size={14} color="#00000" />
                        </div> */}
                        <h3 className="text-lg font-extrabold mb-0 text-center">{title}</h3>
                        <div
                              onClick={onClose}
                              className="flex cursor-pointer md:items-center md:justify-center"
                        >
                              <IoClose size={24} color="#00000" />
                        </div>
                  </div>
            </div>
      )
}