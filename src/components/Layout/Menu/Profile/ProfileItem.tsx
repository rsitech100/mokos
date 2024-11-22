import Image from "next/image";

type ProfileItemProps = {
      icon: string;
      alt: string;
      title: string;
      onClick?: () => void;
      isActive?: boolean; // Add isActive prop
};

export function ProfileItem({ icon, alt, title, onClick, isActive }: ProfileItemProps) {
      return (
            <div
                  className={`flex flex-row items-center gap-3 px-3 py-3.5 cursor-pointer ${isActive ? "bg-primary-100 text-primary-500 rounded-xl font-semibold" : "text-neutral-700"
                        }`}
                  onClick={onClick}
            >
                  <Image src={icon} alt={alt} width={24} height={24} className="w-6" />
                  <p
                        className={`text-sm ${isActive ? "text-primary-500 font-semibold" : "text-neutral-700"
                              }`}
                  >
                        {title}
                  </p>
            </div>
      );
}
