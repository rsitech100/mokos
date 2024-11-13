import Link from "next/link";

export function RegisterButton() {
      return (
            <Link href="/auth/register" className="bg-primary-500 text-sm px-10 py-3 text-white rounded-3xl cursor-pointer h-fit w-1/2 text-center" passHref>
                  Daftar
            </Link>
      )
}