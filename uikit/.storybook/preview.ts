import type { Decorator, Preview } from '@storybook/react-vite';
import '../src/assets/index';
import './preview.css';

export const THEMES = ['dark', 'light'] as const;
export type Theme = (typeof THEMES)[number];

const DEFAULT_THEME: Theme = 'dark';

// Dark is the default theme, light is enabled by `body.light` (see src/assets/styles/styles.scss)
const applyTheme = (theme: Theme) => {
  document.body.classList.toggle('light', theme === 'light');
  document.documentElement.style.colorScheme = theme;
};

const withTheme: Decorator = (Story, { globals }) => {
  applyTheme((globals.theme as Theme | undefined) ?? DEFAULT_THEME);

  return Story();
};

const preview: Preview = {
  // Toolbar switcher. A single story can be pinned with `globals: { theme: 'light' }`
  globalTypes: {
    theme: {
      description: 'UI kit theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'light', title: 'Light', icon: 'sun' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: DEFAULT_THEME,
  },
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
