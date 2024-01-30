import { When, Then } from "@cucumber/cucumber";
import { IApiContext } from "../support/playwright-world";
import { replaceMacroses } from "../support/macroses";
import { APIRequestContext, expect } from "@playwright/test";

function getApiContext(context: IApiContext, user: string): APIRequestContext {
	return user == 'anonymous' ? context.anonymousRequestContext : context.authorizedRequestContext;
}

When(/the (anonymous|authorized) user sends POST '(.*)'$/,
	async function (this: IApiContext, user: string, path: string, body: string): Promise<void> {
		const apiRequestContext = getApiContext(this, user);
		path = replaceMacroses(path);
		body = replaceMacroses(body);
		this.log(`POST ${path}\n${body}`);
		this.lastResponse = await apiRequestContext.post(path, { data: JSON.parse(body) });
	});

When(/the (anonymous|authorized) user sends GET '(.*)'/,
	async function (this: IApiContext, user: string, path: string): Promise<void> {
		const apiRequestContext = getApiContext(this, user);
		path = replaceMacroses(path);
		this.lastResponse = await apiRequestContext.get(path);
	});

Then(/response with (\d+) code received/, async function (this: IApiContext, responseCode: number) {
	expect(this.lastResponse?.status()).toBe(responseCode);
});

Then(/response body include list of .*/, async function (this: IApiContext) {
	expect((await this.lastResponse.json()).length).toBeGreaterThan(0);
});
