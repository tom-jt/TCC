"use client";
import { useEffect } from "react";

export function ThemeSync() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    // Only follow the OS while the visitor hasn't picked a theme themselves —
    // otherwise a system change would silently undo their choice.
    const apply = (e: MediaQueryListEvent | MediaQueryList) => {
      if (localStorage.getItem("theme")) return;
      document.documentElement.classList.toggle("dark", e.matches);
    };

    apply(media);
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return null;
}
