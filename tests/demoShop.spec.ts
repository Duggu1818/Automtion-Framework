import { test, expect } from '@playwright/test';
import { DemoWebShopLogin } from '../pages/DemoWebShopLogin';

test('Register and Login - Demo Web Shop', async ({ page }) => {
  test.setTimeout(120000);

  const demoWebShopLogin = new DemoWebShopLogin(page);
  const password = 'Arun@1234';
  const email = `arun${Date.now()}@test.com`;

  await demoWebShopLogin.openRegistrationPage();
  await demoWebShopLogin.register({
    firstName: 'Arun',
    lastName: 'Kumar',
    email,
    password,
  });

  await expect(page.getByText('Your registration completed', { exact: true })).toBeVisible();
  await demoWebShopLogin.logout();

  await demoWebShopLogin.openLoginPage();
  await demoWebShopLogin.login(email, password);

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
  await expect(page.getByRole('link', { name: email, exact: true })).toBeVisible();

  await demoWebShopLogin.openBooks();
  await demoWebShopLogin.filterBooksUnderPrice('25.00');
  await demoWebShopLogin.openBook('Fiction');
  await expect(page.getByText('Price: 24.00', { exact: true })).toBeVisible();

  await demoWebShopLogin.addBookToCart();
  await expect(page.getByRole('link', { name: /Shopping cart \(1\)/ })).toBeVisible();
  await demoWebShopLogin.openShoppingCart();

  await expect(page).toHaveURL('https://demowebshop.tricentis.com/cart');
  const cartItem = page.locator('.cart-item-row', { has: page.locator('a.product-name', { hasText: 'Fiction' }) });
  await expect(cartItem).toBeVisible();
  await expect(cartItem).toContainText('24.00');
});