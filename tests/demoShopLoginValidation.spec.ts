import { expect, test } from '@playwright/test';
import { DemoWebShopLogin } from '../pages/DemoWebShopLogin';

test.describe.serial('Demo Web Shop login validation', () => {
  test.setTimeout(120000);

  const password = 'Valid@1234';
  const email = `login${Date.now()}@test.com`;

  test.beforeAll(async ({ browser }, testInfo) => {
    testInfo.setTimeout(120000);
    const page = await browser.newPage();
    const demoWebShopLogin = new DemoWebShopLogin(page);

    await demoWebShopLogin.openRegistrationPage();
    await demoWebShopLogin.register({
      firstName: 'Login',
      lastName: 'Tester',
      email,
      password,
    });
    await expect(page.getByText('Your registration completed', { exact: true })).toBeVisible();
    await page.close();
  });

  test('logs in with valid username and valid password', async ({ page }) => {
    const demoWebShopLogin = new DemoWebShopLogin(page);

    await demoWebShopLogin.openLoginPage();
    await demoWebShopLogin.login(email, password);

    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.getByRole('link', { name: email, exact: true })).toBeVisible();
  });

  const invalidLoginCases = [
    { name: 'invalid username and valid password', username: 'missing-user@test.com', password },
    { name: 'valid username and invalid password', username: email, password: 'Wrong@1234' },
    { name: 'invalid username and invalid password', username: 'missing-user@test.com', password: 'Wrong@1234' },
    { name: 'empty username', username: '', password },
    { name: 'empty password', username: email, password: '' },
    { name: 'both fields empty', username: '', password: '' },
    { name: 'username with leading space', username: ` ${email}`, password },
    { name: 'username with trailing space', username: `${email} `, password },
    { name: 'password with leading space', username: email, password: ` ${password}` },
    { name: 'password with trailing space', username: email, password: `${password} ` },
    { name: 'username containing only spaces', username: '   ', password },
    { name: 'password containing only spaces', username: email, password: '   ' },
    { name: 'special characters', username: '<>!#$%^&*()', password: '{}[]|\\:;"\'<>?' },
    { name: 'username below minimum length', username: 'a', password },
    { name: 'password below minimum length', username: email, password: 'a' },
    { name: 'maximum length username', username: `${'a'.repeat(254)}@test.com`, password },
    { name: 'maximum length password', username: email, password: 'P'.repeat(1000) },
    { name: 'very long username and password', username: 'u'.repeat(5000), password: 'p'.repeat(5000) },
    { name: 'case-sensitive password', username: email, password: password.toUpperCase() },
  ];

  for (const loginCase of invalidLoginCases) {
    test(`rejects ${loginCase.name}`, async ({ page }) => {
      const demoWebShopLogin = new DemoWebShopLogin(page);

      await demoWebShopLogin.openLoginPage();
      await demoWebShopLogin.login(loginCase.username, loginCase.password);

      await expect(page).not.toHaveURL('https://demowebshop.tricentis.com/');
      await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
    });
  }

  test('shows UI validation for an invalid email format', async ({ page }) => {
    const demoWebShopLogin = new DemoWebShopLogin(page);

    await demoWebShopLogin.openLoginPage();
    await demoWebShopLogin.login('invalid-email', password);

    await expect(page.getByText('Please enter a valid email address.', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Welcome, Please Sign In!' })).toBeVisible();
  });

  test('accepts a username with different letter casing', async ({ page }) => {
    const demoWebShopLogin = new DemoWebShopLogin(page);

    await demoWebShopLogin.openLoginPage();
    await demoWebShopLogin.login(email.toUpperCase(), password);

    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    await expect(page.getByRole('link', { name: email, exact: true })).toBeVisible();
  });
});
