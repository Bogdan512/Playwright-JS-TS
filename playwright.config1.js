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
    timeout: 5000
  },
  reporter: 'html',
  projects : 
  [
    {
      name : 'safari',
      use: 
      {
        browserName: 'webkit',
        headless: true,
        screenshot: 'on',
        //ignoreHttpsErrors: true,
        //permissions: ['geolocation'],
        //trace: 'on',
        //...devices['iPhone 15 Pro Max']
      }
    },
    {
      name : 'chrome',
      use: 
      {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        //trace: 'on',
      }
    }
  ]
});

module.exports = config;

