"use client";

import NavDropdown from "./NavDropdown";
import { useNavOverlay } from "./NavOverlayContext";
import type { NavDropdownItem } from "./nav-data";

interface DesktopDropdownsProps {
  productItems: NavDropdownItem[];
  solutionsItems: NavDropdownItem[];
}

export default function DesktopDropdowns({
  productItems,
  solutionsItems,
}: DesktopDropdownsProps) {
  const { registerDropdown } = useNavOverlay();

  return (
    <>
      <NavDropdown
        label="Product"
        items={productItems}
        seeAllHref="/"
        onOpenChange={registerDropdown}
      />
      <NavDropdown
        label="Solutions"
        items={solutionsItems}
        seeAllHref="/"
        onOpenChange={registerDropdown}
      />
    </>
  );
}
