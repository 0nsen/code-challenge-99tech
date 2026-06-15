import { CURRENCY_ENDPOINT } from "../constants";
import type { CurrencyDto } from "../types";

export const getCurrencies = async (): Promise<CurrencyDto[]> => {
  const res = await fetch(CURRENCY_ENDPOINT);
  if (!res.ok) {
    throw new Error(res.status.toString());
  }
  return res.json();
};
