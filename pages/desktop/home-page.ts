import { Page, expect } from '@playwright/test';
import { BasePage } from '../base-page';
import { GlobalNavBar } from "./global-nav-bar";

export class HomePage extends BasePage {
    public readonly globalNavBar: GlobalNavBar;

    constructor(page: Page) {
        super(page);
        this.globalNavBar = new GlobalNavBar(page);
    }

    async verifyPageLoaded() {
        await expect(this.page).toHaveTitle(/Spotify/);
        await this.globalNavBar.verifyPageLoaded();
    }

    async goToHomePage() {
        await this.navigate('/');
    }
}