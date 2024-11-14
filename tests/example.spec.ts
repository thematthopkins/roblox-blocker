import { test, expect } from '@playwright/test';

test('setting roblox rule', async ({ page }) => {
  var BLOCK_ROBLOX = process.env.BLOCK_ROBLOX
  await page.goto('https://192.168.1.1/#/login/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Fios Router/);

  await page.fill('[type="password"]', process.env.ROUTER_PASS!);
  await page.click('[aria-label="Log In"]');
  await page.getByLabel('Devices page group collapsed').click();
  await page.getByLabel('Go to Parental Control page').click();
  await page.getByLabel('Enable profile switch').waitFor();
  var checked = await page.getByLabel('Enable profile switch').getAttribute('aria-checked');
  if(checked != "true" && BLOCK_ROBLOX == "true"){
      await page.getByLabel('Enable profile switch').locator('span').first().click();
  }
  if(checked == "true" && BLOCK_ROBLOX != "true"){
      await page.getByLabel('Enable profile switch').locator('span').first().click();
  }
  function timeout(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  await timeout(3000);
});

