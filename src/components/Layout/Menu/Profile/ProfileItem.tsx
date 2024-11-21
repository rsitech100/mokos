import Image from "next/image";

type ProfileItemProps = {
      icon: string;
      alt: string;
      title: string;
      onClick?: () => void;
};

export function ProfileItem({ icon, alt, title, onClick }: ProfileItemProps) {
      return (
            <div className="flex flex-row gap-3 px-3 py-3.5 hover:bg-primary-100 hover:rounded-xl cursor-pointer" onClick={onClick}>
                  <Image src={icon} alt={alt} width={24} height={24} className="w-6" />
                  <p className="text-sm text-neutral-700 hover:text-primary-500 hover:font-semibold">
                        {title}
                  </p>
            </div>
      );
}
