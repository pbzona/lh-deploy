import { test, expect } from '@playwright/test';
import { getHostUrl } from './support/utils';

test.describe('Basic front page tests', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto(getHostUrl());
  });

  test('basic front page title and heading', async ({ page }) => {
    await expect(page).toHaveTitle('Introduction - LaunchDarkly');
    await page.getByRole('heading', { name: 'Introduction' });
  });

  test('navigation from front page to a different step', async ({ page }) => {
    await page.getByRole('link', { name: 'Import the LaunchDarkly SDK' }).click();
    await expect(page).toHaveURL(getHostUrl() + '/module-0/step-1');
  });

});