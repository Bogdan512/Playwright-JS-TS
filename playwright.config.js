// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  // 40 seconds for each test
  timeout: 40 * 1000,
// Expect a condition to  be met within 30 seconds
  expect: {
    timeout: 30000
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    headless: false
  }
});

module.exports = config;

