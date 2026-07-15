import { test, expect } from '@playwright/test';

test('game canvas loads', async ({ page }) => {
  await page.goto('http://localhost:8080');
  const canvas = await page.locator('#game-canvas');
  await expect(canvas).toBeVisible();
});

test('resource bar shows gold', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await expect(page.locator('#gold')).toContainText('200');
});
