import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  var BLOCK_ROBLOX = process.env.BLOCK_ROBLOX
  await page.goto('https://192.168.1.1/#/login/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fios Router/);

  await page.fill('[type="password"]', process.env.ROUTER_PASS!);
  await page.click('[aria-label="Log In"]');
  await page.getByLabel('Open Wi-Fi page group').click();
  await page.getByLabel('Open Devices page group').getByText('Devices').click();
  await page.getByLabel('Go to Parental Control page').click();
  await page.getByLabel('Enable rule switch').waitFor();
  var checked = await page.getByLabel('Enable rule switch').getAttribute('aria-checked');
  if(checked != "true" && BLOCK_ROBLOX == "true"){
      await page.getByLabel('Enable rule switch').locator('span').first().click();
  }
  if(checked == "true" && BLOCK_ROBLOX != "true"){
      await page.getByLabel('Enable rule switch').locator('span').first().click();
  }
});

