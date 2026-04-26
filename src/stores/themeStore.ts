import { defineStore } from "pinia";
import { ref, watch } from "vue";

export type Theme = "dark" | "light";

const STORAGE_KEY = "unsia-portfolio-theme";

function readInitial(): Theme {
  if (typeof window === "undefined") return "dark";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "dark" || stored === "light") return stored;
  return "dark";
}

export const useThemeStore = defineStore("theme", () => {
  const theme = ref<Theme>(readInitial());

  function apply(value: Theme) {
    if (typeof document === "undefined") return;
    document.body.classList.toggle("light", value === "light");
    document.body.classList.toggle("dark", value === "dark");
    document.documentElement.style.colorScheme = value;
  }

  function set(value: Theme) {
    theme.value = value;
  }

  function toggle() {
    theme.value = theme.value === "dark" ? "light" : "dark";
  }

  watch(
    theme,
    (value) => {
      if (typeof window === "undefined") return;
      window.localStorage.setItem(STORAGE_KEY, value);
      apply(value);
    },
    { immediate: true },
  );

  return { theme, set, toggle };
});
