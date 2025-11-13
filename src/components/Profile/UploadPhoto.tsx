"use client";

import Image from "next/image";
import { useState, useRef } from "react";

export function UploadPhoto() {
      const [file, setFile] = useState<File | null>(null);
      const [preview, setPreview] = useState<string | null>(null);
      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                  const selectedFile = e.target.files[0];
                  setFile(selectedFile);
                  setPreview(URL.createObjectURL(selectedFile)); // Update preview

                  // Automatically upload the file
                  const formData = new FormData();
                  formData.append("file", selectedFile);

                  try {
                        const response = await fetch("/api/upload-photo", {
                              method: "POST",
                              body: formData,
                        });

                        const data = await response.json();

                        if (response.ok) {
                              alert("Foto berhasil diunggah!");
                        } else {
                              console.error(data.error);
                              alert("Gagal mengunggah foto. Silakan coba lagi.");
                        }
                  } catch (error) {
                        console.error("Upload error:", error);
                        alert("Terjadi kesalahan. Silakan coba lagi.");
                  }
            }
      };

      return (
            <div className="flex flex-col items-center justify-center bg-transparent border border-neutral-400 p-5 gap-4 rounded-lg h-[300px]">
                  {/* Preview Image */}
                  <div>
                        <Image
                              src={preview || "/image/profile/profile-dummy.svg"}
                              alt="profile-photo"
                              width={120}
                              height={120}
                              className="w-[120px] rounded-full object-cover"
                        />
                  </div>

                  {/* File Input */}
                  <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                  />

                  {/* File Requirements */}
                  <p className="text-xs text-neutral-700 max-w-[209px] text-center">
                        Besar file maksimum 5MB dengan ekstensi file yang diperbolehkan: .JPG, .JPEG, .PNG
                  </p>

                  {/* Upload Button */}
                  <button
                        className="bg-white border border-neutral-400 rounded-3xl w-full p-2 font-semibold text-neutral-700 text-sm cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                  >
                        Unggah foto profil
                  </button>
            </div>
      );
}
