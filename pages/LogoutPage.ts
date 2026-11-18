import { Locator, Page } from '@playwright/test';

export class LogoutPage {
    private readonly page: Page;

    // Locators
    private readonly logoutHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.logoutHeading = page.getByRole('heading', { name: 'Account Logout' });
    }

    /**
     * Checks whether the logout confirmation page is displayed.
     * @returns Promise<boolean> - true if logout succeeded
     */
    async isLogoutConfirmationVisible(): Promise<boolean> {
        await this.logoutHeading.waitFor({ state: 'visible' });
        return true;
    }
}
