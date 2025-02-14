import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class ArtistPage extends BasePage {
    private readonly artistNameLocator: Locator;
    private readonly artistPopularTracksLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.artistNameLocator = this.page.getByTestId('entityTitle');
        this.artistPopularTracksLocator = this.page.getByRole("grid", { name: 'popular tracks' });
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Songs, Albums, Bio & More | Spotify/);
    }

    async assertArtistNameIs(artistName: string): Promise<void> { 
        const regex = new RegExp(`^${artistName}$`);
        await expect(this.artistNameLocator).toHaveText(regex);
    }

    async assertPopularTracksAreVisible(): Promise<void> {
        await expect(this.artistPopularTracksLocator).toBeVisible();
    }
}