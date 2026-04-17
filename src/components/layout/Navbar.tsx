import Image from "next/image";
import Link from "next/link";
import HeroLeadScrollButtons from "@/components/ui/HeroLeadScrollButtons";
import { NavOverlayProvider } from "./NavOverlayContext";
import NavOverlay from "./NavOverlay";
import DesktopDropdowns from "./DesktopDropdowns";
import MobileMenuLoader from "./MobileMenuLoader";
import { productDropdownItems, solutionsDropdownItems } from "./nav-data";

const staticNavLinkClassName =
  "text-[14px] leading-[22px] text-gray-700 hover:text-gray-900 transition-colors";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[var(--shadow-grey-m)]">
      <NavOverlayProvider>
        <NavOverlay />

        <div className="relative z-50 max-w-[1370px] mx-auto flex items-center justify-between px-8 py-3">
          <div className="flex items-center gap-[42px]">
            <Link href="/" className="shrink-0">
              <Image
                src="/jc-logo.svg"
                alt="JustCall"
                width={130}
                height={25}
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-[25px]">
              <DesktopDropdowns
                productItems={productDropdownItems}
                solutionsItems={solutionsDropdownItems}
              />
              <Link href="/" className={staticNavLinkClassName}>
                Customers
              </Link>
              <Link href="/" className={staticNavLinkClassName}>
                Pricing
              </Link>
              <Link href="/" className={staticNavLinkClassName}>
                Resources
              </Link>
            </nav>
          </div>

          <HeroLeadScrollButtons
            className="hidden lg:flex items-center"
            size="default"
          />

          <MobileMenuLoader
            productItems={productDropdownItems}
            solutionsItems={solutionsDropdownItems}
          />
        </div>
      </NavOverlayProvider>
    </header>
  );
}
