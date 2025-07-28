import {
  defineConfig,
  PlaywrightTestConfig,
} from '@playwright/experimental-ct-react';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: '../src',
  outputDir: 'test-results',
  testMatch: '**/__tests__/*.visual.test.tsx',
  updateSnapshots: process.env.UPDATE_REQUEST ? 'all' : 'missing',
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
};

export default defineConfig(config);
