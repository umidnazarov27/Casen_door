import { expect, test } from '@playwright/test';

test('keeps selections, opens a real PDF without email, and exposes a download link', async ({ page, request }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Choose your layout' })).toBeVisible();
  await page.getByRole('radio', { name: /L-shaped/ }).check();
  await page.getByRole('button', { name: 'Continue to Island' }).click();
  await page.getByRole('radio', { name: /Compact island/ }).check();
  await page.getByRole('button', { name: 'Continue to Storage' }).click();
  await page.getByRole('checkbox', { name: /Cutlery organiser/ }).check();
  await page.getByRole('button', { name: 'Continue to Carcass' }).click();
  await page.getByRole('radio', { name: /Natural oak/ }).check();
  await expect(page.getByTestId('total')).toHaveText('£15,108');
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByRole('checkbox', { name: /Cutlery organiser/ })).toBeChecked();
  await page.getByRole('button', { name: 'Continue to Carcass' }).click();
  await page.getByRole('button', { name: 'File Quotation' }).click();
  const link = page.getByRole('link', { name: 'View / download PDF' });
  await expect(link).toBeVisible();
  const href = await link.getAttribute('href');
  const response = await request.get(href!);
  expect(response.headers()['content-type']).toContain('application/pdf');
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await expect(page.getByText('Email delivery is not connected in this preview.')).toBeVisible();
  expect(errors).toEqual([]);
});

test('has no horizontal overflow and supports the image dialog', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Choose your layout' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: 'Enlarge reference image' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
