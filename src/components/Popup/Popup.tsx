"use client";
import { useEffect, useRef } from "react";

type PopupProps = {
      isActive: boolean;
      onClose: () => void;
      children: React.ReactNode;
      className?: string; 
};

export function Popup({ isActive, onClose, children}: PopupProps) {
      const popupRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                  if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                        onClose(); // Menutup popup jika klik terjadi di luar
                  }
            }

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                  document.removeEventListener("mousedown", handleClickOutside);
            };
      }, [onClose]);

      if (!isActive) return null; // Jika tidak aktif, popup tidak dirender

      return (
            <div
                  ref={popupRef}
            >
                  {children}
            </div>
      );
}
