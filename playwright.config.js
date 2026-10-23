// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
    testDir: './tests',
    testMatch: '**/*.spec.js',
    retries: 0,

    use: {
      actionTimeout: 10 * 10000,
      navigationTimeout: 300 * 10000,
      browserName: 'chromium',
      headless: false,
      screenshot: 'only-on-failure',
      trace: 'on',
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    },

    // maximum time one test can run for.
    timeout: 40 * 1000,

    expect: {
      timeout: 40 * 1000,
    },

    reporter: 'html',
};

module.exports = config;