import { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyChart from './components/CurrencyChart';
import CurrencyNews from './components/CurrencyNews';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('BRL');
  const [currentRate, setCurrentRate] = useState(null);

  const handleCurrencyChange = (base, target, rate) => {
    if (base) setBaseCurrency(base);
    if (target) setTargetCurrency(target);
    if (rate) setCurrentRate(rate);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Conversor de Moedas
          </h1>
          <p className="text-white/90 text-lg">
            Cotações em tempo real | Histórico de variação | Notícias
          </p>
          {currentRate && (
            <p className="text-white/80 mt-2">
              Taxa atual: 1 {baseCurrency} = {currentRate.toFixed(4)} {targetCurrency}
            </p>
          )}
        </header>

        <CurrencyConverter
          onCurrencyChange={handleCurrencyChange}
          baseCurrency={baseCurrency}
          targetCurrency={targetCurrency}
        />

        <CurrencyChart baseCurrency={baseCurrency} targetCurrency={targetCurrency} />

        <CurrencyNews targetCurrency={targetCurrency} />
      </div>
    </div>
  );
}

export default App;
