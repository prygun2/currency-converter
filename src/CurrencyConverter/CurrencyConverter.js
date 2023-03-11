import fetch from 'node-fetch'

export default class CurrencyConverter {
  constructor(openExchangeRatesApiKey) {
    this.openExchangeRatesApiKey = openExchangeRatesApiKey;
  }

  async convert(fromCurrency, toCurrency, amount, round = 2) {
    if (!fromCurrency || !toCurrency || (!amount && amount !== 0)) {
      throw new Error('Missing required parameters for currency conversion.');
    }

    if (typeof amount !== 'number') {
      throw new Error('Amount is not a number');
    }

    if (amount < 0) {
      throw new Error('Amount cannot be less than 0');
    }

    const url = `https://openexchangerates.org/api/latest.json?app_id=${this.openExchangeRatesApiKey}`;

    try {
      const response = await fetch(url);
      const currencyData = await response.json();
      const validCurrencies = Object.keys(currencyData.rates);

      if (!validCurrencies.includes(fromCurrency)) {
        throw new Error(`Currency not supported: ${fromCurrency}`);
      }

      if (!validCurrencies.includes(toCurrency)) {
        throw new Error(`Currency not supported: ${toCurrency}`);
      }

      const fromCurrencyValue = currencyData.rates[fromCurrency];
      const toCurrencyValue = currencyData.rates[toCurrency];
      const convertedAmount = (amount / fromCurrencyValue) * toCurrencyValue;
      return Number(convertedAmount.toFixed(round));
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }
}
