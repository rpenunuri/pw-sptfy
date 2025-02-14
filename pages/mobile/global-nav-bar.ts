import { Locator, Page, expect } from "@playwright/test";
import { SearchPage } from "./search-page";

export class GlobalNavBar {
    private readonly page: Page;
    private readonly globalNavBarLocator: Locator;
    private readonly searchIconLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.globalNavBarLocator = this.page.getByTestId('entity-view-top-bar');
        this.searchIconLocator = this.globalNavBarLocator.getByTestId('search-icon');
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.globalNavBarLocator).toBeVisible();
    }

    async clickOnSearchIcon(): Promise<SearchPage> {
        await this.searchIconLocator.click();
        const searchPage = new SearchPage(this.page);
        await searchPage.verifyPageLoaded();
        return searchPage;
    }
}