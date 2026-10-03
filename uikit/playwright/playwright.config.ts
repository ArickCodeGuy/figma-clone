import {
  defineConfig,
  PlaywrightTestConfig,
} from '@playwright/experimental-ct-react';

export const THEMES = ['dark', 'light'] as const;
export type Theme = (typeof THEMES)[number];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: '../src',
  outputDir: 'test-results',
  testMatch: '**/__tests__/*.visual.test.tsx',
  updateSnapshots: process.env.UPDATE_REQUEST ? 'all' : 'missing',
  // `{-projectName}` adds the theme to every snapshot: `KButton-Primary-dark-linux.png`
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/../__snapshots__/{testFileName}-snapshots/{arg}{-projectName}-linux{ext}',
  timeout: 10 * 1000,
  fullyParallel:
    true /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */,
  use: {
    testIdAttribute: 'data-qa',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'only-on-failure',
    timezoneId: 'UTC',
    ctCacheDir: process.env.IS_DOCKER ? '.cache-docker' : '.cache',
  },
  /**
   * Every test runs once per theme. The theme is passed to the page through
   * `colorScheme` and applied in `playwright/index.tsx` (`beforeMount`).
   * Run a single theme with `npm run pw:dark` / `npm run pw:light`.
   */
  projects: THEMES.map((theme) => ({
    name: theme,
    use: {
      colorScheme: theme,
    },
  })),
};

export default defineConfig(config);
