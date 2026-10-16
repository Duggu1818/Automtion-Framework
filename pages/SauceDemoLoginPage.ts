import { type Locator, type Page } from '@playwright/test';

export class SauceDemoLoginPage {
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly acceptedUsernamesHeading: Locator;
  readonly passwordHeading: Locator;

  constructor(private readonly page: Page) {
    this.usernameField = page.getByRole('textbox', { name: 'Username' });
    this.passwordField = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('alert');
    this.acceptedUsernamesHeading = page.getByRole('heading', {
      name: 'Accepted usernames are:',
    });
    this.passwordHeading = page.getByRole('heading', {
      name: 'Password for all users:',
    });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameField.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordField.fill(password);
  }

  async submit(): Promise<void> {
    await this.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.submit();
  }

  getAcceptedUsername(username: string): Locator {
    return this.page.getByText(username, { exact: false });
  }

  getSharedPassword(password: string): Locator {
    return this.page.getByText(password, { exact: false });
  }
}
