# @prygun/currency-converter

## Description

This is a module for converting currency using the OpenExchangeRates API. It provides a simple interface for converting between various currencies based on current exchange rates.

## Installation

To install this module, run the following command:

	npm install @prygun/currency-converter

## Usage

Before using the CurrencyConverter class, you need to obtain an App ID from OpenExchangeRates. To get an App ID, follow these steps:

1. Go to the [OpenExchangeRates](https://openexchangerates.org/) website.
1. Click the "Get Your App ID" button.
1. Sign up for an account, or log in if you already have one.
1. After logging in, you should see your App ID on the dashboard page. Copy the App ID.

To use the CurrencyConverter class, import it and create a new instance with your OpenExchangeRates App ID as the constructor parameter:

	import { CurrencyConverter } from '@prygun/currency-converter';

    const converter = new CurrencyConverter('YOUR_OPEN_EXCHANGE_RATES_APP_ID');


Then, call the convert method with the desired parameters:

    const convertedAmount = await converter.convert('USD', 'EUR', 10);
    console.log(convertedAmount); // 9.41

By default, the convert method rounds the converted amount to 2 decimal places. You can override this by passing a fourth parameter to the method:

    const convertedAmount = await converter.convert('USD', 'EUR', 10, 4);
    console.log(convertedAmount); // 9.4081


### Parameters

The `convert` method accepts four parameters:

- `fromCurrency` - The currency code to convert from.
- `toCurrency` - The currency code to convert to.
- `amount` - The amount to convert.
- `round` (optional) - The number of decimal places to round the converted amount to. Defaults to `2` if not specified.

## License

This module is licensed under the ISC License. See the LICENSE file for details.

## Acknowledgements
This module was developed with the support of ChatGPT, an AI language model created by OpenAI.