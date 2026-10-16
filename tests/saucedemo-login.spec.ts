import { expect, test } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { SauceDemoLoginPage } from '../pages/SauceDemoLoginPage';

test.describe('SauceDemo login', () => {
  let loginPage: SauceDemoLoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new SauceDemoLoginPage(page);
    await loginPage.goto();
  });

  test('displays the login form and demo credential hints', async ({ page }) => {
    await expect(page).toHaveTitle('Swag Labs');
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.acceptedUsernamesHeading).toBeVisible();
    await expect(loginPage.passwordHeading).toBeVisible();
    await expect(loginPage.getAcceptedUsername('standard_user')).toBeVisible();
    await expect(loginPage.getSharedPassword('secret_sauce')).toBeVisible();
  });

  test('logs in with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');

    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });

  test('requires a username', async ({ page }) => {
    await loginPage.submit();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username is required',
    );
  });

  test('requires a password', async ({ page }) => {
    await loginPage.enterUsername('standard_user');
    await loginPage.submit();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Password is required',
    );
  });

  test('rejects invalid credentials', async ({ page }) => {
    await loginPage.login('invalid_user', 'wrong_password');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Username and password do not match any user in this service',
    );
  });

  test('rejects a locked-out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.errorMessage).toHaveText(
      'Epic sadface: Sorry, this user has been locked out.',
    );
  });

  test('shows the documented demo credentials', async () => {
    await expect(loginPage.getSharedPassword('secret_sauce')).toBeVisible();
    await expect(loginPage.getAcceptedUsername('standard_user')).toBeVisible();
    await expect(loginPage.getAcceptedUsername('locked_out_user')).toBeVisible();
  });
});
