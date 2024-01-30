import { Page } from '@playwright/test';
import { BasePage, LazyLocator } from './base.page';
import { ITimeouts } from '../support/configuration';

export class MainPage extends BasePage {
  private searchButton: LazyLocator = this.locator('button[aria-label="Search"]');
  private searchInput: LazyLocator = this.locator('input#docsearch-input');
  private searchResults: LazyLocator = this.locator('ul#docsearch-list li>a');

  constructor(page: Page, timeouts: ITimeouts = null) {
    super(page, timeouts);
  }

  public async clickOnSearchButton(): Promise<void> {
    await this.searchButton().click();
  }

  public async typeSearchPhraseAndPressEnter(text: string): Promise<void> {
    await this.searchInput().click();
    await this.searchInput().pressSequentially(text);
    await this.searchResults().first().waitFor();
    await this.searchInput().press('Enter');
  }
}
