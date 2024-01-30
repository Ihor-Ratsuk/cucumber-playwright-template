import { testData } from "../data/test-data";
import { generators } from "../data/data-generators";

function getDataByKey<TResult>(key: string, storage: any): TResult {
  if (key in storage) {
    return storage[key];
  }
  return undefined;
}

export function replaceMacroses(text: string): string {
  const macroRx = /\$\{\{(?<key>[^\}]+)\}\}/gmi;

  if (!macroRx.test(text))
    return text;

  return text.replace(macroRx, (substring: string, ...args: any[]): string => {
    const key = (args[0]).trim().toLowerCase();

    let item: any;
    if ((item = getDataByKey<string>(key, testData)) !== undefined) {
      return item;
    }

    let fn: () => string;
    if ((fn = getDataByKey<() => string>(key, generators)) !== undefined) {
      return fn();
    }

    throw new Error(` Macro '${substring}' is not supported. Provided key not found in test data and generated data.`);
  });
}