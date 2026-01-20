import { Page } from '@playwright/test';

interface OrderBody {
    orderId: string;
    orderDate: string;
    total: number;
    items: any[];
    status?: string;
    shippingAddress?: any;
}

class _OrdersApi {
    constructor(private page: Page) { }

    async getUserOrders(userId: number) {
        const response = await this.page.request.get(`/api/users/${userId}/orders`);
        return response;
    }

    async createOrder(userId: number, orderId: string, orderDate: string, total: number, items: any[], status?: string, shippingAddress?: any) {
        const body: OrderBody = {
            orderId,
            orderDate,
            total,
            items,
            status,
            shippingAddress
        };
        const response = await this.page.request.post(`/api/users/${userId}/orders`, { data: body });
        return response;
    }
}

export const ordersApi = (page: Page) => new _OrdersApi(page);
