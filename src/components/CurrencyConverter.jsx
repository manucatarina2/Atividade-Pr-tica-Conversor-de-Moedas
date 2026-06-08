import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchCurrencies, fetchLatestRate } from '../api';
import { CardSkeleton } from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

export default function CurrencyConverter({ baseCurrency, targetCurrency, onCurrencyChange, onRateUpdate }) {
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [rate, setRate] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currencies, setCurrencies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load currencies
  useEffect(() => {
    fetchCurrencies()
      .then(setCurrencies)
      .catch(() => setError('Erro ao carregar moedas'))
      .finally(() => setLoading(false));
  }, []);

  // Fetch rate
  const convert = useCallback(async () => {
    if (!baseCurrency || !targetCurrency || baseCurrency === targetCurrency) return;
    setError(null);
    try {
      const data = await fetchLatestRate(baseCurrency, targetCurrency);
      setRate(data.rate);
      setLastUpdated(data.date);
      setConvertedAmount(amount * data.rate);
      onRateUpdate(data.rate, data.date);
    } catch {
      setError('Erro na conversão. Verifique sua conexão.');
      setConvertedAmount(null);
    }
  }, [baseCurrency, targetCurrency, amount, onRateUpdate]);

  useEffect(() => { convert(); }, [convert]);

  const swap = () => {
    onCurrencyChange(targetCurrency, baseCurrency);
  };

  if (loading) return <CardSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-strong p-6 sm:p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Conversor</h2>
        {lastUpdated && (
          <span className="text-xs text-gray-500">Atualizado: {lastUpdated}</span>
        )}
      </div>

      {error && <ErrorMessage message={error} onRetry={convert} />}

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
        {/* Amount + Base */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Valor</label>
            <input
              type="number"
              min="0"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all placeholder-gray-600"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">De</label>
            <select
              value={baseCurrency}
              onChange={(e) => onCurrencyChange(e.target.value, targetCurrency)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all appearance-none cursor-pointer"
            >
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code} className="bg-gray-900 text-white">
                  {code} — {name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.85 }}
            transition={{ duration: 0.3 }}
            onClick={swap}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center text-white shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 transition-shadow"
            title="Inverter moedas"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="7 16 3 12 7 8" />
              <line x1="21" y1="12" x2="3" y2="12" />
              <polyline points="17 8 21 12 17 16" />
            </svg>
          </motion.button>
        </div>

        {/* Target */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Resultado</label>
            <div className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-lg font-semibold min-h-[52px] flex items-center">
              {convertedAmount != null ? (
                <span className="text-accent-400">{convertedAmount.toFixed(2)}</span>
              ) : (
                <span className="text-gray-600">---</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1.5">Para</label>
            <select
              value={targetCurrency}
              onChange={(e) => onCurrencyChange(baseCurrency, e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all appearance-none cursor-pointer"
            >
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code} className="bg-gray-900 text-white">
                  {code} — {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rate info */}
      {rate != null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          1 {baseCurrency} = <span className="text-white font-semibold">{rate.toFixed(4)}</span> {targetCurrency}
        </motion.div>
      )}
    </motion.div>
  );
}
