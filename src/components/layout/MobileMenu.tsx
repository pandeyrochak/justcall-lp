"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroLeadScrollButtons from "@/components/ui/HeroLeadScrollButtons";
import type { NavDropdownItem } from "./nav-data";

const NAVBAR_PANEL_TOP = "top-[64px]";

interface MobileMenuProps {
  productItems: NavDropdownItem[];
  solutionsItems: NavDropdownItem[];
}

export default function MobileMenu({
  productItems,
  solutionsItems,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="p-2 text-gray-700 cursor-pointer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {isOpen && (
        <>
          <button
            type="button"
            aria-label="Close menu"
            className={`fixed inset-x-0 bottom-0 z-[45] bg-black/40 lg:hidden ${NAVBAR_PANEL_TOP}`}
            onClick={close}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className={`fixed inset-x-0 z-[50] flex max-h-[min(100dvh-70px,720px)] flex-col overflow-y-auto bg-white shadow-[var(--shadow-grey-m)] lg:hidden ${NAVBAR_PANEL_TOP}`}
          >
            <nav className="flex flex-col px-8 py-2">
              <MobileNavAccordion label="Product" items={productItems} seeAllHref="/" onNavigate={close} />
              <MobileNavAccordion
                label="Solutions"
                items={solutionsItems}
                seeAllHref="/"
                onNavigate={close}
              />
              <Link
                href="/"
                onClick={close}
                className="py-3 px-2 text-[14px] leading-[22px] text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Customers
              </Link>
              <Link
                href="/"
                onClick={close}
                className="py-3 px-2 text-[14px] leading-[22px] text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Pricing
              </Link>
              <Link
                href="/"
                onClick={close}
                className="py-3 px-2 text-[14px] leading-[22px] text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Resources
              </Link>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <HeroLeadScrollButtons
                  stacked
                  fullWidth
                  size="default"
                  onAfterNavigate={close}
                />
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}

interface MobileNavAccordionProps {
  label: string;
  items: NavDropdownItem[];
  seeAllHref?: string;
  onNavigate: () => void;
}

function MobileNavAccordion({ label, items, seeAllHref, onNavigate }: MobileNavAccordionProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-gray-100">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between py-3 px-2 text-left text-[14px] leading-[22px] font-medium text-gray-900 hover:bg-gray-100 rounded-md cursor-pointer"
        aria-expanded={expanded}
      >
        {label}
        <ChevronIcon className={`shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-0 pb-2 pl-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="flex items-start gap-3 rounded-md px-2 py-2.5 hover:bg-blue-10 transition-colors"
                >
                  {item.icon ? (
                    <Image src={item.icon} alt="" width={20} height={20} className="mt-0.5 shrink-0" />
                  ) : null}
                  <span className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-[14px] leading-[20px] font-medium text-gray-800">{item.label}</span>
                    {item.description ? (
                      <span className="text-[12px] leading-[18px] text-gray-500">{item.description}</span>
                    ) : null}
                  </span>
                </Link>
              </li>
            ))}
            {seeAllHref ? (
              <li className="px-2 pt-1">
                <Link
                  href={seeAllHref}
                  onClick={onNavigate}
                  className="inline-flex items-center gap-1.5 text-[14px] leading-[20px] font-medium text-blue-400 hover:text-blue-500"
                >
                  See all features
                  <ArrowRightIcon />
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
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

function HamburgerIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
