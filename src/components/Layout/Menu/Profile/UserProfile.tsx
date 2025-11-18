import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export function UserProfile() {
      const { user } = useAuth();

      const getProfilePhotoUrl = () => {
            if (!user?.profilePhoto) {
                  return "/image/nav/menu/profile-icon-dummy.svg";
            }
            
            // Check if profilePhoto is an object with uri property
            if (typeof user.profilePhoto === 'object' && user.profilePhoto.uri) {
                  return `${process.env.NEXT_PUBLIC_BASE_API}${user.profilePhoto.uri}`;
            }
            
            // If it's a string
            if (typeof user.profilePhoto === 'string' && user.profilePhoto !== "") {
                  return user.profilePhoto.startsWith('http') 
                        ? user.profilePhoto 
                        : `${process.env.NEXT_PUBLIC_BASE_API}/v1/file/${user.profilePhoto}`;
            }
            
            return "/image/nav/menu/profile-icon-dummy.svg";
      };

      return (
            <div className="flex flex-row gap-3">
                  <Image
                        src={getProfilePhotoUrl()}
                        alt="profile icon"
                        height={48}
                        width={48}
                        className="w-12 h-12 rounded-full object-cover"
                        unoptimized={user?.profilePhoto && user.profilePhoto !== "" ? true : false}
                  />
                  <div className="flex flex-col gap-1">
                        <h5 className="font-bold text-neutral-700 text-sm">
                              {user?.fullName || "Guest"}
                        </h5>
                        <div className="text-info-300 bg-info-100 px-3 py-[6px] rounded-lg font-semibold text-xs">
                              Terverifikasi
                        </div>
                  </div>
            </div>
      );
}
