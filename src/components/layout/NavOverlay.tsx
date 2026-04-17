"use client";

import { useNavOverlay } from "./NavOverlayContext";

export default function NavOverlay() {
  const { isOverlayVisible } = useNavOverlay();

  if (!isOverlayVisible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 top-[70px] z-40 hidden bg-black/60 lg:block"
      aria-hidden="true"
    />
  );
}
