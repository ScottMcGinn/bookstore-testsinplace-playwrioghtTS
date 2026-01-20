import { Page } from '@playwright/test';

interface PaymentMethodBody {
    type: string;
    lastFour: string;
    brand: string;
    expiryMonth: string;
    expiryYear: string;
    isDefault?: boolean;
}

class _PaymentMethodApi {
    constructor(private page: Page) { }

    async getUserPaymentMethods(userId: number) {
        const response = await this.page.request.get(`/api/users/${userId}/payment-methods`);
        return response;
    }

    async addPaymentMethod(userId: number, type: string, lastFour: string, brand: string, expiryMonth: string, expiryYear: string, isDefault?: boolean) {
        const body: PaymentMethodBody = {
            type,
            lastFour,
            brand,
            expiryMonth,
            expiryYear,
            isDefault
        };
        const response = await this.page.request.post(`/api/users/${userId}/payment-methods`, { data: body });
        return response;
    }

    async deletePaymentMethod(userId: number, paymentMethodId: string) {
        const response = await this.page.request.delete(`/api/users/${userId}/payment-methods/${paymentMethodId}`);
        return response;
    }
}

export const paymentMethodApi = (page: Page) => new _PaymentMethodApi(page);
