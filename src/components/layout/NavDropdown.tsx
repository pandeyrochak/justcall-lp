"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { NavDropdownItem } from "./nav-data";

interface NavDropdownProps {
  label: string;
  items: NavDropdownItem[];
  seeAllHref?: string;
  onOpenChange?: (open: boolean) => void;
}

export default function NavDropdown({
  label,
  items,
  seeAllHref,
  onOpenChange,
}: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevIsOpenRef = useRef(false);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (prevIsOpenRef.current === isOpen) {
      return;
    }

    prevIsOpenRef.current = isOpen;
    onOpenChange?.(isOpen);
  }, [isOpen, onOpenChange]);

  const open = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  }, []);

  return (
    <div className="relative" onMouseEnter={open} onMouseLeave={close}>
      <button
        className={`flex items-center gap-1 text-[14px] leading-[22px] transition-colors cursor-pointer ${
          isOpen ? "text-blue-400" : "text-gray-700 hover:text-gray-900"
        }`}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronIcon isOpen={isOpen} />
      </button>

      {/* Invisible bridge covering the gap between button and panel */}
      {isOpen && (
        <div
          className="absolute top-full left-0 w-full h-4"
          aria-hidden="true"
        />
      )}

      <div
        className={`absolute top-[calc(100%+12px)] left-0 z-50 transition-all duration-150 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow-[0px_8px_30px_0px_rgba(102,112,133,0.12)] border border-gray-100 py-2 min-w-[280px]">
          {items.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 px-5 py-3 hover:bg-blue-10 transition-colors"
            >
              {item.icon && (
                <Image
                  src={item.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="shrink-0 mt-0.5"
                />
              )}
              <div className="flex flex-col">
                <span className="text-[14px] leading-[20px] font-medium text-gray-800 group-hover:text-blue-400 transition-colors">
                  {item.label}
                </span>
                {item.description && (
                  <span className="text-[12px] leading-[18px] text-gray-500">
                    {item.description}
                  </span>
                )}
              </div>
            </Link>
          ))}

          {seeAllHref && (
            <div className="px-5 pt-2 pb-1">
              <Link
                href={seeAllHref}
                className="inline-flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-blue-400 hover:text-blue-500 transition-colors"
              >
                See all features
                <ArrowRightIcon />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    >
      <path
        d="M4.5 6.75L9 11.25L13.5 6.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.333 8h9.334M8.667 4L12.667 8l-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
