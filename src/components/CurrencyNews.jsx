import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { fetchNews } from '../api';
import { NewsSkeleton } from './LoadingSkeleton';
import ErrorMessage from './ErrorMessage';

export default function CurrencyNews({ targetCurrency }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    if (!targetCurrency) return;
    setLoading(true);
    setError(null);
    try {
      const articles = await fetchNews(targetCurrency);
      setNews(articles);
    } catch {
      setError('Erro ao carregar notícias. Verifique sua chave API ou limite diário.');
      setNews([]);
    } finally {
      setLoading(false);
    }
  }, [targetCurrency]);

  useEffect(() => { load(); }, [load]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass-strong p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Notícias sobre {targetCurrency}
      </h2>

      {loading ? (
        <NewsSkeleton />
      ) : error ? (
        <ErrorMessage message={error} onRetry={load} />
      ) : news.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/5 flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-gray-500">Nenhuma notícia encontrada para esta moeda</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, idx) => (
            <motion.a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group glass p-0 overflow-hidden hover:bg-white/[0.08] transition-all duration-300 flex flex-col"
            >
              {article.image && (
                <div className="h-40 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 group-hover:text-primary-300 transition-colors">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{article.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                  <span>{article.source?.name || 'Fonte'}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString('pt-BR')}</span>
                </div>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary-400 group-hover:text-primary-300 transition-colors">
                  Ler notícia
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </motion.div>
  );
}
