import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart,
} from 'recharts';
import { fetchHistoricalRates } from '../api';
import { ChartSkeleton } from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900/95 backdrop-blur border border-white/10 rounded-lg px-4 py-3 shadow-xl">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="text-sm font-bold text-accent-400">{payload[0].value.toFixed(4)}</p>
    </div>
  );
};

export default function CurrencyChart({ baseCurrency, targetCurrency, onPercentChange }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [days, setDays] = useState(30);

  const load = useCallback(async () => {
    if (!baseCurrency || !targetCurrency || baseCurrency === targetCurrency) return;
    setLoading(true);
    setError(null);
    try {
      const rates = await fetchHistoricalRates(baseCurrency, targetCurrency, days);
      setData(rates);
      // Calculate % change
      if (rates.length >= 2) {
        const first = rates[0].rate;
        const last = rates[rates.length - 1].rate;
        const pct = ((last - first) / first) * 100;
        onPercentChange(pct);
      }
    } catch {
      setError('Erro ao carregar histórico de cotações.');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [baseCurrency, targetCurrency, days, onPercentChange]);

  useEffect(() => { load(); }, [load]);

  const trend = data.length >= 2 ? (data[data.length - 1].rate >= data[0].rate ? 'up' : 'down') : null;

  if (loading) return <ChartSkeleton />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-strong p-6 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">Histórico de Cotação</h2>
          {trend && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${
              trend === 'up' ? 'bg-green-500/15 text-green-400' : 'bg-red-500/15 text-red-400'
            }`}>
              {trend === 'up' ? '↑ Alta' : '↓ Baixa'}
            </span>
          )}
        </div>
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {[7, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-4 py-1.5 text-xs font-medium transition-colors ${
                days === d ? 'bg-primary-500 text-white' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              {d} dias
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={load} />
      ) : data.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Sem dados históricos disponíveis</p>
      ) : (
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0099cc" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0099cc" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                stroke="rgba(255,255,255,0.2)"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                angle={-45}
                textAnchor="end"
                height={60}
                tickLine={false}
              />
              <YAxis
                stroke="rgba(255,255,255,0.2)"
                tick={{ fontSize: 11, fill: '#6b7280' }}
                domain={['auto', 'auto']}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="rate"
                stroke="#0099cc"
                strokeWidth={2}
                fill="url(#colorRate)"
                dot={false}
                activeDot={{ r: 5, fill: '#64ffda', stroke: '#0099cc', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </motion.div>
  );
}
