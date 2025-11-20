import { test, expect } from '@playwright/test';

test.describe('Recipe flashcard happy path', () => {
  test('visitor can navigate marketing funnel', async ({ page }) => {
    await page.goto(process.env.FRONTEND_URL ?? 'http://localhost:5173');
    await expect(page.getByRole('heading', { name: /Master your recipes/i })).toBeVisible();
    await page.getByRole('link', { name: /Share a recipe/i }).click();
    await expect(page).toHaveURL(/auth/);
  });
});

