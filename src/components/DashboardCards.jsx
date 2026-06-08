import { motion } from 'framer-motion';

export default function DashboardCards({ baseCurrency, targetCurrency, rate, percentChange }) {
  const cards = [
    {
      label: 'Moeda de Origem',
      value: baseCurrency || '---',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
      ),
      color: 'from-blue-500 to-cyan-500',
    },
    {
      label: 'Moeda de Destino',
      value: targetCurrency || '---',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="16 12 12 8 8 12" /><line x1="12" y1="16" x2="12" y2="8" /></svg>
      ),
      color: 'from-purple-500 to-pink-500',
    },
    {
      label: 'Cotação Atual',
      value: rate != null ? rate.toFixed(4) : '---',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
      ),
      color: 'from-emerald-500 to-teal-500',
    },
    {
      label: 'Variação 7 dias',
      value: percentChange != null ? `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(2)}%` : '---',
      icon: percentChange != null && percentChange >= 0 ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></svg>
      ),
      color: percentChange != null && percentChange >= 0 ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500',
      valueColor: percentChange != null ? (percentChange >= 0 ? 'text-green-400' : 'text-red-400') : 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="glass p-5 hover:bg-white/[0.08] transition-all duration-300 cursor-default group"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white shrink-0`}>
              {card.icon}
            </div>
            <span className="text-xs text-gray-400 font-medium">{card.label}</span>
          </div>
          <p className={`text-2xl font-bold ${card.valueColor || 'text-white'} group-hover:scale-105 transition-transform origin-left`}>
            {card.value}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
