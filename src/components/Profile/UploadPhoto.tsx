"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import apiService from "@/app/api/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface FileUploadResponse {
      success: boolean;
      message?: string;
      data?: {
            id?: string;
      };
}

interface PhotoUpdateResponse {
      success: boolean;
      message?: string;
}

export function UploadPhoto() {
      const { user, updateUser } = useAuth();
      const [preview, setPreview] = useState<string | null>(null);
      const [uploading, setUploading] = useState(false);
      const fileInputRef = useRef<HTMLInputElement>(null);

      // Update preview when user.profilePhoto changes
      useEffect(() => {
            if (user?.profilePhoto) {
                  let photoUrl: string;
                  
                  // Check if profilePhoto is an object with uri
                  if (typeof user.profilePhoto === 'object' && user.profilePhoto.uri) {
                        photoUrl = `${process.env.NEXT_PUBLIC_BASE_API}${user.profilePhoto.uri}`;
                  } else if (typeof user.profilePhoto === 'string') {
                        photoUrl = user.profilePhoto.startsWith('http') 
                              ? user.profilePhoto 
                              : `${process.env.NEXT_PUBLIC_BASE_API}/v1/file/${user.profilePhoto}`;
                  } else {
                        return;
                  }
                  
                  setPreview(photoUrl);
            }
      }, [user?.profilePhoto]);

      const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                  const selectedFile = e.target.files[0];

                  // Validasi ukuran file (max 5MB)
                  if (selectedFile.size > 5 * 1024 * 1024) {
                        toast.error("Ukuran file maksimal 5MB");
                        return;
                  }

                  // Validasi tipe file
                  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
                  if (!allowedTypes.includes(selectedFile.type)) {
                        toast.error("Format file harus .JPG, .JPEG, atau .PNG");
                        return;
                  }

                  setUploading(true);
                  const tempPreview = URL.createObjectURL(selectedFile);
                  setPreview(tempPreview);

                  try {
                        const token = Cookies.get("token") || localStorage.getItem("token");
                        if (!token) throw new Error("Token tidak ditemukan");

                        // Step 1: POST /v1/file - Upload file
                        console.log("Step 1: Uploading file...");
                        const formData = new FormData();
                        formData.append("file", selectedFile);
                        formData.append("description", "profile-photo");

                        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/v1/file`, {
                              method: "POST",
                              body: formData,
                              headers: {
                                    Authorization: `Bearer ${token}`,
                              },
                        });

                        if (!uploadResponse.ok) {
                              const errorData = await uploadResponse.json();
                              throw new Error(errorData.message || "Gagal upload file");
                        }

                        const uploadData: FileUploadResponse = await uploadResponse.json();
                        
                        if (!uploadData.success || !uploadData.data?.id) {
                              throw new Error(uploadData.message || "File ID tidak ditemukan");
                        }

                        const fileId = uploadData.data.id;
                        console.log("Step 1 Success - File ID:", fileId);

                        // Step 2: PUT /v1/user/photo - Update foto profil dengan fileId
                        console.log("Step 2: Updating profile photo...");
                        const updateResponse: PhotoUpdateResponse = await apiService.put("/v1/user/photo", {
                              fileId: fileId,
                        });

                        if (!updateResponse.success) {
                              throw new Error(updateResponse.message || "Gagal update foto profil");
                        }

                        console.log("Step 2 Success - Profile photo updated");

                        // Fetch ulang user data dari backend untuk sync
                        if (token) {
                              try {
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    const userResponse: any = await apiService.get("/v1/user", {
                                          headers: {
                                                Authorization: `Bearer ${token}`,
                                                Accept: "*/*",
                                          },
                                    });
                                    
                                    if (userResponse.data) {
                                          // Update user state dengan data terbaru dari backend
                                          updateUser(userResponse.data);
                                          
                                          // Update preview dengan URL file yang baru
                                          const photo = userResponse.data.profilePhoto;
                                          let photoUrl: string | null = null;
                                          
                                          if (photo) {
                                                if (typeof photo === 'object' && photo.uri) {
                                                      photoUrl = `${process.env.NEXT_PUBLIC_BASE_API}${photo.uri}`;
                                                } else if (typeof photo === 'string') {
                                                      photoUrl = photo.startsWith('http') 
                                                            ? photo 
                                                            : `${process.env.NEXT_PUBLIC_BASE_API}/v1/file/${photo}`;
                                                }
                                          }
                                          
                                          setPreview(photoUrl);
                                    }
                              } catch (error) {
                                    console.error("Failed to fetch updated user data:", error);
                              }
                        }
                        
                        toast.success("Foto profil berhasil diubah!");
                        console.log("Upload flow completed successfully!");
                        
                        URL.revokeObjectURL(tempPreview);
                  } catch (error) {
                        console.error("Upload error:", error);
                        const msg = error instanceof Error ? error.message : "Terjadi kesalahan saat upload";
                        toast.error(msg);
                        
                        // Rollback preview ke foto user original
                        if (user?.profilePhoto) {
                              if (typeof user.profilePhoto === 'object' && user.profilePhoto.uri) {
                                    setPreview(`${process.env.NEXT_PUBLIC_BASE_API}${user.profilePhoto.uri}`);
                              } else if (typeof user.profilePhoto === 'string') {
                                    const photoUrl = user.profilePhoto.startsWith('http')
                                          ? user.profilePhoto
                                          : `${process.env.NEXT_PUBLIC_BASE_API}/v1/file/${user.profilePhoto}`;
                                    setPreview(photoUrl);
                              } else {
                                    setPreview(null);
                              }
                        } else {
                              setPreview(null);
                        }
                        URL.revokeObjectURL(tempPreview);
                  } finally {
                        setUploading(false);
                        // Reset file input
                        if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                        }
                  }
            }
      };

      return (
            <div className="flex flex-col items-center justify-center bg-transparent border border-neutral-400 p-5 gap-4 rounded-lg h-[300px]">
                  {/* Preview Image */}
                  <div className="relative">
                        <Image
                              src={(preview && preview !== "") ? preview : "/image/profile/profile-dummy.svg"}
                              alt="profile-photo"
                              width={120}
                              height={120}
                              className="w-[120px] h-[120px] rounded-full object-cover"
                              unoptimized={preview ? true : false}
                        />
                        {uploading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                    <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
                              </div>
                        )}
                  </div>

                  {/* File Input */}
                  <input
                        type="file"
                        accept=".jpg, .jpeg, .png"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={uploading}
                  />

                  {/* File Requirements */}
                  <p className="text-xs text-neutral-700 max-w-[209px] text-center">
                        Besar file maksimum 5MB dengan ekstensi file yang diperbolehkan: .JPG, .JPEG, .PNG
                  </p>

                  {/* Upload Button */}
                  <button
                        className={`bg-white border border-neutral-400 rounded-3xl w-full p-2 font-semibold text-neutral-700 text-sm ${
                              uploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-neutral-50"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                  >
                        {uploading ? "Mengunggah..." : "Unggah foto profil"}
                  </button>
            </div>
      );
}
