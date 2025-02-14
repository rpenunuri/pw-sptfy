import { Locator, Page, expect } from '@playwright/test';
import { SearchPage } from './search-page';

export class GlobalNavBar {
    private readonly page: Page;
    private readonly globalNavBarLocator: Locator;
    private readonly searchInputLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.globalNavBarLocator = this.page.locator('#global-nav-bar');
        this.searchInputLocator = this.globalNavBarLocator.getByTestId('search-input');
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.globalNavBarLocator).toBeVisible();
    }

    async searchFor(query: string): Promise<SearchPage> {
        // Start waiting for the search API request *before* triggering it
        const searchRequest = this.page.waitForResponse(response =>
            response.url().includes('/pathfinder/v1/query') && response.ok()
        );

        await this.searchInputLocator.fill(query);
        await searchRequest;

        const searchPage = new SearchPage(this.page);
        await searchPage.verifyPageLoaded();
        return searchPage;
    }
}