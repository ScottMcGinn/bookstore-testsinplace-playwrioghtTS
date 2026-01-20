import { test, expect } from '@playwright/test';
import { login } from '../playwright/lib/login.lib';
import { customerMainPage } from '../playwright/lib/customerMainPage.lib';

const USERDETAILS = {
    customerUsername: 'customer',
    customerPassword: 'customer123',
    name: 'Customer Bookstore',
    email: 'customer@bookstore.com',
    phone: '555-1234',
    address: '456 Test Ave, Test City TC 12345, Test Country'
};

const PROFILEINFO_ELEMENTS = {
    name: '[aria-label="User full name"]',
    email: '[aria-label="User email address"]',
    phone: '[aria-label="User phone number"]',
    address: '[aria-label="User address"]'
}

test.describe('Customer Page Tests', () => {
    test.beforeEach(async ({ page }) => {
        const newLogin = login(page);
        await newLogin.visit();
    });

    test('Check Customers Profile Info', async ({ page }) => {
        const newLogin = login(page);
        const customerPage = customerMainPage(page);
        await newLogin.login(USERDETAILS.customerUsername, USERDETAILS.customerPassword);

        // Verify that the profile page is displayed
        await customerPage.clickProfileButton();

        await expect(page.locator(PROFILEINFO_ELEMENTS.name)).toHaveText(USERDETAILS.name);
        await expect(page.locator(PROFILEINFO_ELEMENTS.email)).toHaveText(USERDETAILS.email);
        await expect(page.locator(PROFILEINFO_ELEMENTS.phone)).toHaveText(USERDETAILS.phone);
        await expect(page.locator(PROFILEINFO_ELEMENTS.address)).toHaveText(USERDETAILS.address);
    });

})