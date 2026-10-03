import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import '../../src/assets';

export type Theme = 'dark' | 'light';

export type HooksConfig = {
  /** Overrides the theme of the current project for a single `mount` */
  theme?: Theme;
};

const getProjectTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

// Dark is the default theme, light is enabled by `body.light` (see styles.scss)
beforeMount<HooksConfig>(async ({ hooksConfig }) => {
  const theme = hooksConfig?.theme ?? getProjectTheme();

  document.body.classList.toggle('light', theme === 'light');
  document.documentElement.style.colorScheme = theme;
});
