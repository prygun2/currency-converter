import { expect } from 'chai';
import { CurrencyConverter } from './src/index.js';
import dotenv from 'dotenv'

dotenv.config();

const openExchangeRatesApiKey = process.env.OPENEXCHANGERATES_API_KEY;
const currencyConverter = new CurrencyConverter(openExchangeRatesApiKey);

describe('convertCurrency', () => {
  // Тест на корректность конвертации из USD в EUR
  it('should convert from USD to EUR correctly', async () => {
    const result = await currencyConverter.convert('USD', 'EUR', 10);
    expect(result).to.be.a('number');
    expect(result).to.be.greaterThan(0);
  });

  // Тест на корректность конвертации из EUR в USD
  it('should convert from EUR to USD correctly', async () => {
    const result = await currencyConverter.convert('EUR', 'USD', 10);
    expect(result).to.be.a('number');
    expect(result).to.be.greaterThan(0);
  });

  // Тест на корректность конвертации из GBP в JPY
  it('should convert from GBP to JPY correctly', async () => {
    const result = await currencyConverter.convert('GBP', 'JPY', 10);
    expect(result).to.be.a('number');
    expect(result).to.be.greaterThan(0);
  });

  // Тест на конвертацию валюты в саму себя
  it('should return the same amount if same currency', async () => {
    const result = await currencyConverter.convert('USD', 'USD', 10);
    expect(result).to.be.a('number');
    expect(result).to.equal(10);
  });

  // Тест на попытку конвертации несуществующей валюты
  it('should throw an error for unsupported currency', async () => {
    try {
      await currencyConverter.convert('USD', 'XYZ', 10);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Currency not supported: XYZ');
    }
  }).timeout(5000); // увеличиваем время ожидания до 5 секунд

  it('should throw an error for unsupported currency code', async () => {
    try {
      await currencyConverter.convert('USD', 'NOTACURRENCY', 10);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Currency not supported: NOTACURRENCY');
    }
  }).timeout(5000); // увеличиваем время ожидания до 5 секунд

  // Тест на отсутствие обязательных параметров
  it('should throw an error if missing required parameters', async () => {
    try {
      await currencyConverter.convert(null, 'USD', 10);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Missing required parameters for currency conversion.');
    }
  });

// Тест на передачу некорректного количества параметров
  it('should throw an error if incorrect number of parameters', async () => {
    try {
      await currencyConverter.convert('USD', 'EUR');
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Missing required parameters for currency conversion.');
    }
  });

// Тест на ошибку в API
  it('should throw an error if API call fails', async () => {
    try {
      await currencyConverter.convert('USD', 'EUR', 10);
    } catch (error) {
      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.equal('Error converting currency: Cannot read property \'rates\' of undefined');
    }
  }).timeout(5000); // увеличиваем время ожидания до 5 секунд

// Тест на дробную сумму
  it('should convert fractional amounts correctly', async () => {
    const convertedAmount = await currencyConverter.convert('USD', 'EUR', 10.5847);
    expect(convertedAmount).to.be.a('number');
  });

// Тест на сумму = 0
  it('should convert 0 amounts correctly', async () => {
    const convertedAmount = await currencyConverter.convert('USD', 'GBP', 0);
    expect(convertedAmount).to.be.a('number');
    expect(convertedAmount).is.equal(0)
  });

// Тест с отрицательной суммой
  it('should throws an error if amount is negative', async () => {
    try {
      await currencyConverter.convert('USD', 'GBP', -4780);
    } catch (e) {
      expect(e.message).is.equal('Amount cannot be less than 0')
    }
  });

// Тест с не числом в сумме
  it('should throws an error if string', async () => {
    try {
      await currencyConverter.convert('USD', 'GBP', '-4780');
    } catch (e) {
      expect(e.message).is.equal('Amount is not a number')
    }
  });
});
