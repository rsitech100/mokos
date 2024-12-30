import { ProfileCard } from "@/components/Profile/ProfileCard";
import { SectionSkeleton } from "@/components/Skeleton/SectionSkeleton";
import { WithLoading } from "@/utils/WithLoading";

export default function ProfilePage() {
      return (
            <div className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Profil</h2>
                  <WithLoading isLoading={true} skeleton={<SectionSkeleton />}>
                        <ProfileCard />
                  </WithLoading>
            </div>
      );
}
