const THEME_STORAGE_KEY = 'building-bruges-theme';
const root = document.documentElement;
const toggle = document.querySelector('[data-theme-toggle]');
const toggleLabel = document.querySelector('[data-theme-toggle-label]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

const getStoredTheme = () => {
  let storedTheme = null;

  try {
    storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    storedTheme = null;
  }

  return storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : null;
};

const getPreferredTheme = () => getStoredTheme() ?? (systemTheme.matches ? 'dark' : 'light');

const syncToggle = (theme) => {
  if (!toggle || !toggleLabel) {
    return;
  }

  const isDark = theme === 'dark';
  const nextTheme = isDark ? 'light' : 'dark';

  toggle.setAttribute('aria-pressed', String(isDark));
  toggle.setAttribute('aria-label', 'Switch to ' + nextTheme + ' mode');
  toggle.setAttribute('title', 'Switch to ' + nextTheme + ' mode');
  toggleLabel.textContent = isDark ? 'Dark' : 'Light';
};

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  syncToggle(theme);
};

applyTheme(getPreferredTheme());

if (toggle) {
  toggle.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';

    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

systemTheme.addEventListener('change', (event) => {
  if (getStoredTheme()) {
    return;
  }

  applyTheme(event.matches ? 'dark' : 'light');
});
