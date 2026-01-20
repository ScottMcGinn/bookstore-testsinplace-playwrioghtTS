import { test, expect } from '@playwright/test';
import { usersApi } from '../playwright/lib/usersApi.lib';

test.describe('Users API tests @APITest', () => {
    test('Get all users', async ({ page }) => {
        const response = await usersApi(page).getAllUsers();
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBe(true);
        expect(responseBody.length).toBeGreaterThan(0);
        responseBody.forEach((user: any) => {
            expect(user.password).toBeUndefined();
        });
    });

    test('Get user profile by ID', async ({ page }) => {
        const response = await usersApi(page).getUserProfile(1);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
        expect(responseBody.id).toBe(1);
        expect(responseBody.username).toBeDefined();
        expect(responseBody.email).toBeDefined();
        expect(responseBody.role).toBeDefined();
        expect(responseBody.password).toBeUndefined();
    });

    test('Update user profile', async ({ page }) => {
        const response = await usersApi(page).updateUserProfile(3, {
            firstName: 'UpdatedFirstName',
            lastName: 'UpdatedLastName',
            phone: '555-1234'
        });
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Profile updated successfully');
        expect(responseBody.user).toBeDefined();
        expect(responseBody.user.profile.firstName).toBe('UpdatedFirstName');
        expect(responseBody.user.profile.lastName).toBe('UpdatedLastName');
        expect(responseBody.user.profile.phone).toBe('555-1234');
    });

    test('Update user profile with address', async ({ page }) => {
        const response = await usersApi(page).updateUserProfile(3, {
            address: {
                street: '456 Test Ave',
                city: 'Test City',
                state: 'TC',
                zipCode: '12345',
                country: 'Test Country'
            }
        });
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.user.profile.address).toBeDefined();
        expect(responseBody.user.profile.address.street).toBe('456 Test Ave');
        expect(responseBody.user.profile.address.city).toBe('Test City');
    });

    test('Get non-existent user profile returns 404', async ({ page }) => {
        const response = await usersApi(page).getUserProfile(999999);
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('User not found');
    });
});
