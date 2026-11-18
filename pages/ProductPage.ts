import { Locator, Page } from '@playwright/test';

export class ProductPage {
    private readonly page: Page;

    // Locators
    private readonly searchResultsHeading: Locator;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly addToCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.searchResultsHeading = page.getByRole('heading', { name: 'Products meeting the search criteria' });
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.addToCartMessage = page.getByText('Success: You have added', { exact: false });
    }

    /**
     * Checks whether product search results are displayed.
     * @returns Promise<boolean> - true if search results are visible
     */
    async areSearchResultsVisible(): Promise<boolean> {
        await this.searchResultsHeading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Opens a product from the search results.
     * @param productName - Exact name of the product
     */
    async openProductFromSearchResults(productName: string): Promise<void> {
        await this.page.getByRole('link', { name: productName, exact: true }).last().click();
    }

    /**
     * Checks whether the selected product details are displayed.
     * @param productName - Exact name of the product
     * @returns Promise<boolean> - true if product details are visible
     */
    async isProductDetailsVisible(productName: string): Promise<boolean> {
        await this.page.getByRole('heading', { name: productName, exact: true }).waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Sets the requested product quantity.
     * @param quantity - Quantity to add to the cart
     */
    async setQuantity(quantity: string): Promise<void> {
        await this.quantityInput.fill(quantity);
    }

    /**
     * Reads the displayed product price.
     * @returns Promise<string> - Formatted product price
     */
    async getDisplayedPrice(): Promise<string> {
        return this.page.getByRole('heading', { level: 2 }).innerText();
    }

    /**
     * Adds the product to the shopping cart.
     */
    async addToCart(): Promise<void> {
        await this.addToCartButton.click();
    }

    /**
     * Checks whether the product-added confirmation is displayed.
     * @returns Promise<boolean> - true if the confirmation is visible
     */
    async isAddedToCartMessageVisible(): Promise<boolean> {
        await this.addToCartMessage.waitFor({ state: 'visible' });
        return true;
    }
}
