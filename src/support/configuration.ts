import * as dotenv from "dotenv";

dotenv.config();

export interface IApiConfiguration {
  rootUrl: string;
  apiToken: string;
}

export interface IUiConfiguration {
  rootUrl: string;
}

export interface ITimeouts {
  waitTimeout: number;
  pollingTime: number;
}

export interface IBrowserConfiguration {
  headless: boolean;
}

export interface ICucumberTimeouts {
  step: number;
}

export interface ICucumberConfiguration {
  timeouts: ICucumberTimeouts;
}

export interface IConfiguration {
  api: IApiConfiguration;
  ui: IUiConfiguration;
  timeouts: ITimeouts;
  browser: IBrowserConfiguration;
  cucumber: ICucumberConfiguration;
}

export function getConfiguration(): IConfiguration {
  return {
    api: {
      rootUrl: process.env.API_ROOT_URL ?? 'https://api.github.com/',
      apiToken: process.env.API_TOKEN
    },
    ui: {
      rootUrl: process.env.UI_ROOT_URL ?? 'https://playwright.dev/',
    },
    timeouts: {
      waitTimeout: 10000,
      pollingTime: 500
    },
    browser: {
      headless: JSON.parse(process.env.BROWSER_HEADLESS ?? 'true')
    },
    cucumber: {
      timeouts: {
        step: 180000
      }
    }
  };
}
