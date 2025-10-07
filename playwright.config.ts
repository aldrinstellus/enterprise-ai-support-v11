import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E Testing Configuration for Enterprise AI Support V4
 * Tests multi-persona query detection, widget rendering, and conversation flows
 */
export default defineConfig({
  // Test directory
  testDir: './tests/e2e',

  // Parallel execution
  fullyParallel: true,

  // Fail build if tests are left with .only
  forbidOnly: !!process.env.CI,

  // Retry configuration
  retries: process.env.CI ? 2 : 0,

  // Parallel workers
  workers: process.env.CI ? 1 : undefined,

  // Test reporters
  reporter: [
    ['html', { outputFolder: 'tests/reports/playwright-report', open: 'never' }],
    ['json', { outputFile: 'tests/reports/test-results.json' }],
    ['list']
  ],

  // Global test configuration
  use: {
    // Base URL for V4 application
    baseURL: 'http://localhost:3004',

    // Capture screenshots on failure
    screenshot: 'only-on-failure',

    // Record videos for failing tests
    video: 'retain-on-failure',

    // Capture traces for debugging
    trace: 'on-first-retry',

    // Timeouts
    actionTimeout: 30000,
    navigationTimeout: 30000,
  },

  // Test projects
  projects: [
    {
      name: 'chromium-c-level',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: ['**/personas/c-level.spec.ts']
    },

    {
      name: 'chromium-cs-manager',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: ['**/personas/cs-manager.spec.ts']
    },

    {
      name: 'chromium-support-agent',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
      testMatch: ['**/personas/support-agent.spec.ts']
    },
  ],

  // Test timeouts
  timeout: 90000, // 90 seconds per test
  expect: {
    timeout: 15000 // 15 seconds for assertions
  }
});
