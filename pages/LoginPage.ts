import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
  }

  async login(username: string, password: string) {
    await this.page.locator('#Email').fill(username);
    await this.page.locator('#Password').fill(password);
    await this.page.locator('input[value="Log in"]').click();
  }
}