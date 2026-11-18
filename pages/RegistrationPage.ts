import { Locator, Page } from '@playwright/test';

export interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export class RegistrationPage {
    private readonly page: Page;

    // Locators
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly privacyPolicyCheckbox: Locator;
    private readonly continueButton: Locator;
    private readonly continueLink: Locator;
    private readonly registrationHeading: Locator;
    private readonly accountCreatedHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize locators with CSS selectors
        this.firstNameInput = page.getByPlaceholder('First Name');
        this.lastNameInput = page.getByPlaceholder('Last Name');
        this.emailInput = page.getByPlaceholder('E-Mail');
        this.passwordInput = page.getByPlaceholder('Password');
        this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.continueLink = page.getByRole('link', { name: 'Continue', exact: true });
        this.registrationHeading = page.getByRole('heading', { name: 'Register Account' });
        this.accountCreatedHeading = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
    }

    /**
     * Checks whether the registration form is displayed.
     * @returns Promise<boolean> - true if the registration form is visible
     */
    async isRegistrationPageVisible(): Promise<boolean> {
        await this.registrationHeading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Completes and submits the customer registration form.
     * @param customer - Customer details for the registration
     */
    async register(customer: RegistrationData): Promise<void> {
        await this.firstNameInput.fill(customer.firstName);
        await this.lastNameInput.fill(customer.lastName);
        await this.emailInput.fill(customer.email);
        await this.passwordInput.fill(customer.password);
        await this.privacyPolicyCheckbox.check();
        await this.continueButton.click();
    }

    /**
     * Checks whether the account-created confirmation is displayed.
     * @returns Promise<boolean> - true if registration succeeded
     */
    async isAccountCreated(): Promise<boolean> {
        await this.accountCreatedHeading.waitFor({ state: 'visible' });
        return true;
    }

    /**
     * Continues from the registration confirmation to the account dashboard.
     */
    async continueToAccount(): Promise<void> {
        await this.continueLink.click();
    }
}
