import { ProfileItems } from "@/components/Layout/Menu/Profile/ProfileItems";
 
export function PopupMenuProfile() {
      const handleClose = () => {
            // Tidak perlu melakukan apa-apa, popup akan tertutup otomatis saat klik outside
      };

      return (
            <>
                  <div className="z-50 bg-white p-3 shadow-md rounded-lg absolute gap-5 w-[225px] whitespace-nowrap">
                        <ProfileItems onClose={handleClose} />
                  </div>
            </>
      );
}
