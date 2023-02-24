import axios from "axios";

const BASE_URL = "https://api.apilayer.com/fixer";
const API_KEY = "J9yKWEIgirkiCFAdR9cemARJ48ZDrE12";

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
