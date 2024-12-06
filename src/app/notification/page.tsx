import { NotificationSection } from "@/containers/notification";

export default function NotificationPage() {
      return (
            <main className="flex flex-col gap-6 w-full">
                  <h2 className="font-extrabold text-2xl text-neutral-700">Notifikasi</h2>
                  <NotificationSection />
            </main>
      )
}