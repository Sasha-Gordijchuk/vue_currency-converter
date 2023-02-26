import type { Symbols } from "@/types/Symbols";

export interface AddCurrencyFormState {
  isLoading: boolean;
  allSymbols: Symbols;
  selectedCurrency: string | number;
  searchQuery: string;
}
