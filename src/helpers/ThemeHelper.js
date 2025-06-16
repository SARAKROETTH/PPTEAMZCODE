// src/composables/useTheme.js
import { ref, onMounted, watch } from 'vue'; // These are Composition API imports, but the helper itself can be used globally

const THEME_STORAGE_KEY = 'app-theme';

export function useTheme() {
  const currentTheme = ref('light'); // Default theme

  const applyHtmlClass = (theme) => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  onMounted(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      currentTheme.value = savedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme.value = 'dark';
    }
    applyHtmlClass(currentTheme.value);
  });

  watch(currentTheme, (newTheme) => {
    applyHtmlClass(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, { immediate: false });

  const toggleTheme = () => {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light';
  };

  const setTheme = (theme) => {
    if (['light', 'dark'].includes(theme)) {
      currentTheme.value = theme;
    } else {
      console.warn(`Invalid theme "${theme}". Must be 'light' or 'dark'.`);
    }
  };

  return {
    currentTheme,
    toggleTheme,
    setTheme,
  };
}