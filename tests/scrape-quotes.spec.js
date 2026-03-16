const { test, expect } = require('@playwright/test');
const { saveToJSON } = require('../utils/saveToFile');

test('Scrape all quotes from quotes.toscrape.com', async ({ page }) => {
  const allQuotes = [];
  let currentPage = 1;
  let hasNextPage = true;

  while (hasNextPage) {
    const url = `https://quotes.toscrape.com/page/${currentPage}/`;
    console.log(`\n🔍 Scraping page ${currentPage}: ${url}`);

    await page.goto(url);

    // Extract all quotes on this page
    const quotes = await page.evaluate(() => {
      const items = document.querySelectorAll('.quote');
      return Array.from(items).map(item => ({
        text: item.querySelector('.text')?.innerText || '',
        author: item.querySelector('.author')?.innerText || '',
        tags: Array.from(item.querySelectorAll('.tag')).map(t => t.innerText),
      }));
    });

    console.log(`   Found ${quotes.length} quotes`);
    allQuotes.push(...quotes);

    // Check if there's a next page
    const nextBtn = await page.$('.next a');
    if (nextBtn) {
      currentPage++;
    } else {
      hasNextPage = false;
    }
  }

  console.log(`\n📦 Total quotes scraped: ${allQuotes.length}`);

  // Save to file
  saveToJSON('quotes.json', allQuotes);

  // Basic assertion
  expect(allQuotes.length).toBeGreaterThan(0);
  expect(allQuotes[0]).toHaveProperty('text');
  expect(allQuotes[0]).toHaveProperty('author');
  expect(allQuotes[0]).toHaveProperty('tags');
});