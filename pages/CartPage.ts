import { Locator, Page } from '@playwright/test';

export class CartPage {
    private readonly page: Page;

    // Locators
    private readonly cartHeading: Locator;
    private readonly totalLabel: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.cartHeading = page.getByRole('heading', { name: /Shopping Cart/ });
        this.totalLabel = page.getByText('Total', { exact: true });
    }

    /**
     * Checks whether the shopping cart page is displayed.
     * @returns Promise<boolean> - true if the cart page is visible
     */
    async isCartVisible(): Promise<boolean> {
        await this.cartHeading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Checks whether the requested product is present in the cart.
     * @param productName - Exact name of the product
     * @returns Promise<boolean> - true if the product is present
     */
    async isProductPresent(productName: string): Promise<boolean> {
        await this.getProductRow(productName).waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Reads the product quantity from the cart.
     * @param productName - Exact name of the product
     * @returns Promise<string> - Quantity displayed in the cart
     */
    async getProductQuantity(productName: string): Promise<string> {
        return this.getProductRow(productName).getByRole('textbox').inputValue();
    }

    /**
     * Reads the product unit price from the cart.
     * @param productName - Exact name of the product
     * @returns Promise<string> - Formatted unit price
     */
    async getProductUnitPrice(productName: string): Promise<string> {
        return this.getProductRow(productName).getByRole('cell').nth(3).innerText();
    }

    /**
     * Reads the applicable total from the cart totals table.
     * @returns Promise<string> - Formatted cart total
     */
    async getCartTotal(): Promise<string> {
        const totalRow = this.page.getByRole('row').filter({ has: this.totalLabel });
        return totalRow.getByRole('cell').nth(1).innerText();
    }

    private getProductRow(productName: string): Locator {
        return this.page.getByRole('row').filter({ hasText: productName });
    }
}
