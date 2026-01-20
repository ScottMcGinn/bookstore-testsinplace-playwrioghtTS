import { test, expect } from '@playwright/test';
import { paymentMethodApi } from '../playwright/lib/paymentMethodApi.lib';

test.describe('Payment Methods API tests @APITest', () => {
    let createdPaymentMethodId: string;

    test('Get user payment methods', async ({ page }) => {
        const response = await paymentMethodApi(page).getUserPaymentMethods(3);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
        expect(responseBody.userId).toBe(3);
        expect(Array.isArray(responseBody.paymentMethods)).toBe(true);
    });

    test('Add new payment method', async ({ page }) => {
        const response = await paymentMethodApi(page).addPaymentMethod(
            3,
            'credit_card',
            '4242',
            'Visa',
            '12',
            '2025',
            false
        );
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Payment method saved successfully');
        expect(responseBody.paymentMethod).toBeDefined();
        expect(responseBody.paymentMethod.id).toBeDefined();
        expect(responseBody.paymentMethod.type).toBe('credit_card');
        expect(responseBody.paymentMethod.lastFour).toBe('4242');
        expect(responseBody.paymentMethod.brand).toBe('Visa');
        expect(responseBody.paymentMethod.expiryMonth).toBe('12');
        expect(responseBody.paymentMethod.expiryYear).toBe('2025');
        expect(responseBody.paymentMethod.isDefault).toBe(false);
        
        createdPaymentMethodId = responseBody.paymentMethod.id;
    });

    test('Add default payment method', async ({ page }) => {
        const response = await paymentMethodApi(page).addPaymentMethod(
            3,
            'credit_card',
            '5555',
            'Mastercard',
            '06',
            '2026',
            true
        );
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.paymentMethod.isDefault).toBe(true);
    });

    test('Delete payment method', async ({ page }) => {
        const addResponse = await paymentMethodApi(page).addPaymentMethod(
            3,
            'credit_card',
            '1111',
            'Amex',
            '03',
            '2027',
            false
        );
        const addedPaymentMethod = await addResponse.json();
        
        const response = await paymentMethodApi(page).deletePaymentMethod(
            3,
            addedPaymentMethod.paymentMethod.id
        );
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Payment method deleted successfully');
    });

    test('Get payment methods for non-existent user returns 404', async ({ page }) => {
        const response = await paymentMethodApi(page).getUserPaymentMethods(999999);
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('User not found');
    });

    test('Add payment method for non-existent user returns 404', async ({ page }) => {
        const response = await paymentMethodApi(page).addPaymentMethod(
            999999,
            'credit_card',
            '9999',
            'Visa',
            '12',
            '2025'
        );
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('User not found');
    });

    test('Delete non-existent payment method returns 404', async ({ page }) => {
        const response = await paymentMethodApi(page).deletePaymentMethod(
            3,
            'pm_nonexistent'
        );
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('Payment method not found');
    });
});
