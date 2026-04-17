"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NavOverlayContextValue {
  isOverlayVisible: boolean;
  registerDropdown: (open: boolean) => void;
}

const NavOverlayContext = createContext<NavOverlayContextValue | null>(null);

export function NavOverlayProvider({ children }: { children: ReactNode }) {
  const [openCount, setOpenCount] = useState(0);

  const registerDropdown = useCallback((open: boolean) => {
    setOpenCount((count) => Math.max(0, count + (open ? 1 : -1)));
  }, []);

  const value = useMemo<NavOverlayContextValue>(
    () => ({ isOverlayVisible: openCount > 0, registerDropdown }),
    [openCount, registerDropdown],
  );

  return (
    <NavOverlayContext.Provider value={value}>
      {children}
    </NavOverlayContext.Provider>
  );
}

export function useNavOverlay(): NavOverlayContextValue {
  const ctx = useContext(NavOverlayContext);
  if (!ctx) {
    throw new Error("useNavOverlay must be used within a NavOverlayProvider");
  }
  return ctx;
}
