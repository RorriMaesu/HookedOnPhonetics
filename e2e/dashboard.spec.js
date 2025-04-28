// @ts-check
import { test, expect } from '@playwright/test';

test('dashboard page shows ready banner', async ({ page }) => {
  // Navigate to the dashboard page
  await page.goto('http://localhost:3000/dashboard');
  
  // Check if the banner is visible
  const banner = await page.getByText('LearnReadWrite Ready');
  await expect(banner).toBeVisible();
});

test('navigation links work correctly', async ({ page }) => {
  // Navigate to the dashboard page
  await page.goto('http://localhost:3000/');
  
  // Click on the Phonics link
  await page.getByRole('link', { name: 'Phonics' }).click();
  
  // Check if we're on the Phonics page
  await expect(page).toHaveURL(/.*\/phonics/);
  await expect(page.getByRole('heading', { name: 'Phonics Playground' })).toBeVisible();
  
  // Click on the Speech link
  await page.getByRole('link', { name: 'Speech' }).click();
  
  // Check if we're on the Speech page
  await expect(page).toHaveURL(/.*\/speech/);
  await expect(page.getByRole('heading', { name: 'Speech Practice' })).toBeVisible();
});
