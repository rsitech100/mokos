import Image from "next/image";

export function UploadPhoto() {
      return (
            <div className="flex flex-col items-center justify-center bg-transparent border border-neutral-400 p-5 gap-4 rounded-lg h-[300px]">
                  <div>
                        <Image src="/image/profile/profile-dummy.svg" alt="profile-dummy" width={120} height={120} className="w-[120px]" />
                  </div>
                  <p className="text-xs text-neutral-700 max-w-[209px] text-center">Besar file maksimum 5MB dengan ekstensi file yang diperbolehkan: .JPG.JPEG.PNG</p>
                  <button className="bg-white border border-neutral-400 rounded-3xl w-full p-2 font-semibold text-neutral-700 text-sm">
                        Unggah foto profil
                  </button>
            </div>
      )
}