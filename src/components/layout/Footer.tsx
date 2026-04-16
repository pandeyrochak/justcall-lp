import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "Facebook", icon: "/social-facebook.svg", href: "/" },
  { name: "X", icon: "/social-x.svg", href: "/" },
  { name: "Instagram", icon: "/social-instagram.svg", href: "/" },
  { name: "LinkedIn", icon: "/social-linkedin.svg", href: "/" },
  { name: "YouTube", icon: "/social-youtube.svg", href: "/" },
];

export default function Footer() {
  return (
    <footer className="relative bg-blue-900 overflow-hidden min-h-[256px]">
      <Image
        src="/footer-pattern.svg"
        alt=""
        width={1440}
        height={130}
        className="absolute bottom-0 left-0 w-full h-auto pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-8 py-[60px]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1 shrink-0">
            <p className="text-[12px] leading-[20px] text-gray-400">
              355 Bryant Street, #403 San Francisco California 94107
            </p>
            <p className="text-[12px] leading-[20px] text-gray-400">
              &copy;2016-{new Date().getFullYear()} JustCall. All Rights Reserved
            </p>
          </div>

          <div className="flex items-center gap-[18px]">
            <Link
              href="/"
              className="text-[12px] leading-[20px] text-gray-400 hover:text-white transition-colors"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/"
              className="text-[12px] leading-[20px] text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          <div className="flex items-center gap-[22px] shrink-0">
            {socialLinks.map((social) => (
              <Link
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="hover:opacity-80 transition-opacity"
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={0}
                  height={19}
                  className="h-[19px] w-auto"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
