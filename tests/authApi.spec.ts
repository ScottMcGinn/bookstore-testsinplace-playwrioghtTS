import { test, expect } from '@playwright/test';
import { authApi } from '../playwright/lib/authApi.lib';

test.describe('AuthAPI tests @APITest', () => {

    test.afterEach(async ({ page }) => {
        await authApi(page).cleanUp('newCustomer');
        await authApi(page).cleanUp('newStaff');
    });

    test('Register customer via API', async ({ page }) => {
        const response = await authApi(page).registerCustomer('newCustomer', 'cust1234', 'newcustomer@example.com', 'New', 'Customer');
        
        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Registration successful! Welcome to Bookstore!');
        expect(responseBody.user).toBeDefined();
        expect(responseBody.user.username).toBe('newCustomer');
        expect(responseBody.user.email).toBe('newcustomer@example.com');
        expect(responseBody.user.role).toBe('customer');
        expect(responseBody.user.firstName).toBe('New');
        expect(responseBody.user.lastName).toBe('Customer');
    });

    test('Register staff via API', async ({ page }) => {
        const response = await authApi(page).registerStaff('newStaff', 'staff1234', 'newstaff@example.com', 'New', 'Staff');

        expect(response.status()).toBe(201);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Staff member "New Staff" has been added successfully!');
        expect(responseBody.user).toBeDefined();
        expect(responseBody.user.username).toBe('newStaff');
        expect(responseBody.user.email).toBe('newstaff@example.com');
        expect(responseBody.user.role).toBe('staff');
        expect(responseBody.user.firstName).toBe('New');
        expect(responseBody.user.lastName).toBe('Staff');

    });

    test('Login customer via API', async ({ page }) => {
        const response = await authApi(page).registerCustomer('newCustomer', 'cust1234', 'newcustomer@example.com', 'New', 'Customer');     
      
        const custUser = authApi(page);
        const loginResponse = await custUser.loginCustomer('newCustomer', 'cust1234');
        
        expect(loginResponse.status()).toBe(200);
        
        const responseBody = await loginResponse.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toContain('Welcome');
        expect(responseBody.user).toBeDefined();
        expect(responseBody.user.username).toBe('newCustomer');
        expect(responseBody.user.email).toBe('newcustomer@example.com');
        expect(responseBody.user.role).toBe('customer');
    });

});