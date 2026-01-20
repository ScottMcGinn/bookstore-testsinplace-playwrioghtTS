import { Page, expect } from '@playwright/test';

class _Login {
    constructor(private page: Page) { }

    async visit() {
        await this.page.goto('/');
        const h1 = this.page.locator("h1");
        await expect(h1).toContainText("Bookstore");
    }

    async login(username: string, password: string) {
        await this.page.locator(`[aria-label="Username input"]`).fill(username);
        await this.page.locator(`[aria-label="Password input"]`).fill(password);
        await this.page.locator(`[aria-label="Click to login"]`).click()
    }

}

export const login = (page: Page) => new _Login(page);