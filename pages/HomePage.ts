import { Locator, Page } from '@playwright/test';

export class HomePage {
    private readonly page: Page;

    // Locators
    private readonly myAccountButton: Locator;
    private readonly searchInput: Locator;
    private readonly shoppingCartLink: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.myAccountButton = page.getByRole('button', { name: 'My Account' });
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
        this.shoppingCartLink = page.getByRole('link', { name: 'Shopping Cart', exact: true }).first();
    }

    /**
     * Opens the registration page from the My Account menu.
     */
    async openRegistrationPage(): Promise<void> {
        await this.myAccountButton.click();
        await this.page.getByRole('link', { name: 'Register', exact: true }).first().click();
    }

    /**
     * Opens the login page from the My Account menu.
     */
    async openLoginPage(): Promise<void> {
        await this.myAccountButton.click();
        await this.page.getByRole('link', { name: 'Login', exact: true }).first().click();
    }

    /**
     * Searches the catalog for a product.
     * @param productName - Product name to search for
     */
    async searchForProduct(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchInput.press('Enter');
    }

    /**
     * Opens the shopping cart.
     */
    async openShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }
}
