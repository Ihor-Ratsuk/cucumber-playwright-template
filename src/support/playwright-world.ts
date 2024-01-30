import { IWorld, IWorldOptions, World, setWorldConstructor } from "@cucumber/cucumber";
import { Page, APIRequestContext, APIResponse } from "@playwright/test";
import { IConfiguration } from "./configuration";
import { getConfiguration } from "../support/configuration";

export interface IInitUIContext {
  initUIContext(page: Page): void;
}

export interface IInitApiContext {
  initApiContext(anonymousRequestContext: APIRequestContext, authorizedApiRequestContext: APIRequestContext): void;
}

export interface IPlaywrightContext extends IWorld {
  get page(): Page;

  readonly configuration: IConfiguration;
}

export interface IApiContext extends IWorld {
  get anonymousRequestContext(): APIRequestContext;
  get authorizedRequestContext(): APIRequestContext;

  lastResponse: APIResponse;

  readonly configuration: IConfiguration;
}

export class PlaywrightWorld extends World implements IPlaywrightContext, IApiContext, IInitUIContext, IInitApiContext {
  private _page: Page;
  private _anonymousRequestContext: APIRequestContext;
  private _authorizedRequestContext: APIRequestContext;

  // IPlaywrightContext
  get page(): Page {
    return this._page;
  }

  // IApiContext
  get anonymousRequestContext(): APIRequestContext {
    return this._anonymousRequestContext;
  }

  get authorizedRequestContext(): APIRequestContext {
    return this._authorizedRequestContext;
  }

  lastResponse: APIResponse;

  readonly configuration: IConfiguration;

  constructor(options: IWorldOptions<any>) {
    super(options);
    this.configuration = getConfiguration();
  }

  initUIContext(page: Page): void {
    this._page = page;
  }

  initApiContext(anonymousRequestContext: APIRequestContext, authorizedApiRequestContext: APIRequestContext): void {
    this._anonymousRequestContext = anonymousRequestContext;
    this._authorizedRequestContext = authorizedApiRequestContext;
  }
}

setWorldConstructor(PlaywrightWorld);
