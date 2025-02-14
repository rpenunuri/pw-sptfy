import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/desktop/home-page';

test.describe('Home Page', () => {
  test('anonymous user can search for an artist', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.goToHomePage();

    const searchPage = await homePage.globalNavBar.searchFor(`Journey`);
    await searchPage.filterResultsByArtist();
    const artistPage = await searchPage.clickOnArtistCard(`Journey`);
    await artistPage.assertArtistNameIs('Journey');
    await artistPage.assertPopularTracksAreVisible();
  });
});
