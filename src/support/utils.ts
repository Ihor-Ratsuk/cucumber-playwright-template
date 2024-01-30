import { getConfiguration } from "../support/configuration";

export async function waitForCondition<TParameter>(
  parameter: TParameter,
  fn: (page: TParameter) => Promise<boolean>,
  waitTimeout: number = null,
  pollingTime: number = null
): Promise<boolean> {
  const { timeouts } = getConfiguration();
  waitTimeout = waitTimeout ?? timeouts.waitTimeout;
  pollingTime = pollingTime ?? timeouts.pollingTime;
  const maxIterations = waitTimeout / pollingTime;

  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
  let iterations = 0;
  let result = false;

  try {
    do {
      result = await fn(parameter);
      if (result) {
        return result;
      }
      sleep(pollingTime);
      iterations++;
    } while (iterations < maxIterations);
    result = result ?? await fn(parameter);
  } catch { }

  return result;
}
