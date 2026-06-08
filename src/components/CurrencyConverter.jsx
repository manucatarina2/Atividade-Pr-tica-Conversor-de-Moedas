import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = ({ onCurrencyChange, baseCurrency, targetCurrency }) => {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currencies, setCurrencies] = useState({});

  // Load list of available currencies
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.frankfurter.dev/v1/currencies');
        setCurrencies(response.data);
      } catch (err) {
        setError('Erro ao carregar moedas');
      }
    };
    fetchCurrencies();
  }, []);

  // Perform conversion when parameters change
  useEffect(() => {
    if (baseCurrency && targetCurrency && amount) {
      const convertCurrency = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(
            `https://api.frankfurter.dev/v1/latest?base=${baseCurrency}&symbols=${targetCurrency}`
          );
          const rate = response.data.rates[targetCurrency];
          setConvertedAmount(amount * rate);
          if (onCurrencyChange) {
            onCurrencyChange(baseCurrency, targetCurrency, rate);
          }
        } catch (err) {
          setError('Erro na conversão. Tente novamente.');
          setConvertedAmount(null);
        } finally {
          setLoading(false);
        }
      };
      convertCurrency();
    }
  }, [amount, baseCurrency, targetCurrency, onCurrencyChange]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-baby-blue-dark mb-4">Conversor de Moedas</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-baby-blue-dark font-semibold mb-2">Valor</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-2 border border-baby-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-dark"
            placeholder="Digite o valor"
          />
        </div>

        <div>
          <label className="block text-baby-blue-dark font-semibold mb-2">Moeda de Origem</label>
          <select
            value={baseCurrency}
            onChange={(e) => onCurrencyChange(e.target.value, targetCurrency, null)}
            className="w-full px-4 py-2 border border-baby-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-dark"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-baby-blue-dark font-semibold mb-2">Moeda de Destino</label>
          <select
            value={targetCurrency}
            onChange={(e) => onCurrencyChange(baseCurrency, e.target.value, null)}
            className="w-full px-4 py-2 border border-baby-blue rounded-lg focus:outline-none focus:ring-2 focus:ring-baby-blue-dark"
          >
            {Object.entries(currencies).map(([code, name]) => (
              <option key={code} value={code}>
                {code} - {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-baby-blue-dark"></div>
        </div>
      )}

      {convertedAmount !== null && !loading && (
        <div className="mt-4 p-4 bg-baby-blue-soft rounded-lg">
          <p className="text-center text-lg">
            <span className="font-semibold">{amount} {baseCurrency}</span>
            <span className="mx-2">=</span>
            <span className="font-bold text-baby-blue-dark text-xl">{convertedAmount.toFixed(2)} {targetCurrency}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
