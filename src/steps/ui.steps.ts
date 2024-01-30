import { Given, When, Then } from "@cucumber/cucumber";
import { IPlaywrightContext } from "../support/playwright-world";
import { expect } from "@playwright/test";
import { MainPage } from "../pages/main.page";

Given(/the user is on the root page/, async function (this: IPlaywrightContext) {
  await this.page.goto(this.configuration.ui.rootUrl);
});

When(/the user clicks on (.*) button/, async function (this: IPlaywrightContext, buttonTitle: string) {
  const { page } = this;
  await new MainPage(page).clickOnButtonByName(buttonTitle);
});

When(/the user search for '(.*)'/, async function (this: IPlaywrightContext, searchPhrase: string) {
  const { page } = this;
  const mainPage = new MainPage(page);
  await mainPage.clickOnSearchButton();
  await mainPage.typeSearchPhraseAndPressEnter(searchPhrase);
});

Then(/the user is redirected to (.*) page/, async function (this: IPlaywrightContext, pageTitle: string) {
  const { page } = this;
  expect(await new MainPage(page).waitForPageTitle(pageTitle), `Page title is '${pageTitle}'`).toBeTruthy();
});
