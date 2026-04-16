"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroLeadScrollButtons from "@/components/ui/HeroLeadScrollButtons";
import NavDropdown from "./NavDropdown";
import MobileMenu from "./MobileMenu";

const productDropdownItems = [
  {
    label: "Business Phone System",
    href: "/",
    description: "Make and receive calls with a reliable cloud phone system",
    icon: "/phone-call-icon.svg",
  },
  {
    label: "Send and Receive SMS",
    href: "/",
    description: "Respond to and manage texts with full CRM visibility",
    icon: "/messages-icon.svg",
  },
  {
    label: "Automated Dialers",
    href: "/",
    description: "Reach more prospects with power and 10-line predictive dialers",
    icon: "/phone-calling-icon.svg",
  },
];

const solutionsDropdownItems = [
  {
    label: "Sales Teams",
    href: "/",
    description: "Outbound calling for closers",
    icon: "/phone-call-icon.svg",
  },
  {
    label: "Support Teams",
    href: "/",
    description: "Resolve faster with context",
    icon: "/messages-icon.svg",
  },
  {
    label: "Remote Teams",
    href: "/",
    description: "Stay connected everywhere",
    icon: "/phone-calling-icon.svg",
  },
];

const resourcesDropdownItems = [
  {
    label: "Blog",
    href: "/",
    description: "Product news, tips, and best practices",
    icon: "/messages-icon.svg",
  },
  {
    label: "Help Center",
    href: "/",
    description: "Guides, FAQs, and troubleshooting",
    icon: "/phone-call-icon.svg",
  },
  {
    label: "Developers & API",
    href: "/",
    description: "Build and integrate with JustCall",
    icon: "/filex-icon.svg",
  },
];

export default function NavbarClient() {
  const [openDropdownCount, setOpenDropdownCount] = useState(0);

  const handleDropdownOpenChange = useCallback((open: boolean) => {
    setOpenDropdownCount((count) => {
      const next = count + (open ? 1 : -1);
      return next < 0 ? 0 : next;
    });
  }, []);

  const showOverlay = openDropdownCount > 0;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-[var(--shadow-grey-m)]">
      {showOverlay && (
        <div
          className="fixed inset-x-0 bottom-0 top-[70px] z-40 hidden bg-black/60 lg:block"
          aria-hidden="true"
        />
      )}

      <div className="relative z-50 max-w-[1370px] mx-auto flex items-center justify-between px-8 py-3">
        <div className="flex items-center gap-[42px]">
          <Link href="/" className="shrink-0">
            <Image src="/jc-logo.svg" alt="JustCall" width={130} height={25} priority />
          </Link>

          <nav className="hidden lg:flex items-center gap-[25px]">
            <NavDropdown
              label="Product"
              items={productDropdownItems}
              seeAllHref="/"
              onOpenChange={handleDropdownOpenChange}
            />
            <NavDropdown
              label="Solutions"
              items={solutionsDropdownItems}
              seeAllHref="/"
              onOpenChange={handleDropdownOpenChange}
            />
            <Link href="/" className="text-[14px] leading-[22px] text-gray-700 hover:text-gray-900 transition-colors">
              Customers
            </Link>
            <Link href="/" className="text-[14px] leading-[22px] text-gray-700 hover:text-gray-900 transition-colors">
              Pricing
            </Link>
            <Link href="/" className="text-[14px] leading-[22px] text-gray-700 hover:text-gray-900 transition-colors">
              Resources
            </Link>
          </nav>
        </div>

        <HeroLeadScrollButtons className="hidden lg:flex items-center" size="default" />

        <MobileMenu
          productItems={productDropdownItems}
          solutionsItems={solutionsDropdownItems}
          resourceItems={resourcesDropdownItems}
        />
      </div>
    </header>
  );
}
