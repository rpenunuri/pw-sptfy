import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";
import { ArtistPage } from "./artist-page";

export class SearchPage extends BasePage {
    private readonly ArtistsCategoryCheckboxLocator: Locator;
    private readonly searchBoxLocator: Locator;
    private readonly searchInputLocator: Locator;
    private readonly searchResultsListLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.ArtistsCategoryCheckboxLocator = this.page.getByRole('checkbox', { name: 'Artists' });
        this.searchResultsListLocator = this.page.getByTestId('infinite-scroll-list');
        this.searchBoxLocator = this.page.getByTestId('search');
        this.searchInputLocator = this.page.getByTestId('search-input');  
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Spotify – Mobile Web Player/);
    }

    async filterResultsByArtist(): Promise<void> {
        await this.ArtistsCategoryCheckboxLocator.click();
    }

    async clickOnArtistCard(artistName: string): Promise<ArtistPage> {
        const artistCardLocator = this.searchResultsListLocator.getByRole('group', { 
            name: artistName, 
            exact: true
        }).first();
      
        await artistCardLocator.click();
        const artistPage = new ArtistPage(this.page);
        await artistPage.verifyPageLoaded();
        return artistPage;
    }

    async searchFor(query: string): Promise<void> {
        // Start waiting for the search API request *before* triggering it
        const searchRequest = this.page.waitForResponse(response =>
            response.url().includes('/pathfinder/v1/query') && response.ok()
        );
        await this.searchBoxLocator.click();
        await this.searchInputLocator.fill(query);
        await searchRequest;
    }
}