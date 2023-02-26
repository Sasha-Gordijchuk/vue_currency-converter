import axios from "axios";

const BASE_URL = "https://api.apilayer.com/fixer";
const API_KEY = "2OhXgt2E0j2jysEWNQQtvmUqzobaplbi";

export const getRates = async (symbols: string[], base: string) => {
  const stringSymbols = symbols.join(",");

  const currency = await axios.get(
    `${BASE_URL}/latest?symbols=${stringSymbols}&base=${base}`,
    {
      headers: { apikey: API_KEY },
    }
  );

  return currency.data.rates;
};

export const getSymbols = async () => {
  const symbols = await axios.get(`${BASE_URL}/symbols`, {
    headers: { apikey: API_KEY },
  });

  return symbols.data.symbols;
};
