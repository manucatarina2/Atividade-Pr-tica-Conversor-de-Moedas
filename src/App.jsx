import { useState, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DashboardCards from './components/DashboardCards';
import CurrencyConverter from './components/CurrencyConverter';
import CurrencyChart from './components/CurrencyChart';
import CurrencyNews from './components/CurrencyNews';
import Footer from './components/Footer';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('BRL');
  const [currentRate, setCurrentRate] = useState(null);
  const [percentChange, setPercentChange] = useState(null);

  const handleCurrencyChange = useCallback((base, target) => {
    setBaseCurrency(base);
    setTargetCurrency(target);
  }, []);

  const handleRateUpdate = useCallback((rate) => {
    setCurrentRate(rate);
  }, []);

  const handlePercentChange = useCallback((pct) => {
    setPercentChange(pct);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6">
        <Hero baseCurrency={baseCurrency} targetCurrency={targetCurrency} rate={currentRate} />

        <div className="space-y-6 pb-12">
          <DashboardCards
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            rate={currentRate}
            percentChange={percentChange}
          />

          <CurrencyConverter
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            onCurrencyChange={handleCurrencyChange}
            onRateUpdate={handleRateUpdate}
          />

          <CurrencyChart
            baseCurrency={baseCurrency}
            targetCurrency={targetCurrency}
            onPercentChange={handlePercentChange}
          />

          <CurrencyNews targetCurrency={targetCurrency} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
