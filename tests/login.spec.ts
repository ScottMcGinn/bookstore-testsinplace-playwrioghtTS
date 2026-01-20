import { test, expect } from '@playwright/test';
import { login } from '../playwright/lib/login.lib';

const USERDETAILS = {
    customerUsername: 'customer',
    customerPassword: 'customer123',
    adminUsername: 'admin',
    adminPassword: 'admin123',
    staffUsername: 'staff',
    staffPassword: 'staff123'
};

test.describe('Login Tests', () => {
    test.beforeEach(async ({ page }) => {
        const newLogin = login(page);
        await newLogin.visit();
    });

    test('Login as customer', async ({ page }) => {
        const newLogin = login(page);
        await newLogin.login(USERDETAILS.customerUsername, USERDETAILS.customerPassword);
    });

    test('Login as admin', async ({ page }) => {
        const newLogin = login(page);
        await newLogin.login(USERDETAILS.adminUsername, USERDETAILS.adminPassword);
    });

    test('login as staff', async ({ page }) => {
        const newLogin = login(page);
        await newLogin.login(USERDETAILS.staffUsername, USERDETAILS.staffPassword);
    });

})