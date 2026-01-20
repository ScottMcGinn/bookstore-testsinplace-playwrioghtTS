import { test, expect } from '@playwright/test';
import { ordersApi } from '../playwright/lib/ordersApi.lib';

test.describe('Orders API tests @APITest', () => {
    test('Get user orders', async ({ page }) => {
        const response = await ordersApi(page).getUserOrders(3);
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody).toBeDefined();
        expect(responseBody.userId).toBe(3);
        expect(responseBody.userName).toBeDefined();
        expect(Array.isArray(responseBody.orders)).toBe(true);
    });

    test('Create new order for user', async ({ page }) => {
        const orderItems = [
            {
                bookId: 1,
                title: 'Test Book',
                quantity: 2,
                price: 15.99
            }
        ];

        const response = await ordersApi(page).createOrder(
            3,
            `ORD-${Date.now()}`,
            new Date().toISOString(),
            31.98,
            orderItems,
            'pending',
            {
                street: '123 Main St',
                city: 'New York',
                state: 'NY',
                zipCode: '10001',
                country: 'United States'
            }
        );
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.message).toBe('Order added successfully');
        expect(responseBody.order).toBeDefined();
        expect(responseBody.order.orderId).toBeDefined();
        expect(responseBody.order.total).toBe(31.98);
        expect(responseBody.order.status).toBe('pending');
        expect(responseBody.order.items).toEqual(orderItems);
    });

    test('Create order with default status', async ({ page }) => {
        const orderItems = [
            {
                bookId: 2,
                title: 'Another Book',
                quantity: 1,
                price: 12.99
            }
        ];

        const response = await ordersApi(page).createOrder(
            3,
            `ORD-${Date.now()}`,
            new Date().toISOString(),
            12.99,
            orderItems
        );
        
        expect(response.status()).toBe(200);
        
        const responseBody = await response.json();
        expect(responseBody.success).toBe(true);
        expect(responseBody.order.status).toBe('pending');
    });

    test('Get orders for non-existent user returns 404', async ({ page }) => {
        const response = await ordersApi(page).getUserOrders(999999);
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('User not found');
    });

    test('Create order for non-existent user returns 404', async ({ page }) => {
        const response = await ordersApi(page).createOrder(
            999999,
            `ORD-${Date.now()}`,
            new Date().toISOString(),
            10.00,
            []
        );
        
        expect(response.status()).toBe(404);
        
        const responseBody = await response.json();
        expect(responseBody.error).toBe('User not found');
    });
});
