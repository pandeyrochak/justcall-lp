"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";
import type MobileMenu from "./MobileMenu";

const MobileMenuDynamic = dynamic(() => import("./MobileMenu"), {
  ssr: false,
});

type MobileMenuProps = ComponentProps<typeof MobileMenu>;

function MobileMenuPlaceholder() {
  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="p-2 text-gray-700"
        aria-label="Open menu"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  );
}

export default function MobileMenuLoader(props: MobileMenuProps) {
  const [shouldLoadMenu, setShouldLoadMenu] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 1023.98px)");
    const update = () => setShouldLoadMenu(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  if (!shouldLoadMenu) return <MobileMenuPlaceholder />;
  return <MobileMenuDynamic {...props} />;
}
