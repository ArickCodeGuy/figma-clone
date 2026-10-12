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

  // Switch without the global `background-color` transition,
  // otherwise screenshots can catch the body mid-fade from dark to light
  const noTransitions = document.createElement('style');
  noTransitions.textContent = '* { transition: none !important; }';
  document.head.append(noTransitions);

  document.body.classList.toggle('light', theme === 'light');
  document.documentElement.style.colorScheme = theme;

  document.body.getBoundingClientRect(); // apply styles now
  noTransitions.remove();
});
