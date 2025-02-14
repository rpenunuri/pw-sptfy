import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "../base-page";

export class ArtistPage extends BasePage {
    private readonly popularSectionLocator: Locator;
    private readonly artistTracksListLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.popularSectionLocator = this.page.locator('div:has-text("Popular")');
        this.artistTracksListLocator = this.popularSectionLocator.getByTestId("track-row");
    }

    async verifyPageLoaded(): Promise<void> {
        await expect(this.page).toHaveTitle(/Songs, Albums, Bio & More | Spotify/);
    }

    async assertArtistNameIs(artistName: string): Promise<void> { 
        const regex = new RegExp(`^${artistName}$`);
        const artistNameLocator = this.page.getByRole('heading', { name: regex });
        await expect(artistNameLocator).toBeVisible();
    }

    async assertPopularTracksAreVisible(): Promise<void> {
        const trackRows = await this.artistTracksListLocator.all();
        for (const trackRow of trackRows) {
            await expect(trackRow).toBeVisible();
        }
    }
}