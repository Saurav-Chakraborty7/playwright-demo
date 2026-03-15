const { test, expect } = require('@playwright/test');

test('Visit example.com and take a screenshot', async ({ page }) => {
  await page.goto('https://example.com');

  // Assert the title
  const title = await page.title();
  console.log('Page title:', title);
  expect(title).toBeTruthy();

  // Take a screenshot
  await page.screenshot({ path: 'screenshot.png' });
  console.log('Screenshot saved!');
});