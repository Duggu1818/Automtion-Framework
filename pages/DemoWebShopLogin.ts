import { Page } from '@playwright/test';

export type RegistrationDetails = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export class DemoWebShopLogin {
  constructor(private page: Page) {}

  async openRegistrationPage() {
    await this.page.goto('https://demowebshop.tricentis.com/register');
  }

  async register(details: RegistrationDetails) {
    await this.page.locator('#gender-male').check();
    await this.page.locator('#FirstName').fill(details.firstName);
    await this.page.locator('#LastName').fill(details.lastName);
    await this.page.locator('#Email').fill(details.email);
    await this.page.locator('#Password').fill(details.password);
    await this.page.locator('#ConfirmPassword').fill(details.password);
    await this.page.locator('#register-button').click();
  }

  async logout() {
    await this.page.locator('a:has-text("Log out")').click();
  }

  async openLoginPage() {
    await this.page.goto('https://demowebshop.tricentis.com/login');
  }

  async login(email: string, password: string) {
    await this.page.locator('#Email').fill(email);
    await this.page.locator('#Password').fill(password);
    await this.page.locator('input[value="Log in"]').click();
  }

  async openBooks() {
    await this.page.getByRole('link', { name: 'Books', exact: true }).first().click();
  }

  async filterBooksUnderPrice(price: string) {
    await this.page.getByRole('link', { name: `Under ${price}` }).click();
  }

  async openBook(bookName: string) {
    await this.page.getByRole('link', { name: bookName, exact: true }).click();
  }

  async addBookToCart() {
    await this.page.locator('#add-to-cart-button-45').click();
  }

  async openShoppingCart() {
    await this.page.getByRole('link', { name: /Shopping cart \(\d+\)/ }).click();
  }
}
