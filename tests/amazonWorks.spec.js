const { test, expect } = require('@playwright/test');

test('register a dummy user, add the Men Tshirt to cart, and log out', async ({ page }) => {
  test.setTimeout(120000);

  const name = `Playwright Demo ${Date.now()}`;
  const email = `playwright.demo.${Date.now()}@example.com`;
  const password = 'DummyPass123!';

  test.info().annotations.push({
    type: 'catalog-limitation',
    description: 'AutomationExercise offers the Men Tshirt at Rs. 400 but does not expose product color or a numeric star rating.'
  });

  await page.goto('https://automationexercise.com/login');
  await page.locator('[data-qa="signup-name"]').fill(name);
  await page.locator('[data-qa="signup-email"]').fill(email);
  await page.locator('[data-qa="signup-button"]').click();

  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(password);
  await page.locator('#first_name').fill('Playwright');
  await page.locator('#last_name').fill('Demo');
  await page.locator('#address1').fill('123 Test Street');
  await page.locator('#country').selectOption({ label: 'India' });
  await page.locator('#state').fill('Tamil Nadu');
  await page.locator('#city').fill('Chennai');
  await page.locator('#zipcode').fill('600001');
  await page.locator('#mobile_number').fill('9000000000');
  await page.locator('[data-qa="create-account"]').click();

  await expect(page.getByRole('heading', { name: 'Account Created!' })).toBeVisible();
  await page.getByRole('link', { name: 'Continue' }).click();
  await expect(page.getByText(`Logged in as ${name}`)).toBeVisible();

  await page.goto('https://automationexercise.com/product_details/2');
  const productDetails = page.locator('.product-information');
  await expect(productDetails).toContainText('Men Tshirt');
  await expect(productDetails).toContainText('Rs. 400');
  await page.getByRole('button', { name: /add to cart/i }).click();

  await page.goto('https://automationexercise.com/view_cart');
  const cartItem = page.locator('#cart_info_table tbody tr').filter({ hasText: 'Men Tshirt' });
  await expect(cartItem).toBeVisible();
  await expect(cartItem).toContainText('Rs. 400');

  await page.getByRole('link', { name: 'Logout' }).click();
  await expect(page).toHaveURL(/\/login$/);
});