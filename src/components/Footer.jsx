export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-16" style={{ background: 'rgba(10, 25, 47, 0.6)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white">Conversor Global de Moedas</span>
          </div>
          <div className="text-center text-xs text-gray-500 space-y-1">
            <p>APIs: <span className="text-gray-400">Frankfurter</span> (cotações) &bull; <span className="text-gray-400">GNews</span> (notícias)</p>
            <p>&copy; {new Date().getFullYear()} &mdash; Projeto acadêmico</p>
          </div>
          <div className="flex gap-3">
            <a href="https://api.frankfurter.dev" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-primary-400 transition-colors">Frankfurter API</a>
            <a href="https://gnews.io" target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-primary-400 transition-colors">GNews API</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
