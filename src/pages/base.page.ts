import { Locator, Page } from "@playwright/test";
import { ITimeouts, getConfiguration } from "../support/configuration";
import { waitForCondition } from "../support/utils";

export type LazyLocator = () => Locator;

export abstract class BasePage {
  readonly page: Page;
  readonly timeouts: ITimeouts;

  constructor(page: Page, timeouts: ITimeouts = null) {
    this.page = page;
    if (timeouts == null) {
      this.timeouts = getConfiguration().timeouts;
    }
  }

  public async getTitle(): Promise<string> {
    return this.page.title();
  }

  public async getUrl(): Promise<string> {
    return this.page.url();
  }

  public async clickOnButtonByName(text: string): Promise<void> {
    await this.page.locator(`//a[text()='${text}']`).click();
  }

  public async waitForPageTitle(title: string): Promise<boolean> {
    return waitForCondition(this.page, async (page: Page): Promise<boolean> => {
      const actualTitle = await page.title();
      return actualTitle == title || actualTitle.startsWith(title);
    });
  }

  protected locator(selector: string): LazyLocator {
    return function (): Locator {
      return this.page.locator(selector);
    };
  }
}
