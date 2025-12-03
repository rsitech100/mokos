import Image from "next/image";

export function IconLoginRegister() {
      return (
            <section className="bg-primary-100 w-1/2 h-full hidden lg:flex items-center justify-center rounded-2xl">
                  <Image src="/image/login/logo-login-rev.png" alt="icon-login" className="rounded-full" width={500} height={477} />
            </section>
      )
}