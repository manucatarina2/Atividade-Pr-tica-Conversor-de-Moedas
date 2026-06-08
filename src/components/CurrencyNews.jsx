import { useState, useEffect } from 'react';
import axios from 'axios';

// Load API key from environment (Vite exposes variables prefixed with VITE_)
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

const CurrencyNews = ({ targetCurrency }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!targetCurrency) return;
    if (!GNEWS_API_KEY || GNEWS_API_KEY === 'YOUR_GNEWS_API_KEY_HERE') {
      setError('Chave da API GNews não configurada. Atualize .env.');
      return;
    }
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      const currencyNames = {
        USD: 'dólar americano',
        EUR: 'euro',
        BRL: 'real brasileiro',
        GBP: 'libra esterlina',
        JPY: 'iene japonês',
        CNY: 'yuan chinês',
        CAD: 'dólar canadense',
        AUD: 'dólar australiano',
        CHF: 'franco suíço',
        BTC: 'bitcoin',
        ETH: 'ethereum',
      };
      const searchTerm = currencyNames[targetCurrency] || targetCurrency;
      try {
        const response = await axios.get('https://gnews.io/api/v4/search', {
          params: {
            q: searchTerm,
            lang: 'pt',
            country: 'br',
            max: 10,
            token: GNEWS_API_KEY,
          },
        });
        setNews(response.data.articles || []);
      } catch (err) {
        console.error('Erro ao buscar notícias', err);
        setError('Erro ao carregar notícias. Verifique a chave da API ou limite diário.');
        setNews([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [targetCurrency]);

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-baby-blue-dark mb-4">Notícias sobre {targetCurrency}</h2>

      {loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-baby-blue-dark"></div>
        </div>
      )}

      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {!loading && !error && news.length === 0 && (
        <p className="text-center text-baby-blue-dark py-8">Nenhuma notícia encontrada para esta moeda</p>
      )}

      {!loading && !error && news.length > 0 && (
        <div className="space-y-4">
          {news.map((article, idx) => (
            <div key={idx} className="border-b border-baby-blue pb-4 last:border-0">
              <h3 className="font-semibold text-baby-blue-dark mb-2">{article.title}</h3>
              <div className="flex justify-between items-center text-sm text-baby-blue">
                <span>Fonte: {article.source?.name || 'Desconhecida'}</span>
                <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-baby-blue-dark hover:text-baby-blue font-semibold transition-colors"
              >
                Ler matéria completa →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CurrencyNews;
