/**
 * Test Case: End-to-end customer shopping flow
 *
 * Tags: @master @sanity @regression @web @end-to-end
 *
 * Steps:
 * 1) Register a new customer and verify the confirmation
 * 2) Log out and authenticate again with the new credentials
 * 3) Search for MacBook, add it to the cart, and verify cart details
 */

import { test, expect } from '../../fixtures/pageFixtures';
import { RandomDataUtil } from '../../utils/dataGenerator';
import { Helper } from '../../utils/helper';

console.log("hello Shriya")
test('End-to-end shopping flow @master @sanity @regression @web @end-to-end', async ({
    pageErrors,
    homePage,
    registrationPage,
    loginPage,
    accountPage,
    logoutPage,
    productPage,
    cartPage
}) => {
    const customer = {
        firstName: RandomDataUtil.getFirstName(),
        lastName: RandomDataUtil.getLastName(),
        email: `e2e-${Date.now()}-${RandomDataUtil.getEmail()}`,
        password: RandomDataUtil.getPassword(12)
    };
    const { productName, productQuantity, totalPrice } = Helper.getProductDetails();

    await test.step('1) Register a dynamically generated customer', async () => {
        await homePage.openRegistrationPage();
        expect(await registrationPage.isRegistrationPageVisible()).toBeTruthy();
        await registrationPage.register(customer);
        expect(await registrationPage.isAccountCreated()).toBeTruthy();
    });

    await test.step('2) Log out of the newly created account', async () => {
        await registrationPage.continueToAccount();
        expect(await accountPage.isDashboardVisible()).toBeTruthy();
        await accountPage.logout();
        expect(await logoutPage.isLogoutConfirmationVisible()).toBeTruthy();
    });

    await test.step('3) Log in again with the new customer credentials', async () => {
        await homePage.openLoginPage();
        await loginPage.login(customer.email, customer.password);
        expect(await accountPage.isDashboardVisible()).toBeTruthy();
    });

    await test.step('4) Search for the known product', async () => {
        await homePage.searchForProduct(productName);
        expect(await productPage.areSearchResultsVisible()).toBeTruthy();
    });

    await test.step('5) Open product details and add the product to the cart', async () => {
        await productPage.openProductFromSearchResults(productName);
        expect(await productPage.isProductDetailsVisible(productName)).toBeTruthy();
        expect(await productPage.getDisplayedPrice()).toBe(totalPrice);
        await productPage.setQuantity(productQuantity);
        await productPage.addToCart();
        expect(await productPage.isAddedToCartMessageVisible()).toBeTruthy();
    });

    await test.step('6) Verify the product, quantity, price, and total in the cart', async () => {
        await homePage.openShoppingCart();
        expect(await cartPage.isCartVisible()).toBeTruthy();
        expect(await cartPage.isProductPresent(productName)).toBeTruthy();
        expect(await cartPage.getProductQuantity(productName)).toBe(productQuantity);
        expect(await cartPage.getProductUnitPrice(productName)).toBe(totalPrice);
        expect(await cartPage.getCartTotal()).toBe(totalPrice);
    });

    await test.step('7) Confirm the journey completed without page errors', async () => {
        expect(pageErrors).toEqual([]);
    });

    console.log('✅ Completed the end-to-end shopping flow successfully.');
});
