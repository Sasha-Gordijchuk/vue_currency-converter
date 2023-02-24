import type { Rates } from "@/types/Rates";

export interface CurrencyConverterState {
  newRates: Rates;
  inputValue: number;
  currencyFrom: string;
  currencyTo: string;
  resultValue: number;
  currentRate: number;
  isRatesLoading: boolean;
}
