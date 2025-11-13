import Link from "next/link";
export function LoginButton() {
      return (
                  <Link href="auth/login" className="bg-transparent border border-primary-500 text-sm px-10 py-3 text-primary-500 rounded-3xl cursor-pointer h-fit w-1/2 text-center" passHref>
                        Masuk
                  </Link>
      )
}