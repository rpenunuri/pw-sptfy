import { Page } from "@playwright/test";

export abstract class BasePage {
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    abstract verifyPageLoaded(): Promise<void>;

   /** 
   * Navigates to the given path, respecting Playwright's baseURL if no customBaseURL is provided.
   * @param path - The relative or absolute path to navigate to.
   * @param customBaseURL - Optional custom base URL (for subdomains, different environments, etc.).
   */
    async navigate(path: string, customBaseURL?: string) {
        const url = customBaseURL ? `${customBaseURL}${path}` : path; 
        
        try {
            await this.page.goto(url, { timeout: 20000 });
            await this.verifyPageLoaded();
        } catch (error) {
            throw new Error(`Error navigating to ${url}: ${error}`);
        }
    }
}