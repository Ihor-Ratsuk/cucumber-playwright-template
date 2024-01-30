import { APIRequestContext, Page } from "@playwright/test";
import { IPlaywrightWrapper, PlaywrightWrapper } from "./playwright-wrapper";
import { getConfiguration } from "../support/configuration";

export class PlaywrightService {
  private static _instance: IPlaywrightWrapper;

  private static get instance(): IPlaywrightWrapper {
    return PlaywrightService._instance ??= new PlaywrightWrapper(getConfiguration());
  }

  static getPage(): Promise<Page> {
    return PlaywrightService.instance.getPage();
  }

  static async getApiRequestContext(): Promise<[APIRequestContext, APIRequestContext]> {
    return [
      await PlaywrightService.instance.getAnonymousApiRequestContext(),
      await PlaywrightService.instance.getAuthorizedApiRequestContext()
    ]
  }

  static async teardown(): Promise<void> {
    await PlaywrightService.instance.teardown();
  }
}
