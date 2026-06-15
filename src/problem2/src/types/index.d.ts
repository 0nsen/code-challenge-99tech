export type CurrencyDto = {
  currency: string;
  date: string;
  price: number;
};

export type CurrencyMap = Map<CurrencyDto["currency"], CurrencyDto["price"]>;
