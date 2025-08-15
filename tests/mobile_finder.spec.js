import { test, expect } from '@playwright/test';
import POManager from '../pageobjects/POManager.js';
import mobile_finder_test_data from '../utils/mobile_finder_test_data.json' assert {type: 'json'};
const products = JSON.parse(JSON.stringify(mobile_finder_test_data));

//test.describe.configure({mode:"serial"})
test.describe.configure({ mode: 'parallel' })
for (const product of products) {

  test(`@Web Search product ${product.ProductName}`, async ({ page }) => {

    try{
    const pomanager = new POManager(page);
    const title = `${product.ProductName}- Buy Products Online at Best Price in India - All Categories | Flipkart.com`;
    await pomanager.getLogin().goTo();
    await pomanager.getLogin().search.fill(product.ProductName);
    await page.keyboard.press("Enter");
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(title);
    await expect(pomanager.getProduct().price).toBeVisible({ timeout: 10000 });
    const productName = await pomanager.getProduct().product.textContent();
    console.log(productName);
    expect(productName).toContain(product.ProductName.split(" ")[0]);
    }catch(error){
      console.log(error);
      await page.close();
    }
  });
}