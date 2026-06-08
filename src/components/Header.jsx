import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full border-b border-white/10"
      style={{ background: 'rgba(10, 25, 47, 0.8)', backdropFilter: 'blur(12px)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Conversor Global de Moedas</h1>
            <p className="text-xs text-gray-400 hidden sm:block">Cotações em tempo real &bull; Histórico &bull; Notícias</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-accent-400 bg-accent-400/10 px-3 py-1.5 rounded-full border border-accent-400/20">
            <span className="w-1.5 h-1.5 bg-accent-400 rounded-full animate-pulse" />
            Ao vivo
          </span>
        </div>
      </div>
    </motion.header>
  );
}
