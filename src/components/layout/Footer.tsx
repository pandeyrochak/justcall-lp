import Image from "next/image";
import Link from "next/link";

interface SocialLink {
  name: string;
  icon: string;
  href: string;
  width: number;
  height: number;
}

const socialLinks: SocialLink[] = [
  { name: "Facebook", icon: "/social-facebook.svg", href: "/", width: 10, height: 18 },
  { name: "X", icon: "/social-x.svg", href: "/", width: 18, height: 18 },
  { name: "Instagram", icon: "/social-instagram.svg", href: "/", width: 18, height: 18 },
  { name: "LinkedIn", icon: "/social-linkedin.svg", href: "/", width: 18, height: 18 },
  { name: "YouTube", icon: "/social-youtube.svg", href: "/", width: 20, height: 14 },
];

export default function Footer() {
  return (
    <footer className="relative bg-blue-900 overflow-hidden min-h-[256px]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full aspect-1440/130 bg-[url('/footer-pattern.svg')] bg-no-repeat bg-size-[100%_100%]"
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
                  alt=""
                  width={social.width}
                  height={social.height}
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
