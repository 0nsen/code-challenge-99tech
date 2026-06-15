import type { CurrencyMap } from "../types";

export const convert = (
  currencies: CurrencyMap,
  from: string,
  to: string,
  amount: number = 1,
): number => {
  const fromPrice = currencies.get(from);
  const toPrice = currencies.get(to);

  if (fromPrice === undefined) throw new Error(`Unknown currency: ${from}`);
  if (toPrice === undefined) throw new Error(`Unknown currency: ${to}`);

  return (amount * fromPrice) / toPrice;
};
