import { test, expect } from '@playwright/test';

const BASE_URL = `http://localhost:${process.env.PORT || 8765}`;

test('game canvas loads', async ({ page }) => {
  await page.goto(BASE_URL);
  const canvas = await page.locator('#game-canvas');
  await expect(canvas).toBeVisible();
});

test('resource bar shows gold', async ({ page }) => {
  await page.goto(BASE_URL);
  await expect(page.locator('#gold')).toContainText('200');
});
