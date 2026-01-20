import { Page, expect } from '@playwright/test';

class _CustomerMainPage {
    constructor(private page: Page) { }

    async clickProfileButton() {
        await this.page.locator('[aria-label="View my profile"]').click();
    }

    async clickPaymentMethodsTab() {
        await this.page.locator('[aria-label="View payment methods"]').click();
    }

}

export const customerMainPage = (page: Page) => new _CustomerMainPage(page);