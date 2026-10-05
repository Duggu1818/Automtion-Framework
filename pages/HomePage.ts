import { Page, expect } from '@playwright/test';
export class HomePage {
  constructor(private page: Page) {}
  async verifyHomePage() {
    await expect(this.page).toHaveURL(/dashboard/);
  }
  async logout() {
    await this.page.locator('.oxd-userdropdown-tab').click();
    await this.page.locator('text=Logout').click();
  }
}