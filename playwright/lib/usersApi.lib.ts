import { Page } from '@playwright/test';

interface ProfileUpdateBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
}

class _UsersApi {
    constructor(private page: Page) { }

    async getAllUsers() {
        const response = await this.page.request.get('/api/users');
        return response;
    }

    async getUserProfile(userId: number) {
        const response = await this.page.request.get(`/api/users/${userId}/profile`);
        return response;
    }

    async updateUserProfile(userId: number, updates: ProfileUpdateBody) {
        const response = await this.page.request.put(`/api/users/${userId}/profile`, { data: updates });
        return response;
    }
}

export const usersApi = (page: Page) => new _UsersApi(page);
