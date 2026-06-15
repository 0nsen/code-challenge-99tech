import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../api/currency";
import type { CurrencyMap } from "../types";

export const useCurrencies = () => {
  return useQuery({
    queryKey: ["currencies"],
    queryFn: async () => {
      const data = await getCurrencies();
      return new Map(
        data.map((item) => [item.currency, item.price]),
      ) as CurrencyMap;
    },
  });
};
