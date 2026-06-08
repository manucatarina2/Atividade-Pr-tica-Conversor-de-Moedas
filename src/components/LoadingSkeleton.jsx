export default function LoadingSkeleton({ lines = 3, className = '' }) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className="skeleton h-4 rounded" style={{ width: `${100 - i * 15}%` }} />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass p-6 space-y-4 animate-pulse">
      <div className="skeleton h-6 w-2/5 rounded" />
      <div className="skeleton h-10 w-full rounded" />
      <div className="skeleton h-4 w-3/4 rounded" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="glass p-6 space-y-4">
      <div className="skeleton h-6 w-1/3 rounded" />
      <div className="skeleton h-[350px] w-full rounded-xl" />
    </div>
  );
}

export function NewsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="glass p-4 space-y-3">
          <div className="skeleton h-40 w-full rounded-lg" />
          <div className="skeleton h-5 w-4/5 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
          <div className="skeleton h-3 w-2/3 rounded" />
        </div>
      ))}
    </div>
  );
}
