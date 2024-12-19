// components/ReviewForm/PhotoUploader.tsx
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';

interface PhotoUploaderProps {
      onPhotosChange: (photos: File[]) => void;
      maxPhotos?: number;
}

export function PhotoUploader({
      onPhotosChange,
      maxPhotos = 3
}: PhotoUploaderProps) {
      const [photos, setPhotos] = useState<File[]>([]);
      const fileInputRef = useRef<HTMLInputElement>(null);

      const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const newFiles = event.target.files;
            if (newFiles) {
                  const fileArray = Array.from(newFiles);
                  const updatedPhotos = [...photos, ...fileArray].slice(0, maxPhotos);
                  setPhotos(updatedPhotos);
                  onPhotosChange(updatedPhotos);
            }
      };

      const removePhoto = (index: number) => {
            const updatedPhotos = photos.filter((_, i) => i !== index);
            setPhotos(updatedPhotos);
            onPhotosChange(updatedPhotos);
      };

      return (
            <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                        {photos.map((photo, index) => (
                              <div key={index} className="relative">
                                    <Image
                                          src={URL.createObjectURL(photo)}
                                          alt={`Preview ${index}`}
                                          width={60}
                                          height={60}
                                          className="rounded-[12px] object-cover"
                                    />
                                    <button
                                          onClick={() => removePhoto(index)}
                                          className="absolute top-0 right-0 bg-red-500 rounded-full p-1"
                                    >
                                          <IoClose color="white" size={12} />
                                    </button>
                              </div>
                        ))}

                        {photos.length < maxPhotos && (
                              <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="w-[60px] h-[60px] border-2 border-dashed border-neutral-400 rounded-[12px] flex items-center justify-center"
                              >
                                    +
                              </button>
                        )}
                  </div>

                  <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                        className="hidden"
                  />
            </div>
      );
}