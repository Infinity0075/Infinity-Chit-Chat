import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("Infinity-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("Infinity-theme", theme);
    set({ theme });
  },
}));
