import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { loginData } from '../test-data/loginData';

test('logout test', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // 1. Login
  await loginPage.goto();
  await loginPage.login(loginData.username, loginData.password);
  await homePage.verifyHomePage();

  // 2. Logout
  await homePage.logout();
});     