import { ProfileCard } from "@/components/Profile/ProfileCard";

export default function ProfilePage() {
      return (
            <div className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Profil</h2>
                  <ProfileCard />
            </div>
      )
}