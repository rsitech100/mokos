import Image from "next/image";

export function UserProfile() {
      return (
            <div className="flex flex-row gap-3">
                  <Image
                        src="/image/nav/menu/profile-icon-dummy.svg"
                        alt="profile icon"
                        height={48}
                        width={48}
                        className="w-12"
                  />
                  <div className="flex flex-col gap-1">
                        <h5 className="font-bold text-neutral-700 text-sm">Martin Paes</h5>
                        <div className="text-info-300 bg-info-100 px-3 py-[6px] rounded-lg font-semibold text-xs">
                              Terverifikasi
                        </div>
                  </div>
            </div>
      );
}
