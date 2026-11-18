import { Locator, Page } from '@playwright/test';

export class AccountPage {
    private readonly page: Page;

    // Locators
    private readonly accountHeading: Locator;
    private readonly myAccountButton: Locator;
    private readonly logoutLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.accountHeading = page.getByRole('heading', { name: 'My Account', level: 1 });
        this.myAccountButton = page.getByRole('button', { name: 'My Account' });
        this.logoutLink = page.getByRole('link', { name: 'Logout', exact: true }).first();
    }

    /**
     * Checks whether the authenticated account dashboard is displayed.
     * @returns Promise<boolean> - true if the account dashboard is visible
     */
    async isDashboardVisible(): Promise<boolean> {
        await this.accountHeading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Logs the customer out from the My Account menu.
     */
    async logout(): Promise<void> {
        await this.myAccountButton.click();
        await this.logoutLink.click();
    }
}
