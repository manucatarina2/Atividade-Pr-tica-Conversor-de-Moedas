import axios from 'axios';

const FRANKFURTER = 'https://api.frankfurter.dev/v1';

export async function fetchCurrencies() {
  const res = await axios.get(`${FRANKFURTER}/currencies`);
  return res.data;
}

export async function fetchLatestRate(base, target) {
  const res = await axios.get(`${FRANKFURTER}/latest?base=${base}&symbols=${target}`);
  return {
    rate: res.data.rates[target],
    date: res.data.date,
  };
}

export async function fetchHistoricalRates(base, target, days = 30) {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  const s = start.toISOString().split('T')[0];
  const e = end.toISOString().split('T')[0];
  const res = await axios.get(`${FRANKFURTER}/${s}..${e}?base=${base}&symbols=${target}`);
  return Object.entries(res.data.rates).map(([date, rates]) => ({
    date,
    rate: rates[target],
  }));
}

const CURRENCY_NAMES = {
  USD: 'dólar americano', EUR: 'euro', BRL: 'real brasileiro',
  GBP: 'libra esterlina', JPY: 'iene japonês', CNY: 'yuan chinês',
  CAD: 'dólar canadense', AUD: 'dólar australiano', CHF: 'franco suíço',
  ARS: 'peso argentino', MXN: 'peso mexicano', KRW: 'won sul-coreano',
};

export async function fetchNews(targetCurrency) {
  const key = import.meta.env.VITE_GNEWS_API_KEY;
  if (!key) return [];
  const term = CURRENCY_NAMES[targetCurrency] || targetCurrency;
  const res = await axios.get('https://gnews.io/api/v4/search', {
    params: { q: term, lang: 'pt', country: 'br', max: 6, token: key },
  });
  return res.data.articles || [];
}
