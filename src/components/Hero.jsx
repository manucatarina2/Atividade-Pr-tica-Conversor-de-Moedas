import { motion } from 'framer-motion';

export default function Hero({ baseCurrency, targetCurrency, rate }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-center py-12 sm:py-16"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="inline-flex items-center gap-2 bg-primary-500/10 border border-primary-500/20 text-primary-300 text-xs font-medium px-4 py-2 rounded-full mb-6"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        Taxas atualizadas em tempo real
      </motion.div>

      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-4 tracking-tight">
        Converta moedas com<br />
        <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
          precisão global
        </span>
      </h2>

      <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
        Acompanhe cotações em tempo real, visualize o histórico de variação e fique por dentro das notícias que movem o mercado.
      </p>

      {rate != null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center gap-4 glass px-8 py-4"
        >
          <span className="text-2xl font-bold text-white">{baseCurrency}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64ffda" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-2xl font-bold text-accent-400">{rate.toFixed(4)}</span>
          <span className="text-2xl font-bold text-white">{targetCurrency}</span>
        </motion.div>
      )}
    </motion.section>
  );
}
