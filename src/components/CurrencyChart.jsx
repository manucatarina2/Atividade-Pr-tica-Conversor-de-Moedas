import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CurrencyChart = ({ baseCurrency, targetCurrency }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (baseCurrency && targetCurrency) {
      const fetchHistoricalData = async () => {
        setLoading(true);
        setError(null);
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        const startDateStr = startDate.toISOString().split('T')[0];
        const endDateStr = endDate.toISOString().split('T')[0];
        try {
          const response = await axios.get(
            `https://api.frankfurter.dev/v1/${startDateStr}..${endDateStr}?base=${baseCurrency}&symbols=${targetCurrency}`
          );
          const data = Object.entries(response.data.rates).map(([date, rates]) => ({
            date,
            rate: rates[targetCurrency],
          }));
          setHistoricalData(data);
        } catch (err) {
          setError('Erro ao carregar histórico');
          setHistoricalData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchHistoricalData();
    }
  }, [baseCurrency, targetCurrency]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-2xl font-bold text-baby-blue-dark mb-4">
        Histórico de Variação (Últimos 30 dias)
      </h2>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-baby-blue-dark"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && historicalData.length > 0 && (
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#89CFF0" />
              <XAxis
                dataKey="date"
                stroke="#5BA3D0"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis stroke="#5BA3D0" tick={{ fontSize: 12 }} domain={["auto", "auto"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '2px solid #89CFF0',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="rate"
                stroke="#5BA3D0"
                strokeWidth={2}
                dot={{ fill: '#89CFF0', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && !error && historicalData.length === 0 && (
        <p className="text-center text-baby-blue-dark py-8">
          Nenhum dado histórico disponível
        </p>
      )}
    </div>
  );
};

export default CurrencyChart;
