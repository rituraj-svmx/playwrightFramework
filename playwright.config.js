// @ts-check
import { Status } from "allure-js-commons";
import * as os from "node:os";
import { defineConfig, devices} from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 1,
  /* Opt out of parallel tests on CI. */
  workers:  3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects:[
    {
      name:"web",
      use:{
        browserName:"chromium",
        headless:true,
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        trace:'on',
        screenshot:'on',
        viewport:{width:1280,height:720},
        video:'retain-on-failure'
      }
    },
    {
      name:"Mobile",
        use:{
          browserName:"webkit",
          headless:false,
          ignoreHTTPSErrors:true,
          permissions:['geolocation'],
          trace:'on',
          screenshot:'on',
          ...devices['iPhone 15 Pro Max']
        }
      }],
  reporter: [
        ["line"],
        [
          "allure-playwright",
          {
            resultsDir: "allure-results",
            detail: true,
            suiteTitle: true,
            links: {
              issue: {
                nameTemplate: "Issue #%s",
                urlTemplate: "https://issues.example.com/%s",
              },
              tms: {
                nameTemplate: "TMS #%s",
                urlTemplate: "https://tms.example.com/%s",
              },
              jira: {
                urlTemplate: (v) => `https://jira.example.com/browse/${v}`,
              },
            },
            categories: [
              {
                name: "foo",
                messageRegex: "bar",
                traceRegex: "baz",
                matchedStatuses: [Status.FAILED, Status.BROKEN,Status.PASSED],
              },
            ],
            environmentInfo: {
              os_platform: os.platform(),
              os_release: os.release(),
              os_version: os.version(),
              node_version: process.version,
            },
          },
        ],
      ],
});
