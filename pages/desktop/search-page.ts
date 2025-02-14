import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { ArtistPage } from "./artist-page";

export class SearchPage extends BasePage {
    private readonly ArtistsCategoryCheckboxLocator: Locator;
    private readonly searchResultsGridLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.searchResultsGridLocator = this.page.getByTestId('grid-container');
        this.ArtistsCategoryCheckboxLocator = this.page.getByRole('checkbox', { name: 'Artists' });  
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Spotify – Search/);
    }

    async filterResultsByArtist(): Promise<void> {
        await this.ArtistsCategoryCheckboxLocator.click();
    }

    async clickOnArtistCard(artistName: string): Promise<ArtistPage> {
        const artistCardLocator = this.searchResultsGridLocator.getByRole('link', { 
            name: artistName, 
            exact: true
        }).first();
      
        await artistCardLocator.click();
        const artistPage = new ArtistPage(this.page);
        await artistPage.verifyPageLoaded();
        return artistPage;
    }
}