import { Before, After, ITestCaseHookParameter, setDefaultTimeout, AfterAll, BeforeAll } from "@cucumber/cucumber";
import { IPlaywrightContext, IInitUIContext, IInitApiContext } from "./playwright-world";
import { getConfiguration } from "../support/configuration";
import { PlaywrightService } from "./playwright-service";

BeforeAll(function () {
  const config = getConfiguration();
  setDefaultTimeout(config.cucumber.timeouts.step);
});

Before({ tags: "@UI" }, async function (this: IInitUIContext, scenario: ITestCaseHookParameter): Promise<void> {
  await this.initUIContext(
    await PlaywrightService.getPage()
  );
});

Before({ tags: "@API" }, async function (this: IInitApiContext, scenario: ITestCaseHookParameter): Promise<void> {
  const [anonymous, authorized] = await PlaywrightService.getApiRequestContext();
  await this.initApiContext(anonymous, authorized);
});

After({ tags: "@UI" }, async function (this: IPlaywrightContext, scenario: ITestCaseHookParameter): Promise<void> {
  const { page } = this;
  if (scenario.result.status == 'FAILED' && page != null && !page.isClosed()) {
    const buffer = await page.screenshot();
    this.attach(buffer, 'image/png');
  }
});

AfterAll(async function () {
  await PlaywrightService.teardown();
});
