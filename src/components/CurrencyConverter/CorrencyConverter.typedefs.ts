import type { Rates } from "@/types/Rates";

export interface CurrencyConverterState {
  newRates: Rates;
  inputValue: number;
  currentRate: number;
  currencyFrom: string;
  currencyTo: string;
  resultValue: number;
  isRatesLoading: boolean;
}
