import { Browser, BrowserContext, Page, chromium, APIRequestContext, request } from "@playwright/test";
import { IConfiguration } from "./configuration";

export interface IPlaywrightWrapper {
  getPage(): Promise<Page>;
  getAnonymousApiRequestContext(): Promise<APIRequestContext>;
  getAuthorizedApiRequestContext(): Promise<APIRequestContext>
  teardown(): Promise<void>;
}

export class PlaywrightWrapper implements IPlaywrightWrapper {

  private _browser: Browser;
  private _browserContext: BrowserContext;
  private _page: Page;
  private _anonymousApiRequestContext: APIRequestContext;
  private _authorizedApiRequestContext: APIRequestContext;

  private readonly _configuration: IConfiguration;

  constructor(configuration: IConfiguration) {
    this._configuration = configuration;
  }

  async getPage(): Promise<Page> {
    if (!this._page) {
      [this._browser, this._browserContext, this._page] = await this.initPage();
    }
    return this._page;
  }

  async getAnonymousApiRequestContext(): Promise<APIRequestContext> {
    return this._anonymousApiRequestContext ??= await this.initAnonymousApiRequestContext();
  }

  async getAuthorizedApiRequestContext(): Promise<APIRequestContext> {
    return this._authorizedApiRequestContext ??= await this.initAuthorizedApiRequestContext();
  }

  async teardown(): Promise<void> {
    await this._browser?.close();
    this._browser = null;
    this._browserContext = null;
    this._page = null;
    this._anonymousApiRequestContext = null;
  }

  private async initPage(): Promise<[Browser, BrowserContext, Page]> {
    const browser = await chromium.launch({
      headless: this._configuration.browser.headless
    });
    const browserContext = await browser.newContext();
    const page = await browserContext.newPage();
    return [browser, browserContext, page];
  }

  private async initAnonymousApiRequestContext(): Promise<APIRequestContext> {
    return request.newContext(this.initAPIRequestContextOptions(false))
  }

  private async initAuthorizedApiRequestContext(): Promise<APIRequestContext> {
    return request.newContext(this.initAPIRequestContextOptions(true))
  }

  private initAPIRequestContextOptions(isAuthorized: boolean): any {
    const { rootUrl, apiToken } = this._configuration.api;
    const options = {
      baseURL: rootUrl,
      extraHTTPHeaders: {
        'Accept': 'application/vnd.github.v3+json'
      },
    };
    if (isAuthorized) {
      options.extraHTTPHeaders['Authorization'] = `Bearer ${apiToken}`;
    }
    return options;
  }
}
